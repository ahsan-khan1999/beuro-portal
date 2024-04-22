import {
  AcknowledgementSlipProps,
  ContractEmailHeaderProps,
  InvoiceEmailHeaderProps,
  PayableToProps,
  PdfProps,
  TemplateType,
} from "@/types";
import { EmailTemplate } from "@/types/settings";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  SystemSetting,
  getTemplateSettings,
  readEmailSettings,
  readSystemSettings,
} from "@/api/slices/settingSlice/settings";
import {
  readQRCode,
  sendContractEmail,
  sendOfferByPost,
  updateContractContent,
} from "@/api/slices/contract/contractSlice";
import { useRouter } from "next/router";
import localStoreUtil from "@/utils/localstore.util";
import {
  updateModalType,
  uploadFileToFirebase,
} from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";

import { useMergedPdfDownload } from "@/components/reactPdf/generate-merged-pdf-download";
import { staticEnums } from "@/utils/static";
import {
  readInvoiceDetails,
  readMainInvoiceQRCode,
} from "@/api/slices/invoice/invoiceSlice";
import { MainInvoicePdfDetailTableRowTypes } from "@/types/invoice";

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

let contractPdfInfo = {
  subject: "",
  description: "",
};

export const useMainInvoicePdf = () => {
  const [invoiceData, setContractData] =
    useState<PdfProps<InvoiceEmailHeaderProps>>();
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );
  const [emailTemplateSettings, setEmailTemplateSettings] =
    useState<EmailTemplate | null>(null);

  const [activeButtonId, setActiveButtonId] = useState<"post" | "email" | null>(
    null
  );
  const [systemSetting, setSystemSettings] = useState<SystemSetting | null>(
    null
  );

  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [remoteFileBlob, setRemoteFileBlob] = useState<Blob | null>();
  const {
    auth: { user },
    global: { modal, loading: loadingGlobal },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const { loading, invoiceDetails } = useAppSelector((state) => state.invoice);

  const maxItemsFirstPage = 6;
  const maxItemsPerPage = 10;

  const router = useRouter();
  const { invoice, isMail } = router.query;

  useEffect(() => {
    (async () => {
      if (invoice) {
        const [template, emailTemplate, offerData, qrCode, settings] =
          await Promise.all([
            dispatch(getTemplateSettings()),
            dispatch(readEmailSettings()),
            dispatch(readInvoiceDetails({ params: { filter: invoice } })),
            dispatch(readMainInvoiceQRCode({ params: { filter: invoice } })),
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
          const invoiceDetails: MainInvoicePdfDetailTableRowTypes =
            offerData?.payload;

          let serviceDiscountSum =
            invoiceDetails?.serviceDetail?.serviceDetail?.reduce(
              (acc, service) => {
                const price = service?.discount || 0;
                return acc + price;
              },
              0
            );

          const updatedTotalDiscount =
            (invoiceDetails?.subTotal / 100) * invoiceDetails?.discountAmount;

          let discountPercentage;
          if (
            staticEnums["DiscountType"][
              invoiceDetails?.discountType as keyof (typeof staticEnums)["DiscountType"]
            ] === 1
          ) {
            discountPercentage =
              ((invoiceDetails?.discountAmount + serviceDiscountSum) /
                invoiceDetails?.subTotal) *
              100;
          } else {
            discountPercentage =
              ((updatedTotalDiscount + serviceDiscountSum) /
                invoiceDetails?.subTotal) *
              100;
          }

          let formatData: PdfProps<ContractEmailHeaderProps> = {
            id: invoiceDetails?.id,
            attachement: invoiceDetails?.attachement,
            emailHeader: {
              offerNo: invoiceDetails?.invoiceNumber,
              emailStatus: invoiceDetails?.invoiceStatus,
              contractTitle: invoiceDetails?.title,
              worker: invoiceDetails?.createdBy?.fullName,
            },
            headerDetails: {
              offerNo: invoiceDetails?.invoiceNumber,
              offerDate: invoiceDetails?.createdAt,
              createdBy: invoiceDetails?.createdBy?.fullName,
              logo: emailTemplate?.payload?.logo,
              emailTemplateSettings: emailTemplate?.payload,
              fileType: "contract",
              isReverseLogo: template.payload.Template?.order,
            },
            contactAddress: {
              address: {
                name: invoiceDetails?.customerDetail?.fullName,
                companyName: invoiceDetails?.customerDetail?.companyName,
                city: invoiceDetails?.customerDetail?.address?.country,
                postalCode: invoiceDetails?.customerDetail?.address?.postalCode,
                streetWithNumber:
                  invoiceDetails?.customerDetail?.address?.streetNumber,
              },
              email: invoiceDetails?.customerDetail?.email,
              phone: invoiceDetails?.customerDetail?.phoneNumber,
              mobile: invoiceDetails?.customerDetail?.mobileNumber,

              gender: invoiceDetails?.customerDetail?.gender?.toString(),
              isReverseInfo: template.payload.Template?.order,
            },
            movingDetails: {
              address: invoiceDetails?.addressID?.address,
              header: invoiceDetails?.title,
              workDates: invoiceDetails?.date,
              handleTitleUpdate: handleTitleUpdate,
              handleDescriptionUpdate: handleDescriptionUpdate,
              time: invoiceDetails?.time,
            },
            serviceItem: invoiceDetails?.serviceDetail?.serviceDetail,
            serviceItemFooter: {
              isTax: invoiceDetails?.isTax,
              isDiscount: invoiceDetails?.isDiscount,
              subTotal: invoiceDetails?.subTotal?.toString(),
              tax: invoiceDetails?.taxAmount?.toString(),
              discount: invoiceDetails?.discountAmount?.toString(),
              discountType: invoiceDetails?.discountType,
              discountPercentage: discountPercentage.toString(),
              updatedDiscountAmount: updatedTotalDiscount.toString(),
              grandTotal: invoiceDetails?.total?.toString(),
              invoicePaidAmount: invoiceDetails?.paidAmount.toString(),
              invoiceAmount: invoiceDetails?.paidAmount.toString(),
              invoiceStatus: invoiceDetails?.invoiceStatus.toString(),
              taxType: invoiceDetails?.taxType,
              serviceDiscountSum:
                invoiceDetails?.serviceDetail?.serviceDetail?.reduce(
                  (acc, service) => {
                    const price = service?.discount || 0;
                    return acc + price;
                  },
                  0
                ),
              discountDescription: invoiceDetails?.discountDescription,
              isMainInvoice: true,
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
            isCanvas: false,
          };

          setContractData(formatData);
          contractPdfInfo = {
            ...contractPdfInfo,
            subject: invoiceDetails?.content?.confirmationContent?.title,
            description: invoiceDetails?.content?.confirmationContent?.body,
          };
        }
        if (settings?.payload?.Setting) {
          setSystemSettings({ ...settings?.payload?.Setting });
        }
      }
    })();
  }, [invoice]);

  const totalItems = invoiceData?.serviceItem?.length ?? 0;

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
      if (!mergedFile) return;
      formData.append("file", mergedFile as any);
      const fileUrl = await dispatch(uploadFileToFirebase(formData));
      if (fileUrl?.payload) {
        localStoreUtil.store_data("pdf", fileUrl?.payload);
      }
      if (isMail) {
        router.push({
          pathname: `/invoices/compose-mail`,
          query: { ...router.query, invoice: invoice, isMail: isMail },
        });
      } else {
        setActiveButtonId("email");

        const data = await localStoreUtil.get_data("contractComposeEmail");

        if (data) {
          let apiData = { ...data, pdf: fileUrl?.payload };

          delete apiData["content"];
          const res = await dispatch(sendContractEmail({ data: apiData }));
          if (res?.payload) {
            dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
          }
        } else {
          let apiData = {
            email: invoiceDetails?.customerDetail?.email,
            content: invoiceDetails?.content?.id,
            subject:
              invoiceDetails?.title +
              " " +
              invoiceDetails?.invoiceNumber +
              " " +
              invoiceDetails?.createdBy?.company?.companyName,
            description: invoiceDetails?.content?.confirmationContent?.body,
            attachments:
              invoiceDetails?.content?.confirmationContent?.attachments,
            id: invoiceDetails?.id,
            pdf: fileUrl?.payload,
          };
          const res = await dispatch(sendContractEmail({ data: apiData }));
          if (res?.payload) {
            dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
          }
        }
      }
    } catch (error) {
      console.error("Error in handleEmailSend:", error);
    }
  };
  const handleDonwload = () => {
    // window.open(invoiceData?.attachement);

    if (mergedPdfUrl) {
      const url = mergedPdfUrl;
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        invoiceDetails?.invoiceNumber +
        "-" +
        invoiceDetails?.createdBy?.company?.companyName
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
    router.push("/contract?status=None");
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const handleTitleUpdate = async (value: string) => {
    const apiData = {
      id: invoice,
      title: value,
    };
    const response = await dispatch(updateContractContent({ data: apiData }));
    if (response?.payload) {
      contractPdfInfo = { ...contractPdfInfo, subject: value };
      return true;
    } else return false;
  };
  const handleDescriptionUpdate = async (value: string) => {
    const apiData = {
      id: invoice,
      additionalDetails: value,
    };

    const response = await dispatch(updateContractContent({ data: apiData }));
    if (response?.payload) {
      contractPdfInfo = { ...contractPdfInfo, description: value };

      return true;
    } else return false;
  };
  const handleSendByPost = async () => {
    setActiveButtonId("post");
    const apiData = {
      emailStatus: 2,
      id: invoice,
    };
    const response = await dispatch(sendOfferByPost({ data: apiData }));
    if (response?.payload)
      dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  return {
    invoiceData,
    modal,
    loading,
    activeButtonId,
    router,
    loadingGlobal,
    mergedPdfUrl,
    isPdfRendering,
    dispatch,
    onClose,
    onSuccess,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
    invoiceDetails,
    translate,
  };
};
