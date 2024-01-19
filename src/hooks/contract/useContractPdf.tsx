import {
  AcknowledgementSlipProps,
  ContractEmailHeaderProps,
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
import { TAX_PERCENTAGE } from "@/services/HttpProvider";
import { blobToFile, calculateTax, mergePDFs } from "@/utils/utility";

import { pdf as reactPdf } from "@react-pdf/renderer";
// import { PdfFile } from "@/components/reactPdf/pdf-file";
import { useMergedPdfDownload } from "@/components/reactPdf/generate-merged-pdf-download";

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
  const { offerID } = router.query;

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
          const contractDetails: contractTableTypes = offerData?.payload;
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
              fileType: "contract"
            },
            contactAddress: {
              address: {
                name: contractDetails?.offerID?.leadID?.customerDetail
                  ?.fullName,
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
            },
            movingDetails: {
              address: contractDetails?.offerID?.addressID?.address,
              header: contractDetails?.title,
              workDates: contractDetails?.offerID?.date,
              handleTitleUpdate: handleTitleUpdate,
              handleDescriptionUpdate: handleDescriptionUpdate,
            },
            serviceItem: contractDetails?.offerID?.serviceDetail?.serviceDetail,
            serviceItemFooter: {
              subTotal: contractDetails?.offerID?.subTotal?.toString(),
              tax: calculateTax(
                contractDetails?.offerID?.subTotal,
                Number(TAX_PERCENTAGE)
              )?.toString(),
              discount: contractDetails?.offerID?.discountAmount?.toString(),
              grandTotal: contractDetails?.offerID?.total?.toString(),
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
            aggrementDetails: contractDetails?.additionalDetails || "",
            isOffer: true,
            signature: contractDetails?.offerID?.signature,
            isCanvas: false,
          };
          // const distributeItems = (): ServiceList[][] => {
          //   const totalItems =
          //     contractDetails?.offerID?.serviceDetail?.serviceDetail?.length;
          //   let pages: ServiceList[][] = [];

          //   if (totalItems > maxItemsFirstPage) {
          //     pages.push(
          //       contractDetails?.offerID?.serviceDetail?.serviceDetail?.slice(
          //         0,
          //         maxItemsFirstPage
          //       )
          //     );
          //     for (
          //       let i = maxItemsFirstPage;
          //       i < totalItems;
          //       i += maxItemsPerPage
          //     ) {
          //       pages.push(
          //         contractDetails?.offerID?.serviceDetail?.serviceDetail?.slice(
          //           i,
          //           i + maxItemsPerPage
          //         )
          //       );
          //     }
          //   } else {
          //     pages.push(
          //       contractDetails?.offerID?.serviceDetail?.serviceDetail
          //     );
          //   }

          //   return pages;
          // };

          // setNewPageData(distributeItems());
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

  const totalItems = contractData?.serviceItem?.length ?? 0;

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
      setActiveButtonId("email");

      const data = await localStoreUtil.get_data("contractComposeEmail");
      if (!mergedFile) return;
      formData.append("file", mergedFile as any);
      const fileUrl = await dispatch(uploadFileToFirebase(formData));
      if (data) {
        let apiData = { ...data, pdf: fileUrl?.payload };

        delete apiData["content"];
        const res = await dispatch(sendContractEmail({ data: apiData }));
        if (res?.payload) {
          dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
        }
      } else {
        let apiData = {
          email: contractDetails?.offerID?.leadID?.customerDetail?.email,
          content: contractDetails?.offerID?.content?.id,
          subject:
            contractDetails?.title +" "+ contractDetails?.contractNumber +" "+ contractDetails?.offerID?.createdBy?.company?.companyName,
          description:
            contractDetails?.offerID?.content?.confirmationContent?.body,
          attachments:
            contractDetails?.offerID?.content?.confirmationContent?.attachments,
          id: contractDetails?.id,
          pdf: fileUrl?.payload,
        };
        const res = await dispatch(sendContractEmail({ data: apiData }));
        if (res?.payload) {
          dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
        }
      }
    } catch (error) {
      console.error("Error in handleEmailSend:", error);
    }
  };
  const handleDonwload = () => {
    // window.open(contractData?.attachement);

    if (mergedPdfUrl) {
      const url = mergedPdfUrl;
      const a = document.createElement('a');
      a.href = url;
      a.download = `${contractDetails?.contractNumber + "-" + contractDetails?.offerID?.createdBy?.company?.companyName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);

    }
  };
  const handlePrint = () => {
    window.open(contractData?.attachement);
  };
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  const onSuccess = () => {
    router.push("/contract");
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
  };
};
