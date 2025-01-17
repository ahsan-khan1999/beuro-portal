import { ContractEmailHeaderProps, PdfProps, TemplateType } from "@/types";
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
  readContractDetails,
  readQRCode,
  sendContractEmail,
  sendOfferByPost,
  updateContractContent,
} from "@/api/slices/contract/contractSlice";
import { contractTableTypes } from "@/types/contract";
import { useRouter } from "next/router";
import localStoreUtil from "@/utils/localstore.util";
import {
  updateModalType,
  uploadFileToFirebase,
} from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { useMergedPdfDownload } from "@/components/reactPdf/generate-merged-pdf-download";
import { staticEnums } from "@/utils/static";

let contractPdfInfo = {
  subject: "",
  description: "",
};

export const useContractPdf = () => {
  const [contractData, setContractData] =
    useState<PdfProps<ContractEmailHeaderProps>>();
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
  const [isMailSend, setIsMailSend] = useState(false);
  const [remoteFileBlob, setRemoteFileBlob] = useState<Blob | null>();
  const {
    auth: { user },
    global: { modal, loading: loadingGlobal },
    contract: { error, loading, contractDetails },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const maxItemsFirstPage = 6;
  const maxItemsPerPage = 10;

  const router = useRouter();
  const { offerID, isMail } = router.query;

  useEffect(() => {
    (async () => {
      if (offerID) {
        const [template, emailTemplate, offerData, qrCode, settings] =
          await Promise.all([
            dispatch(getTemplateSettings()),
            dispatch(readEmailSettings()),
            dispatch(readContractDetails({ params: { filter: offerID } })),
            dispatch(readQRCode({ params: { filter: offerID } })),
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
          const contractDetails: contractTableTypes = offerData?.payload;

          let serviceDiscountSum =
            contractDetails?.offerID?.serviceDetail?.serviceDetail?.reduce(
              (acc, service) => {
                const price = service?.discount || 0;
                return acc + price;
              },
              0
            );

          const updatedTotalDiscount =
            (contractDetails?.offerID?.subTotal / 100) *
            contractDetails?.offerID?.discountAmount;

          let discountPercentage;
          if (
            staticEnums["DiscountType"][
              contractDetails?.offerID
                ?.discountType as keyof (typeof staticEnums)["DiscountType"]
            ] === 1
          ) {
            discountPercentage =
              ((contractDetails?.offerID?.discountAmount + serviceDiscountSum) /
                contractDetails?.offerID?.subTotal) *
              100;
          } else {
            discountPercentage =
              ((updatedTotalDiscount + serviceDiscountSum) /
                contractDetails?.offerID?.subTotal) *
              100;
          }

          let formatData: PdfProps<ContractEmailHeaderProps> = {
            id: contractDetails?.id,
            attachement: contractDetails?.attachement,
            emailHeader: {
              offerNo: contractDetails?.contractNumber,
              emailStatus: contractDetails?.contractStatus,
              contractTitle: contractDetails?.title,
              worker: contractDetails?.offerID?.createdBy?.fullName,
            },
            headerDetails: {
              offerNo: contractDetails?.contractNumber,
              offerDate: contractDetails?.createdAt,
              createdBy: contractDetails?.offerID?.createdBy?.fullName,
              logo: emailTemplate?.payload?.logo,
              emailTemplateSettings: emailTemplate?.payload,
              fileType: "contract",
              isReverseLogo: template.payload.Template?.order,
              companyName:
                contractDetails?.offerID?.createdBy?.company?.companyName,
            },
            contactAddress: {
              address: {
                name: contractDetails?.offerID?.leadID?.customerDetail
                  ?.fullName,
                companyName:
                  contractDetails?.offerID?.leadID?.customerDetail?.companyName,
                city: contractDetails?.offerID?.leadID?.customerDetail?.address
                  ?.country,
                postalCode:
                  contractDetails?.offerID?.leadID?.customerDetail?.address
                    ?.postalCode,
                streetWithNumber:
                  contractDetails?.offerID?.leadID?.customerDetail?.address
                    ?.streetNumber,
              },
              email: contractDetails?.offerID?.leadID?.customerDetail?.email,
              phone:
                contractDetails?.offerID?.leadID?.customerDetail?.phoneNumber,
              mobile:
                contractDetails?.offerID?.leadID?.customerDetail?.mobileNumber,

              gender:
                contractDetails?.offerID?.leadID?.customerDetail?.gender?.toString(),
              isReverseInfo: template?.payload?.Template?.order,
            },
            movingDetails: {
              address: contractDetails?.offerID?.addressID?.address,
              header: contractDetails?.title,
              workDates: contractDetails?.offerID?.date,
              handleTitleUpdate: handleTitleUpdate,
              handleDescriptionUpdate: handleDescriptionUpdate,
              time: contractDetails?.offerID?.time,
            },
            serviceItem: contractDetails?.offerID?.serviceDetail?.serviceDetail,
            serviceItemFooter: {
              isTax: contractDetails?.offerID?.isTax,
              isDiscount: contractDetails?.offerID?.isDiscount,
              subTotal: contractDetails?.offerID?.subTotal?.toString(),
              tax: contractDetails?.offerID?.taxAmount?.toString(),
              discount: contractDetails?.offerID?.discountAmount?.toString(),
              discountType: contractDetails?.offerID?.discountType,
              discountPercentage: discountPercentage?.toString(),
              updatedDiscountAmount: updatedTotalDiscount?.toString(),
              grandTotal: contractDetails?.offerID?.total?.toString(),
              taxType: contractDetails?.offerID?.taxType,
              isContractPDF: true,
              serviceDiscountSum:
                contractDetails?.offerID?.serviceDetail?.serviceDetail?.reduce(
                  (acc, service) => {
                    const price = service?.discount || 0;
                    return acc + price;
                  },
                  0
                ),
              discountDescription:
                contractDetails?.offerID?.discountDescription,
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
                  postalCode: user?.company?.address?.postalCode,
                  streetNumber: user?.company?.address?.streetNumber,
                },
                bankDetails: {
                  accountNumber: user?.company?.bankDetails?.accountNumber,
                  bankName: user?.company?.bankDetails?.bankName,
                  ibanNumber: user?.company?.bankDetails?.ibanNumber,
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
            aggrementDetails: contractDetails?.additionalDetails || "",
            isOffer: true,
            signature: contractDetails?.offerID?.signature,
            isCanvas: false,
          };

          setContractData(formatData);
          contractPdfInfo = {
            ...contractPdfInfo,
            subject:
              contractDetails?.offerID?.content?.confirmationContent?.title,
            description:
              contractDetails?.offerID?.content?.confirmationContent?.body,
          };
        }
        if (settings?.payload?.Setting) {
          setSystemSettings({ ...settings?.payload?.Setting });
        }
      }
    })();
  }, [offerID]);

  useEffect(() => {
    isMailSend &&
      dispatch(updateModalType({ type: ModalType.LOADING_MAIL_GIF }));
  }, [isMailSend]);

  const totalItems = contractData?.serviceItem?.length ?? 0;
  const calculateTotalPages = useMemo(() => {
    const itemsOnFirstPage = Math.min(totalItems, maxItemsFirstPage);
    const remainingItems = totalItems - itemsOnFirstPage;
    const additionalPages = Math.ceil(remainingItems / maxItemsPerPage);

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

  const fileName = contractData?.emailHeader?.offerNo;
  const contractDataProps = useMemo(
    () => ({
      emailTemplateSettings,
      templateSettings,
      data: contractData,
      fileName,
      qrCode: qrCodeUrl,
      remoteFileBlob,
      systemSetting,
      companyName: contractData?.headerDetails?.companyName,
    }),
    [
      emailTemplateSettings,
      templateSettings,
      contractData,
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
          pathname: `/contract/details`,
          query: {
            ...router.query,
            offer: contractDetails?.id,
            isMail: isMail,
          },
        });
      } else {
        setActiveButtonId("email");
        const data = await localStoreUtil.get_data("contractComposeEmail");

        if (data) {
          let apiData = { ...data, pdf: fileUrl?.payload };

          delete apiData["content"];

          setIsMailSend(true);
          const res = await dispatch(sendContractEmail({ data: apiData }));

          setTimeout(() => {
            if (res?.payload) {
              setIsMailSend(false);
              dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
            } else {
              setIsMailSend(false);
            }
          }, 1800);
        } else {
          let apiData = {
            email: contractDetails?.offerID?.leadID?.customerDetail?.email,
            content: contractDetails?.offerID?.content?.id,
            subject:
              contractDetails?.title +
              " " +
              contractDetails?.contractNumber +
              " " +
              contractDetails?.offerID?.createdBy?.company?.companyName,
            description:
              contractDetails?.offerID?.content?.confirmationContent?.body,
            attachments:
              contractDetails?.offerID?.content?.confirmationContent
                ?.attachments,
            id: contractDetails?.id,
            pdf: fileUrl?.payload,
          };

          setIsMailSend(true);
          const res = await dispatch(sendContractEmail({ data: apiData }));

          setTimeout(() => {
            if (res?.payload) {
              setIsMailSend(false);
              dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
            } else {
              setIsMailSend(false);
            }
          }, 1800);
        }
      }
    } catch (error) {
      console.error("Error in handleEmailSend:", error);
    }
  };

  const handleDonwload = () => {
    if (mergedPdfUrl) {
      const url = mergedPdfUrl;
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        contractDetails?.offerID?.createdBy?.company?.companyName +
        "-" +
        contractDetails?.contractNumber
      }.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handlePrint = () => {
    if (mergedPdfUrl) {
      let printWindow = window.open(mergedPdfUrl, "_blank");
      if (!printWindow) return;
      printWindow.onload = function () {
        printWindow?.print();
      };
    }
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
      id: offerID,
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
      id: offerID,
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
      id: offerID,
    };
    const response = await dispatch(sendOfferByPost({ data: apiData }));
    if (response?.payload)
      dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  return {
    contractData,
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
    contractDetails,
  };
};
