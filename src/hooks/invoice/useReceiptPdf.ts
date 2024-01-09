import {
  updateModalType,
  uploadFileToFirebase,
} from "@/api/slices/globalSlice/global";
import {
  readCollectiveInvoiceDetails,
  readQRCode,
  sendInvoiceEmail,
  updateInvoiceContent,
} from "@/api/slices/invoice/invoiceSlice";
import { sendOfferByPost } from "@/api/slices/offer/offerSlice";
import {
  getTemplateSettings,
  readEmailSettings,
} from "@/api/slices/settingSlice/settings";
import { ModalType } from "@/enums/ui";
import {
  AcknowledgementSlipProps,
  InvoiceEmailHeaderProps,
  PayableToProps,
  PdfProps,
  TemplateType,
} from "@/types";
import { ServiceList } from "@/types/offers";
import localStoreUtil from "@/utils/localstore.util";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useRouter } from "next/router";
import { EmailTemplate } from "@/types/settings";
import { PdfSubInvoiceTypes } from "@/types/invoice";

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
let invoiceInfoObj = {
  subject: "",
  description: "",
};
export const useReceiptPdf = () => {
  const [receiptData, setReceiptData] =
    useState<PdfProps<InvoiceEmailHeaderProps>>();
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );
  const [emailTemplateSettings, setEmailTemplateSettings] =
    useState<EmailTemplate | null>(null);
  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [qrCodeUrl, setQrCodeUrl] = useState("");
  


  const { modal, loading: loadingGlobal } = useAppSelector(
    (state) => state.global
  );
  const { loading, collectiveInvoiceDetails } = useAppSelector(
    (state) => state.invoice
  );
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const maxItemsFirstPage = 6;
  const maxItemsPerPage = 10;

  const router = useRouter();
  const { invoiceID } = router.query;

  useEffect(() => {
    (async () => {
      if (invoiceID) {
        const [template, emailTemplate, offerData, qrCode] = await Promise.all([
          dispatch(getTemplateSettings()),
          dispatch(readEmailSettings()),
          dispatch(
            readCollectiveInvoiceDetails({ params: { filter: invoiceID } })
          ),
          dispatch(readQRCode({ params: { filter: invoiceID } })),
        ]);
        if (qrCode?.payload) {
            setQrCodeUrl(qrCode.payload);
        }
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
              logo: emailTemplate?.payload?.logo,
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

          setReceiptData(formatData);

          invoiceInfoObj = {
            ...invoiceInfoObj,
            subject: invoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.receiptContent?.title as string,
            description: invoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.receiptContent?.body as string,
          };
        }
      }
    })();
  }, [invoiceID]);

  const totalItems = receiptData?.serviceItem?.length || 0;
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
      const data = await localStoreUtil.get_data("receiptEmailCompose");

      if (data && pdfFile) {
        formData.append("file", pdfFile as any);
        const fileUrl = await dispatch(uploadFileToFirebase(formData));
        let apiData = {
          ...data,
          pdf: fileUrl?.payload,
        };
        delete apiData["content"];
        const res = await dispatch(sendInvoiceEmail({ data: apiData }));
        if (res?.payload)
          //   await localStoreUtil.remove_data("receiptEmailCompose");
          dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
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
              ?.receiptContent?.title,
          description:
            collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.receiptContent?.body,
          attachments:
            collectiveInvoiceDetails?.invoiceID?.contractID?.offerID?.content
              ?.receiptContent?.attachments,
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
    window.open(receiptData?.attachement);
  };
  const handlePrint = () => {
    window.open(receiptData?.attachement);
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
    receiptData,
    templateSettings,
    emailTemplateSettings,
    loadingGlobal,
    loading,
    modal,
    activeButtonId,
    pdfFile,
    router,
    qrCodeUrl,
    setPdfFile,
    handleEmailSend,
    handleSendByPost,
    handleDonwload,
    handlePrint,
    onClose,
    onSuccess,
    dispatch,
  };
};
