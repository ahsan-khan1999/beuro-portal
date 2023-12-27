import { updateModalType } from "@/api/slices/globalSlice/global";
import {
  readInvoiceDetails,
  sendInvoiceEmail,
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
import { InvoiceCardContentProps } from "@/types/invoice";
import { ContentTableRowTypes } from "@/types/content";
import { sendContractEmail } from "@/api/slices/contract/contractSlice";

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
  payload: InvoiceTableRowDetailsTypes;
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
      dispatch(readInvoiceDetails({ params: { filter: invoiceID } })).then(
        (response: ActionType) => {
          if (response?.payload) {
            console.log(response);
            const invoiceDetails: InvoiceTableRowDetailsTypes =
              response?.payload;
            let formatData: PdfProps<InvoiceEmailHeaderProps> = {
              emailHeader: {
                contractId: invoiceDetails.contractID.contractNumber,
                workerName: "Talha",
                contractStatus: invoiceDetails.contractID.contractStatus,
                contentName:
                  invoiceDetails.contractID.offerID.content.contentName,
              },
              headerDetails: {
                offerNo: invoiceDetails?.contractID.offerID.offerNumber,
                offerDate: invoiceDetails?.createdAt,
                createdBy: invoiceDetails?.createdBy?.fullName,
              },
              contactAddress: {
                address: {
                  name: invoiceDetails?.contractID.offerID.leadID.customerDetail
                    .fullName,
                  city: invoiceDetails?.contractID.offerID.leadID
                    ?.customerDetail?.address?.country,
                  postalCode:
                    invoiceDetails?.contractID?.offerID?.leadID?.customerDetail
                      ?.address?.postalCode,
                  streetWithNumber:
                    invoiceDetails?.contractID?.offerID?.leadID?.customerDetail
                      ?.address?.streetNumber,
                },
                email:
                  invoiceDetails?.contractID.offerID.leadID?.customerDetail
                    ?.email,
                phone:
                  invoiceDetails?.contractID.offerID.leadID?.customerDetail
                    ?.phoneNumber,
              },
              movingDetails: {
                address:
                  invoiceDetails?.contractID?.offerID?.leadID?.addressID?.address,
                header: invoiceDetails?.contractID?.offerID?.title,
                workDates: invoiceDetails?.contractID?.offerID?.date,
              },
              serviceItem:
                invoiceDetails?.contractID?.offerID?.serviceDetail
                  ?.serviceDetail,
              serviceItemFooter: {
                subTotal:
                  invoiceDetails?.contractID?.offerID?.subTotal?.toString(),
                tax: invoiceDetails?.contractID?.offerID?.taxAmount?.toString(),
                discount:
                  invoiceDetails?.contractID?.offerID?.discountAmount?.toString(),
                grandTotal:
                  invoiceDetails?.contractID?.offerID?.total?.toString(),
              },
              footerDetails: {
                firstColumn: {
                  companyName: invoiceDetails.createdBy?.company?.companyName,
                  email: invoiceDetails?.createdBy.email,
                  phoneNumber: invoiceDetails.createdBy?.company?.phoneNumber,
                  taxNumber: invoiceDetails.createdBy?.company?.taxNumber,
                  website: invoiceDetails.createdBy?.company?.website,
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
                invoiceDetails?.contractID.offerID.content?.confirmationContent
                  ?.description || "",
              isOffer: false,
            };
            const distributeItems = (): ServiceList[][] => {
              const totalItems =
                invoiceDetails?.contractID?.offerID?.serviceDetail
                  ?.serviceDetail?.length;
              let pages: ServiceList[][] = [];

              if (totalItems > maxItemsFirstPage) {
                pages.push(
                  invoiceDetails?.contractID?.offerID?.serviceDetail?.serviceDetail?.slice(
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
                    invoiceDetails?.contractID?.offerID?.serviceDetail?.serviceDetail?.slice(
                      i,
                      i + maxItemsPerPage
                    )
                  );
                }
              } else {
                pages.push(
                  invoiceDetails?.contractID?.offerID?.serviceDetail
                    ?.serviceDetail
                );
              }

              return pages;
            };

            setNewPageData(distributeItems());
            setInvoiceData(formatData);
            setEmail({
              ...invoiceDetails?.contractID?.offerID?.content?.invoiceContent,
              email: invoiceDetails.contractID.offerID.createdBy.email,
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
  console.log(email);
  const handleEmailSend = async () => {
    console.log("hi");
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
    // const data = await localStoreUtil.get_data("contractComposeEmail");
    // const res = await dispatch(sendOfferEmail({ data }));
    // if (res?.payload)
    //   dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
    // await localStoreUtil.remove_data("contractComposeEmail");
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
    router.push("/offers");
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

  return (
    <>
      <InvoiceEmailHeader
        {...invoiceData?.emailHeader}
        contentName={invoiceData?.emailHeader.contentName}
        onEmailSend={handleEmailSend}
        loading={loading}
        onDownload={handleDonwload}
        onPrint={handlePrint}
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
