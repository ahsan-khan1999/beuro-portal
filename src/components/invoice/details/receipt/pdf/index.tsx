import { updateModalType } from "@/api/slices/globalSlice/global";
import {
  readCollectiveInvoiceDetails,
  readInvoiceDetails,
  sendInvoiceEmail,
  sendOfferByPost,
  setInvoiceInfo,
  updateInvoiceContent,
} from "@/api/slices/invoice/invoiceSlice";
import { sendOfferEmail } from "@/api/slices/offer/offerSlice";
import { getTemplateSettings, readEmailSettings } from "@/api/slices/settingSlice/settings";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { Pdf } from "@/components/pdf/pdf";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  AcknowledgementSlipProps,
  CompanySettingsActionType,
  EmailSettingsActionType,
  InvoiceEmailHeaderProps,
  PayableToProps,
  PdfProps,
  TemplateType,
} from "@/types";
import {
  InvoiceTableRowDetailsTypes,
  OffersTableRowTypes,
  ServiceList,
} from "@/types/offers";
import localStoreUtil from "@/utils/localstore.util";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { InvoiceEmailHeader } from "./invoice-email-header";
import {
  InvoiceCardContentProps,
  PdfSubInvoiceTypes,
  SubInvoiceTableRowTypes,
} from "@/types/invoice";
import { ContentTableRowTypes } from "@/types/content";
import { sendContractEmail } from "@/api/slices/contract/contractSlice";
import { updateQuery } from "@/utils/update-query";
import { EmailTemplate } from "@/types/settings";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import { YogaPdfContainer } from "@/components/pdf/yoga-pdf-container";

export const productItems: ServiceList[] = [
  {
    serviceTitle: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: 150,
    count: 2,
    serviceType: "",
    totalPrice: 1000,
    unit: "1",
  },
];

const qrCodeAcknowledgementData: AcknowledgementSlipProps = {
  accountDetails: {
    accountNumber: "CH48 0900 0000 1556 1356 9",
    name: "Rahal GmbH",
    street: "St.Urbanstrasse 79",
    city: "4914 Roggwil",
  },
  referenceNumber: "27 12323 0000 0000 0006 22926",
  payableByDetails: {
    name: "Rahal GmbH",
    street: "St. Urbanstrasse 79",
    city: "4914 Roggwill BE",
  },
  currency: "CHF",
  amount: 6418.92,
};

const qrCodePayableToData: PayableToProps = {
  accountDetails: {
    accountNumber: "CH48 0900 0000 1556 1356 9",
    name: "Rahal GmbH",
    street: "St.Urbanstrasse 79",
    city: "4914 Roggwil",
  },
  referenceNumber: "27 12323 0000 0000 0006 22926",
  payableByDetails: {
    name: "Rahal GmbH",
    street: "St. Urbanstrasse 79",
    city: "4914 Roggwill BE",
  },
  additionalInformation: "R-2000 Umzugsfuchs",
};

export const DUMMY_DATA: PdfProps<InvoiceEmailHeaderProps> = {
  emailHeader: {},
  headerDetails: {
    offerNo: "O-4040 Umzugsfuchs",
    offerDate: "22.09.2023",
    createdBy: "Heiniger Michèle",
    logo: "",
    emailTemplateSettings: null
  },
  contactAddress: {
    address: {
      name: "Frau Natalie Semeli",
      city: "Buren an der Aare",
      postalCode: "3294",
      streetWithNumber: "Erlenweg 8",
    },
    email: "karinsch242@gmail.com",
    phone: "031 350 15 15",
  },
  movingDetails: {
    header: "Anger fur Ihren Umzug, Entsogung inkl. Ein- und Auspacken",
    address: [
      {
        country: "",
        description: "",
        postalCode: "",
        streetNumber: "",
      },
    ],
    workDates: [{ startDate: "30-11-2023", endDate: " 07-11-2023" }],
  },
  serviceItem: productItems,
  serviceItemFooter: {
    subTotal: "2000CHF",
    tax: "100CHF (7.7%)",
    discount: "100.50 CHF",
    grandTotal: "2100.50 CHF",
  },
  footerDetails: {
    firstColumn: {},
    secondColumn: {},
    thirdColumn: {},
    fourthColumn: {},
    columnSettings: null,
    currPage: 0,
    totalPages: 0,
  },
  qrCode: {
    acknowledgementSlip: qrCodeAcknowledgementData,
    payableTo: qrCodePayableToData,
  },
  aggrementDetails: "",
};
interface ActionType {
  payload: PdfSubInvoiceTypes;
  type: string;
}
interface EmailData {
  subject: string;
  description: string;
  email: string;
  pdf: string[];
}
let invoiceInfoObj = {
  subject: "",
  description: "",
};
const ReceiptPdfPreview = () => {
  const [newPageData, setNewPageData] = useState<ServiceList[][]>([]);
  // const [emailData, setEmailData] = useState({ subject: "", description: "" })
  const [invoiceData, setInvoiceData] =
    useState<PdfProps<InvoiceEmailHeaderProps>>(DUMMY_DATA);
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );
  const [emailTemplateSettings, setEmailTemplateSettings] = useState<EmailTemplate | null>(
    null
  );
  const [email, setEmail] = useState<EmailData>({
    description: "",
    email: "",
    pdf: [""],
    subject: "",
  });
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);

  const {
    auth: { user },
    global: { modal },
    invoice: { error, loading, collectiveInvoiceDetails },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const maxItemsFirstPage = 6;
  const maxItemsPerPage = 10;

  const router = useRouter();
  const { invoiceID } = router.query;

  useEffect(() => {

    (async () => {
      if (invoiceID) {
        const [template, emailTemplate, offerData] = await Promise.all([dispatch(
          getTemplateSettings()
        ), dispatch(
          readEmailSettings()
        ), dispatch(readCollectiveInvoiceDetails({ params: { filter: invoiceID } }))])
        if (template?.payload?.Template) {
          const {
            firstColumn,
            fourthColumn,
            isFirstColumn,
            isFourthColumn,
            isSecondColumn,
            isThirdColumn,
            secondColumn,
            thirdColumn,
          }: TemplateType = template.payload.Template;

          setTemplateSettings(() => ({
            firstColumn,
            secondColumn,
            thirdColumn,
            fourthColumn,
            isFirstColumn,
            isFourthColumn,
            isSecondColumn,
            isThirdColumn,
          }));
        }
        if (emailTemplate?.payload) {
          setEmailTemplateSettings({
            logo: emailTemplate?.payload?.logo,
            FooterColour: emailTemplate?.payload?.FooterColour,
            email: emailTemplate?.payload?.email,
            mobileNumber: emailTemplate?.payload?.mobileNumber,
            phoneNumber: emailTemplate?.payload?.phoneNumber,
            textColour: emailTemplate?.payload?.textColour,

          })
        }
        if (offerData?.payload) {
          const invoiceDetails: PdfSubInvoiceTypes = offerData?.payload;

          let formatData: PdfProps<InvoiceEmailHeaderProps> = {
            attachement: invoiceDetails?.attachement,
            emailHeader: {
              contractId: invoiceDetails?.invoiceID?.contractID?.contractNumber,
              workerName:
                invoiceDetails?.invoiceID?.contractID?.offerID?.createdBy
                  ?.fullName,
              contractStatus:
                invoiceDetails?.invoiceID?.contractID?.contractStatus,
              contentName:
                invoiceDetails?.invoiceID?.contractID?.offerID?.content
                  ?.contentName,
              contractTitle: invoiceDetails?.title,
            },
            headerDetails: {
              offerNo:
                invoiceDetails?.invoiceID?.contractID?.offerID?.offerNumber,
              offerDate: invoiceDetails?.invoiceID?.createdAt,
              createdBy: invoiceDetails?.invoiceID?.createdBy?.fullName,
              logo: invoiceDetails?.invoiceID?.createdBy?.company?.logo,
              emailTemplateSettings: emailTemplate?.payload
            },
            contactAddress: {
              address: {
                name: invoiceDetails?.invoiceID?.contractID?.offerID?.leadID
                  ?.customerDetail.fullName,
                city: invoiceDetails?.invoiceID?.contractID?.offerID?.leadID
                  ?.customerDetail?.address?.country,
                postalCode:
                  invoiceDetails?.invoiceID?.contractID?.offerID?.leadID
                    ?.customerDetail?.address?.postalCode,
                streetWithNumber:
                  invoiceDetails?.invoiceID?.contractID?.offerID?.leadID
                    ?.customerDetail?.address?.streetNumber,
              },
              email:
                invoiceDetails?.invoiceID?.contractID?.offerID?.leadID
                  ?.customerDetail?.email,
              phone:
                invoiceDetails?.invoiceID?.contractID?.offerID?.leadID
                  ?.customerDetail?.phoneNumber,
            },
            movingDetails: {
              address:
                invoiceDetails?.invoiceID?.contractID?.offerID?.leadID
                  ?.addressID?.address,
              header: invoiceDetails?.title as string,
              workDates: invoiceDetails?.invoiceID?.contractID?.offerID?.date,
              handleTitleUpdate: handleTitleUpdate,
              handleDescriptionUpdate: handleDescriptionUpdate,
            },
            serviceItem:
              invoiceDetails?.invoiceID?.contractID?.offerID?.serviceDetail
                ?.serviceDetail,
            serviceItemFooter: {
              subTotal:
                invoiceDetails?.invoiceID?.contractID?.offerID?.subTotal?.toString(),
              tax: invoiceDetails?.invoiceID?.contractID?.offerID?.taxAmount?.toString(),
              discount:
                invoiceDetails?.invoiceID?.contractID?.offerID?.discountAmount?.toString(),
              grandTotal:
                invoiceDetails?.invoiceID?.contractID?.offerID?.total?.toString(),
            },
            footerDetails: {
              firstColumn: {
                companyName:
                  user?.company?.companyName,
                email: user?.email,
                phoneNumber:
                  user?.company?.phoneNumber,
                taxNumber:
                  user?.company?.taxNumber,
                website: user?.company?.website,
              },
              secondColumn: {
                address: {
                  postalCode: user?.company.address.postalCode,
                  streetNumber: user?.company.address.streetNumber,
                },
                bankDetails: {
                  accountNumber: user?.company.bankDetails.accountNumber,
                  bankName: user?.company.bankDetails.bankName,
                  ibanNumber: user?.company.bankDetails.ibanNumber,
                },
              },
              thirdColumn: {},
              fourthColumn: {},
              columnSettings: null,
              currPage: 1,
              totalPages: calculateTotalPages,
            },
            qrCode: {
              acknowledgementSlip: qrCodeAcknowledgementData,
              payableTo: qrCodePayableToData,
            },
            aggrementDetails: invoiceDetails?.additionalDetails || "",
            isOffer: true,
            signature: invoiceDetails?.invoiceID?.contractID?.offerID?.signature,
            isCanvas: false
          };
          const distributeItems = (): ServiceList[][] => {
            const totalItems =
              invoiceDetails?.invoiceID?.contractID?.offerID?.serviceDetail
                ?.serviceDetail?.length;
            let pages: ServiceList[][] = [];

            if (totalItems > maxItemsFirstPage) {
              pages.push(
                invoiceDetails?.invoiceID?.contractID?.offerID?.serviceDetail?.serviceDetail?.slice(
                  0,
                  maxItemsFirstPage
                )
              );
              for (
                let i = maxItemsFirstPage;
                i < totalItems;
                i += maxItemsPerPage
              ) {
                pages.push(
                  invoiceDetails?.invoiceID?.contractID?.offerID?.serviceDetail?.serviceDetail?.slice(
                    i,
                    i + maxItemsPerPage
                  )
                );
              }
            } else {
              pages.push(
                invoiceDetails?.invoiceID?.contractID?.offerID?.serviceDetail
                  ?.serviceDetail
              );
            }

            return pages;
          };

          setNewPageData(distributeItems());
          setInvoiceData(formatData);
          setEmail({
            subject: invoiceDetails?.title as string,
            description: invoiceDetails?.additionalDetails as string,
            email:
              invoiceDetails?.invoiceID.contractID?.offerID?.leadID
                ?.customerDetail?.email,
            pdf: invoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.receiptContent?.attachments,
          });
          invoiceInfoObj = {
            ...invoiceInfoObj,
            subject: invoiceDetails?.invoiceID?.contractID?.offerID?.content?.receiptContent?.title as string,
            description: invoiceDetails?.invoiceID?.contractID?.offerID?.content?.receiptContent?.body as string,
          };
        }

      }
    })()

  }, [invoiceID]);


  const totalItems = invoiceData?.serviceItem?.length;
  // const totalItems = 34;

  const calculateTotalPages = useMemo(() => {
    const itemsOnFirstPage = Math.min(totalItems, maxItemsFirstPage);
    const remainingItems = totalItems - itemsOnFirstPage;
    const additionalPages = Math.ceil(remainingItems / maxItemsPerPage);

    // Add 1 for the first page and 1 for the last page
    return 1 + 1 + additionalPages;
  }, [totalItems, maxItemsFirstPage, maxItemsPerPage]);
  const handleEmailSend = async () => {
    setActiveButtonId("email");
    try {
      const localStorageContractData = await localStoreUtil.get_data(
        "contractComposeEmail"
      );

      const data = {
        id: invoiceID,
        email: localStorageContractData?.email,
        subject: localStorageContractData?.subject,
        description: localStorageContractData?.description,
        pdf: localStorageContractData?.pdf,
      };
      if (localStorageContractData) {
        const res = await dispatch(sendInvoiceEmail({ data }));
        if (res?.payload)
          dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
      }
      else {
        let apiData = {
          email: collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.leadID?.customerDetail?.email,
          content: collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content?.id,
          subject: collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content?.receiptContent?.title,
          description: collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content?.receiptContent?.body,
          pdf: collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content?.receiptContent?.attachments,
          id: collectiveInvoiceDetails?.invoiceID?.contractID?.id
        }
        const res = await dispatch(sendInvoiceEmail({ apiData }));
        if (res?.payload)
          dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
      }
    } catch (error) {
      console.error("Error in handleEmailSend:", error);
    }

  };
  const handleSendByPost = async () => {
    setActiveButtonId("post");
    const apiData = {
      emailStatus: 2,
      id: invoiceID,
    };
    const response = await dispatch(sendOfferByPost({ data: apiData }));
    if (response?.payload)
      dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleDonwload = () => {
    window.open(invoiceData?.attachement);
  };
  const handlePrint = () => {
    window.open(invoiceData?.attachement);
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  const onSuccess = () => {
    router.push("/invoices");
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Email Sent Successfully "
        subHeading="Thanks for updating offer we are happy to have you. "
        route={onSuccess}
      />
    ),
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Status Update Successful "
        subHeading="Thanks for updating offer we are happy to have you. "
        route={() => {
          dispatch(updateModalType({ type: ModalType.NONE }));
          router.back();
        }}
      />
    ),
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  const handleTitleUpdate = async (value: string) => {
    const apiData = {
      id: invoiceID,
      title: value,
    };
    const response = await dispatch(updateInvoiceContent({ data: apiData }));
    if (response?.payload) {
      invoiceInfoObj = { ...invoiceInfoObj, subject: value };
      return true;
    } else return false;
  };
  const handleDescriptionUpdate = async (value: string) => {
    const apiData = {
      id: invoiceID,
      additionalDetails: value,
    };

    const response = await dispatch(updateInvoiceContent({ data: apiData }));
    if (response?.payload) {
      invoiceInfoObj = { ...invoiceInfoObj, description: value };
      return true;
    } else return false;
  };

  //resetting active button state
  useEffect(() => {
    if (!loading) {
      setActiveButtonId(null);
    }
  }, [loading]);
  return (
    <>
      {
        loading ? <LoadingState /> :
          <>
            <InvoiceEmailHeader
              {...invoiceData?.emailHeader}
              contentName={invoiceData?.emailHeader.contentName}
              onEmailSend={handleEmailSend}
              loading={loading}
              onDownload={handleDonwload}
              onPrint={handlePrint}
              onSendViaPost={handleSendByPost}
              activeButtonId={activeButtonId}
              title={
                router.pathname?.includes("receipt")
                  ? "Receipt Details"
                  : "Invoice Details"
              }
            />
            <YogaPdfContainer>

              <div className="my-5">
                <Pdf<InvoiceEmailHeaderProps>
                  pdfData={invoiceData}
                  newPageData={newPageData}
                  templateSettings={templateSettings}
                  totalPages={calculateTotalPages}
                  isQr={true}
                  emailTemplateSettings={emailTemplateSettings}

                />
              </div>
            </YogaPdfContainer>

            {renderModal()}
          </>
      }
    </>

  );
};

export default ReceiptPdfPreview;
