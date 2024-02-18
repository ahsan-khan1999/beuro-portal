import {
  updateModalType,
  uploadFileToFirebase,
} from "@/api/slices/globalSlice/global";
import {
  readCollectiveInvoiceDetails,
  readQRCode,
  sendInvoiceEmail,
  sendOfferByPost,
  updateInvoiceContent,
} from "@/api/slices/invoice/invoiceSlice";
import { ModalType } from "@/enums/ui";
import {
  AcknowledgementSlipProps,
  InvoiceEmailHeaderProps,
  PayableToProps,
  PdfProps,
  TemplateType,
} from "@/types";
import { EmailTemplate } from "@/types/settings";
import localStoreUtil from "@/utils/localstore.util";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useRouter } from "next/router";
import { PdfSubInvoiceTypes } from "@/types/invoice";
import {
  SystemSetting,
  getTemplateSettings,
  readEmailSettings,
  readSystemSettings,
} from "@/api/slices/settingSlice/settings";
import { useTranslation } from "next-i18next";
import { calculateTax } from "@/utils/utility";
import { TAX_PERCENTAGE } from "@/services/HttpProvider";
import { useMergedPdfDownload } from "@/components/reactPdf/generate-merged-pdf-download";

let invoiceInfoObj = {
  subject: "",
  description: "",
};

export const useInvoicePdf = () => {
  const { t: translate } = useTranslation();
  // const [emailData, setEmailData] = useState({ subject: "", description: "" })
  const [invoiceData, setInvoiceData] =
    useState<PdfProps<InvoiceEmailHeaderProps>>();
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );
  const [emailTemplateSettings, setEmailTemplateSettings] =
    useState<EmailTemplate | null>(null);

  const [systemSetting, setSystemSettings] = useState<SystemSetting | null>(
    null
  );

  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [remoteFileBlob, setRemoteFileBlob] = useState<Blob | null>();

  const [activeButtonId, setActiveButtonId] = useState<string | null>(null);

  const { loading, collectiveInvoiceDetails } = useAppSelector(
    (state) => state.invoice
  );
  const { modal, loading: loadingGlobal } = useAppSelector(
    (state) => state.global
  );
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const maxItemsFirstPage = 6;
  const maxItemsPerPage = 10;

  const router = useRouter();
  const { invoiceID, isMail } = router.query;

  useEffect(() => {
    (async () => {
      if (invoiceID) {
        const [template, emailTemplate, offerData, qrCode, settings] =
          await Promise.all([
            dispatch(getTemplateSettings()),
            dispatch(readEmailSettings()),
            dispatch(
              readCollectiveInvoiceDetails({ params: { filter: invoiceID } })
            ),
            dispatch(readQRCode({ params: { filter: invoiceID } })),
            dispatch(readSystemSettings()),
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
            order,
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
            order,
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
              contractId: invoiceDetails?.invoiceNumber,
              workerName: invoiceDetails?.invoiceID?.createdBy?.fullName,
              contractStatus: invoiceDetails?.invoiceStatus,
              contentName: invoiceDetails?.invoiceID?.content?.contentName,
              contractTitle: invoiceDetails?.title,
            },
            headerDetails: {
              offerNo: invoiceDetails?.invoiceNumber,
              offerDate: invoiceDetails?.createdAt,
              createdBy: invoiceDetails?.createdBy?.fullName,
              logo: emailTemplate?.payload?.logo,
              emailTemplateSettings: emailTemplate?.payload,
              fileType: "invoice",
              isReverseLogo: template.payload.Template?.order,
            },
            contactAddress: {
              address: {
                name: invoiceDetails?.invoiceID?.customerDetail.fullName,
                city: invoiceDetails?.invoiceID?.customerDetail?.address
                  ?.country,
                postalCode:
                  invoiceDetails?.invoiceID?.customerDetail?.address
                    ?.postalCode,
                streetWithNumber:
                  invoiceDetails?.invoiceID?.customerDetail?.address
                    ?.streetNumber,
              },
              email: invoiceDetails?.invoiceID?.customerDetail?.email,
              phone: invoiceDetails?.invoiceID?.customerDetail?.phoneNumber,
              gender:
                invoiceDetails?.invoiceID?.customerDetail?.gender?.toString(),
              isReverseInfo: template.payload.Template?.order,
            },
            movingDetails: {
              address: invoiceDetails?.invoiceID?.addressID?.address,
              header: invoiceDetails?.title as string,
              workDates: invoiceDetails?.invoiceID?.date,
              handleTitleUpdate: handleTitleUpdate,
              handleDescriptionUpdate: handleDescriptionUpdate,
              time: invoiceDetails?.invoiceID?.time,
            },
            serviceItem:
              invoiceDetails?.invoiceID?.serviceDetail?.serviceDetail,
            serviceItemFooter: {
              isTax: invoiceDetails?.invoiceID?.isTax,
              isDiscount: invoiceDetails?.invoiceID?.isDiscount,
              subTotal: invoiceDetails?.invoiceID?.subTotal?.toString(),
              tax: invoiceDetails?.invoiceID?.taxAmount?.toString(),

              discount: invoiceDetails?.invoiceID?.discountAmount?.toString(),
              grandTotal: invoiceDetails?.invoiceID?.total?.toString(),
              invoiceCreatedAmount:
                invoiceDetails?.invoiceID?.invoiceCreatedAmount.toString(),
              invoicePaidAmount:
                invoiceDetails?.invoiceID?.paidAmount.toString(),
              isShowExtraAmount: true,
              invoiceAmount: invoiceDetails?.amount.toString(),
              invoiceStatus: invoiceDetails?.invoiceStatus.toString(),
              discountType: invoiceDetails?.invoiceID?.discountType,
              taxType: invoiceDetails?.invoiceID?.taxType,
              serviceDiscountSum:
                invoiceDetails?.invoiceID?.serviceDetail?.serviceDetail?.reduce(
                  (acc, service) => {
                    const price = service?.discount || 0;
                    return acc + price;
                  },
                  0
                ),
              discountDescription:
                invoiceDetails?.invoiceID?.discountDescription,
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
              thirdColumn: {
                row1: "Standorte",
                row2: "bern-Solothurn",
                row3: "Aargau-Luzern",
                row4: "Basel-Zürich",
                row5: "",
              },
              fourthColumn: {},
              columnSettings: null,
              currPage: 1,
              totalPages: calculateTotalPages,
            },
            aggrementDetails: invoiceDetails?.additionalDetails || "",
            isOffer: true,
            // signature:
            //   invoiceDetails?.invoiceID?.signature,
            isCanvas: false,
          };

          setInvoiceData(formatData);
          invoiceInfoObj = {
            ...invoiceInfoObj,
            subject: invoiceDetails?.invoiceID?.content?.invoiceContent
              ?.title as string,
            description: invoiceDetails?.invoiceID?.content?.invoiceContent
              ?.body as string,
          };
        }
        if (settings?.payload?.Setting) {
          setSystemSettings({ ...settings?.payload?.Setting });
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

  useEffect(() => {
    if (qrCodeUrl) {
      (async () => {
        const remotePdfResponse = await fetch(qrCodeUrl);
        const remotePdfBlob = await remotePdfResponse.blob();
        setRemoteFileBlob(remotePdfBlob);
      })();
    }
  }, [qrCodeUrl]);

  const fileName = invoiceData?.emailHeader?.contractId;
  const contractDataProps = useMemo(
    () => ({
      emailTemplateSettings,
      templateSettings,
      data: invoiceData,
      fileName,
      qrCode: qrCodeUrl,
      remoteFileBlob,
      systemSetting,
    }),
    [
      emailTemplateSettings,
      templateSettings,
      invoiceData,
      fileName,
      qrCodeUrl,
      remoteFileBlob,
      systemSetting,
    ]
  );

  const { mergedFile, mergedPdfUrl, isPdfRendering } =
    useMergedPdfDownload(contractDataProps);

  const handleEmailSend = async () => {
    try {
      const formData = new FormData();
      setActiveButtonId("email");
      if (!mergedFile) return;
      formData.append("file", mergedFile as any);
      const fileUrl = await dispatch(uploadFileToFirebase(formData));
      if (fileUrl?.payload) {
        localStoreUtil.store_data("pdf", fileUrl?.payload);
      }
      if (isMail) {
        router.push(
          `/invoices/compose-mail?invoiceID=${invoiceID}&isMail=${isMail}`
        );
      } else {
        const data = await localStoreUtil.get_data("invoiceComposeEmail");
        if (data) {
          formData.append("file", mergedFile as any);
          const fileUrl = await dispatch(uploadFileToFirebase(formData));
          let apiData = { ...data, pdf: fileUrl?.payload };

          delete apiData["content"];
          const res = await dispatch(sendInvoiceEmail({ data: apiData }));
          if (res?.payload) {
            // await localStoreUtil.remove_data("invoiceComposeEmail");
            dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
          }
        } else {
          let apiData = {
            email: collectiveInvoiceDetails?.invoiceID?.customerDetail?.email,
            content: collectiveInvoiceDetails?.invoiceID?.content?.id,
            subject:
              collectiveInvoiceDetails?.title +
              " " +
              collectiveInvoiceDetails?.invoiceNumber +
              " " +
              collectiveInvoiceDetails?.invoiceID?.createdBy?.company
                ?.companyName,
            description:
              collectiveInvoiceDetails?.invoiceID?.content?.invoiceContent
                ?.body,
            attachmetns:
              collectiveInvoiceDetails?.invoiceID?.content?.invoiceContent
                ?.attachments,
            id: collectiveInvoiceDetails?.invoiceID?.id,
          };
          const res = await dispatch(sendInvoiceEmail({ apiData }));
          if (res?.payload)
            dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
        }
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
    if (mergedPdfUrl) {
      const url = mergedPdfUrl;
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        collectiveInvoiceDetails?.invoiceNumber +
        "-" +
        collectiveInvoiceDetails?.invoiceID?.createdBy?.company?.companyName
      }.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    }
  };
  const handlePrint = () => {
    window.open(invoiceData?.attachement);
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  const onSuccess = () => {
    // router.push("/invoices");
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
    activeButtonId,
    mergedPdfUrl,
    isPdfRendering,
    router,
    modal,
    loadingGlobal,
    loading,
    translate,
    dispatch,
    handleEmailSend,
    handleSendByPost,
    handlePrint,
    handleDonwload,
    onClose,
    onSuccess,
    collectiveInvoiceDetails,
  };
};
