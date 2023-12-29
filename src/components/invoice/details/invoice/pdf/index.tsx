import { updateModalType } from "@/api/slices/globalSlice/global";
import {
  readCollectiveInvoiceDetails,
  readInvoiceDetails,
  sendInvoiceEmail,
  updateInvoiceContent,
} from "@/api/slices/invoice/invoiceSlice";
import { sendOfferEmail } from "@/api/slices/offer/offerSlice";
import { getTemplateSettings } from "@/api/slices/settingSlice/settings";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { Pdf } from "@/components/pdf/pdf";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  AcknowledgementSlipProps,
  CompanySettingsActionType,
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
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import { InvoiceCardContentProps, PdfSubInvoiceTypes, SubInvoiceTableRowTypes } from "@/types/invoice";
import { ContentTableRowTypes } from "@/types/content";
import { sendContractEmail } from "@/api/slices/contract/contractSlice";
import { updateQuery } from "@/utils/update-query";

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
    logo:""
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

const DetailsPdfPriview = () => {
  const [newPageData, setNewPageData] = useState<ServiceList[][]>([]);
  const [invoiceData, setInvoiceData] =
    useState<PdfProps<InvoiceEmailHeaderProps>>(DUMMY_DATA);
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );
  const [email, setEmail] = useState<
    ContentTableRowTypes["invoiceContent"] & { email: string }
  >();

  const {
    auth: { user },
    global: { modal },
    invoice: { error, loading },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const maxItemsFirstPage = 6;
  const maxItemsPerPage = 10;

  const router = useRouter();
  const { invoiceID } = router.query;

  useEffect(() => {
    if (invoiceID) {
      dispatch(readCollectiveInvoiceDetails({ params: { filter: invoiceID } })).then(
        (response: ActionType) => {
          if (response?.payload) {
            const invoiceDetails: PdfSubInvoiceTypes =
              response?.payload;
              console.log(invoiceDetails,"invoiceDetails");
              
            let formatData: PdfProps<InvoiceEmailHeaderProps> = {
              emailHeader: {
                contractId: invoiceDetails?.invoiceID?.contractID?.contractNumber,
                workerName: invoiceDetails?.invoiceID?.contractID?.offerID?.createdBy?.fullName,
                contractStatus: invoiceDetails?.invoiceID?.contractID?.contractStatus,
                contentName:
                  invoiceDetails?.invoiceID?.contractID?.offerID?.content?.contentName,
                contractTitle: invoiceDetails?.title,

              },
              headerDetails: {
                offerNo: invoiceDetails?.invoiceID?.contractID?.offerID?.offerNumber,
                offerDate: invoiceDetails?.invoiceID?.createdAt,
                createdBy: invoiceDetails?.invoiceID?.createdBy?.fullName,
                logo:invoiceDetails?.invoiceID?.createdBy?.company?.logo
              },
              contactAddress: {
                address: {
                  name: invoiceDetails?.invoiceID?.contractID?.offerID?.leadID?.customerDetail
                    .fullName,
                  city: invoiceDetails?.invoiceID?.contractID?.offerID?.leadID
                    ?.customerDetail?.address?.country,
                  postalCode:
                    invoiceDetails?.invoiceID?.contractID?.offerID?.leadID?.customerDetail
                      ?.address?.postalCode,
                  streetWithNumber:
                    invoiceDetails?.invoiceID?.contractID?.offerID?.leadID?.customerDetail
                      ?.address?.streetNumber,
                },
                email:
                  invoiceDetails?.invoiceID?.contractID?.offerID?.leadID?.customerDetail
                    ?.email,
                phone:
                  invoiceDetails?.invoiceID?.contractID?.offerID?.leadID?.customerDetail
                    ?.phoneNumber,
              },
              movingDetails: {
                address:
                  invoiceDetails?.invoiceID?.contractID?.offerID?.leadID?.addressID?.address,
                header: invoiceDetails?.invoiceID?.contractID?.offerID?.title,
                workDates: invoiceDetails?.invoiceID?.contractID?.offerID?.date,
                handleTitleUpdate: handleTitleUpdate,
                handleDescriptionUpdate: handleDescriptionUpdate

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
                  companyName: invoiceDetails?.invoiceID.createdBy?.company?.companyName,
                  email: invoiceDetails?.invoiceID?.createdBy.email,
                  phoneNumber: invoiceDetails?.invoiceID.createdBy?.company?.phoneNumber,
                  taxNumber: invoiceDetails?.invoiceID.createdBy?.company?.taxNumber,
                  website: invoiceDetails?.invoiceID.createdBy?.company?.website,
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
                thirdColumn: {
                  row1: "row 1",
                  row2: "row 2",
                  row3: "row 3",
                  row4: "row 4",
                  row5: "row 5",
                },
                fourthColumn: {
                  row1: "row 1",
                  row2: "row 2",
                  row3: "row 3",
                  row4: "row 4",
                  row5: "row 5",
                },
                columnSettings: null,
                currPage: 1,
                totalPages: calculateTotalPages,
              },
              qrCode: {
                acknowledgementSlip: qrCodeAcknowledgementData,
                payableTo: qrCodePayableToData,
              },
              aggrementDetails:
                invoiceDetails?.additionalDetails || "",
              isOffer: false,
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
              ...invoiceDetails?.invoiceID?.contractID?.offerID?.content?.invoiceContent,
              email: invoiceDetails?.invoiceID.contractID?.offerID?.createdBy?.email,
            });
          }
        }
      );
    }
  }, [invoiceID]);

  useEffect(() => {
    (async () => {
      try {
        const response: CompanySettingsActionType = await dispatch(
          getTemplateSettings()
        );
        if (response?.payload?.Template) {
          const {
            firstColumn,
            fourthColumn,
            isFirstColumn,
            isFourthColumn,
            isSecondColumn,
            isThirdColumn,
            secondColumn,
            thirdColumn,
          }: TemplateType = response.payload.Template;

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
      } catch (error) {
        console.error("Error fetching template settings:", error);
      }
    })();
  }, []);
  // const totalItems = offerData.serviceItem.length;
  const totalItems = 34;

  const calculateTotalPages = useMemo(() => {
    const itemsOnFirstPage = Math.min(totalItems, maxItemsFirstPage);
    const remainingItems = totalItems - itemsOnFirstPage;
    const additionalPages = Math.ceil(remainingItems / maxItemsPerPage);

    // Add 1 for the first page and 1 for the last page
    return 1 + 1 + additionalPages;
  }, [totalItems, maxItemsFirstPage, maxItemsPerPage]);
  const handleEmailSend = async () => {
    if (email) {
      const data = {
        id: invoiceID,
        email: email.email,
        subject: email.title,
        description: email.description,
        pdf: email.attachments,
      };
      const res = await dispatch(sendInvoiceEmail({ data }));
      if (res?.payload)
        dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
    }
   
  };

  const handleDonwload = () => {
    console.log("download");
  };
  const handlePrint = () => {
    console.log("print");
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
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  const handleTitleUpdate = async (value: string) => {
    const apiData = {
      id: invoiceID,
      title: value,
    }
    const response = await dispatch(updateInvoiceContent({ data: apiData }))
    if (response?.payload) return true
    else return false
  }
  const handleDescriptionUpdate = async (value: string) => {
    const apiData = {
      id: invoiceID,
      additionalDetails: value
    }

    const response = await dispatch(updateInvoiceContent({ data: apiData }))
    if (response?.payload) return true
    else return false
  }
  const handleSendByPost = () => {
    router.pathname = "/invoices"
    updateQuery(router, router.locale as string)
  }
  return (
    <>
      <InvoiceEmailHeader
        {...invoiceData?.emailHeader}
        contentName={invoiceData?.emailHeader.contentName}
        onEmailSend={handleEmailSend}
        loading={loading}
        onDownload={handleDonwload}
        onPrint={handlePrint}
        onSendViaPost={handleSendByPost}
        title={router.pathname?.includes("receipt") ?  "Receipt Details" : "Invoice Details"}
      />
      <div className="my-5">
        <Pdf<InvoiceEmailHeaderProps>
          pdfData={invoiceData}
          newPageData={newPageData}
          templateSettings={templateSettings}
          totalPages={calculateTotalPages}
          isQr={true}
        />
      </div>
      {renderModal()}
    </>
  );
};

export default DetailsPdfPriview;
