import {
  updateModalType,
  uploadFileToFirebase,
} from "@/api/slices/globalSlice/global";
import {
  readCollectiveInvoiceDetails,
  sendInvoiceEmail,
  updateInvoiceContent,
} from "@/api/slices/invoice/invoiceSlice";
import { sendOfferByPost } from "@/api/slices/offer/offerSlice";
import { ModalType } from "@/enums/ui";
import {
  AcknowledgementSlipProps,
  InvoiceEmailHeaderProps,
  PayableToProps,
  PdfProps,
  TemplateType,
} from "@/types";
import { ServiceList } from "@/types/offers";
import { EmailTemplate } from "@/types/settings";
import localStoreUtil from "@/utils/localstore.util";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useRouter } from "next/router";
import { PdfSubInvoiceTypes } from "@/types/invoice";
import {
  getTemplateSettings,
  readEmailSettings,
} from "@/api/slices/settingSlice/settings";
import { sendContractEmail } from "@/api/slices/contract/contractSlice";
import { useTranslation } from "next-i18next";

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

export const useInvoicePdf = () => {
  const {t:translate} = useTranslation()
  // const [emailData, setEmailData] = useState({ subject: "", description: "" })
  const [invoiceData, setInvoiceData] =
    useState<PdfProps<InvoiceEmailHeaderProps>>();
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );
  const [emailTemplateSettings, setEmailTemplateSettings] =
    useState<EmailTemplate | null>(null);
  const [email, setEmail] = useState<EmailData>({
    description: "",
    email: "",
    pdf: [""],
    subject: "",
  });
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState(null);

  const {
    auth: { user },
    global: { modal, loading: loadingGlobal },
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
        const [template, emailTemplate, offerData] = await Promise.all([
          dispatch(getTemplateSettings()),
          dispatch(readEmailSettings()),
          dispatch(
            readCollectiveInvoiceDetails({ params: { filter: invoiceID } })
          ),
        ]);
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
          });
        }
        if (offerData?.payload) {
          const invoiceDetails: PdfSubInvoiceTypes = offerData?.payload;

          console.log(invoiceDetails);
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
              emailTemplateSettings: emailTemplate?.payload,
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
              invoiceCreatedAmount:
                invoiceDetails?.invoiceID?.invoiceCreatedAmount.toString(),
              invoicePaidAmount: invoiceDetails?.invoiceID?.paidAmount.toString(),
              isInvoice: true,
            },
            footerDetails: {
              firstColumn: {
                companyName: user?.company?.companyName,
                email: user?.email,
                phoneNumber: user?.company?.phoneNumber,
                taxNumber: user?.company?.taxNumber,
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
            signature:
              invoiceDetails?.invoiceID?.contractID?.offerID?.signature,
            isCanvas: false,
          };

          setInvoiceData(formatData);
          setEmail({
            subject: invoiceDetails?.title as string,
            description: invoiceDetails?.additionalDetails as string,
            email:
              invoiceDetails?.invoiceID.contractID?.offerID?.leadID
                ?.customerDetail?.email,
            pdf: invoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.invoiceContent?.attachments,
          });
          invoiceInfoObj = {
            ...invoiceInfoObj,
            subject: invoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.invoiceContent?.title as string,
            description: invoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.invoiceContent?.body as string,
          };
        }
      }
    })();
  }, [invoiceID]);

  const totalItems = invoiceData?.serviceItem?.length || 0;
  // const totalItems = 34;

  const calculateTotalPages = useMemo(() => {
    const itemsOnFirstPage = Math.min(totalItems, maxItemsFirstPage);
    const remainingItems = totalItems - itemsOnFirstPage;
    const additionalPages = Math.ceil(remainingItems / maxItemsPerPage);

    // Add 1 for the first page and 1 for the last page
    return 1 + 1 + additionalPages;
  }, [totalItems, maxItemsFirstPage, maxItemsPerPage]);
  const handleEmailSend = async () => {
    try {
      const formData = new FormData();
      setActiveButtonId("email");

      const data = await localStoreUtil.get_data("invoiceComposeEmail");
      if (data && pdfFile) {
        formData.append("file", pdfFile as any);
        const fileUrl = await dispatch(uploadFileToFirebase(formData));
        let apiData = { ...data, pdf: fileUrl?.payload };

        delete apiData["content"];
        const res = await dispatch(sendInvoiceEmail({ data: apiData }));
        if (res?.payload) {
          await localStoreUtil.remove_data("invoiceComposeEmail");
          dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
        }
      } else {
        let apiData = {
          email:
            collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.leadID
              ?.customerDetail?.email,
          content:
            collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.id,
          subject:
            collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.invoiceContent?.title,
          description:
            collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.invoiceContent?.body,
          attachmetns:
            collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.invoiceContent?.attachments,
          id: collectiveInvoiceDetails?.invoiceID?.contractID?.id,
        };
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

  return {
    invoiceData,
    emailTemplateSettings,
    templateSettings,
    activeButtonId,
    pdfFile,
    router,
    modal,
    loadingGlobal,
    loading,
    setPdfFile,
    dispatch,
    handleEmailSend,
    handleSendByPost,
    handlePrint,
    handleDonwload,
    onClose,
    onSuccess,
    translate
  };
};
