import {
  readOfferDetails,
  sendOfferByPost,
  sendOfferEmail,
} from "@/api/slices/offer/offerSlice";
import {
  SystemSetting,
  getTemplateSettings,
  readEmailSettings,
  readSystemSettings,
} from "@/api/slices/settingSlice/settings";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { EmailTemplate } from "@/types/settings";
import { ContractEmailHeaderProps, PdfProps, TemplateType } from "@/types";
import { OffersTableRowTypes } from "@/types/offers";
import localStoreUtil from "@/utils/localstore.util";
import {
  updateModalType,
  uploadFileToFirebase,
} from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { updateQuery } from "@/utils/update-query";
import { staticEnums } from "@/utils/static";

let contractPdfInfo = {
  subject: "",
  description: "",
};

export const useOfferPdf = () => {
  const [offerData, setOfferData] = useState<PdfProps>();
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );

  const [emailTemplateSettings, setEmailTemplateSettings] =
    useState<EmailTemplate | null>(null);

  const [activeButtonId, setActiveButtonId] = useState<"post" | "email" | null>(
    null
  );

  const [pdfFile, setPdfFile] = useState(null);
  const [systemSetting, setSystemSettings] = useState<SystemSetting | null>(
    null
  );

  const { loading, offerDetails } = useAppSelector((state) => state.offer);
  const { modal, loading: loadingGlobal } = useAppSelector(
    (state) => state.global
  );
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { offerID, isMail } = router.query;

  useEffect(() => {
    (async () => {
      if (offerID) {
        const [template, emailTemplate, offerData, settings] =
          await Promise.all([
            dispatch(getTemplateSettings()),
            dispatch(readEmailSettings()),
            dispatch(readOfferDetails({ params: { filter: offerID } })),
            dispatch(readSystemSettings()),
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

        if (settings?.payload?.Setting) {
          setSystemSettings({ ...settings?.payload?.Setting });
        }
        if (offerData?.payload) {
          const offerDetails: OffersTableRowTypes = offerData?.payload;

          let serviceDiscountSum =
            offerDetails?.serviceDetail?.serviceDetail?.reduce(
              (acc, service) => {
                const price = service?.discount || 0;
                return acc + price;
              },
              0
            );

          const updatedTotalDiscount =
            (offerDetails?.subTotal / 100) * offerDetails?.discountAmount;

          let discountPercentage;
          if (
            staticEnums["DiscountType"][
              offerData?.payload
                ?.discountType as keyof (typeof staticEnums)["DiscountType"]
            ] === 1
          ) {
            discountPercentage =
              ((offerDetails?.discountAmount + serviceDiscountSum) /
                offerDetails?.subTotal) *
              100;
          } else {
            discountPercentage =
              ((updatedTotalDiscount + serviceDiscountSum) /
                offerDetails?.subTotal) *
              100;
          }

          let formatData: PdfProps<ContractEmailHeaderProps> = {
            id: offerDetails?.id,
            attachement: offerDetails?.attachement,
            emailHeader: {
              offerNo: offerDetails?.offerNumber,
              emailStatus: offerDetails?.emailStatus,
              contractTitle: offerDetails?.title,
              worker: offerDetails?.createdBy?.fullName,
            },
            headerDetails: {
              offerNo: offerDetails?.offerNumber,
              companyName: offerDetails?.createdBy.company.companyName,
              offerDate: offerDetails?.createdAt,
              createdBy: offerDetails?.createdBy?.fullName,
              logo: emailTemplate?.payload?.logo,
              emailTemplateSettings: emailTemplate?.payload,
              isReverseLogo: template.payload.Template?.order,
            },
            contactAddress: {
              address: {
                name: offerDetails?.leadID?.customerDetail?.fullName,
                companyName: offerDetails?.leadID?.customerDetail?.companyName,
                city: offerDetails?.leadID?.customerDetail?.address?.country,
                postalCode:
                  offerDetails?.leadID?.customerDetail?.address?.postalCode,
                streetWithNumber:
                  offerDetails?.leadID?.customerDetail?.address?.streetNumber,
              },
              email: offerDetails?.leadID?.customerDetail?.email,
              phone: offerDetails?.leadID?.customerDetail?.phoneNumber,
              mobile: offerDetails?.leadID?.customerDetail?.mobileNumber,
              gender: offerDetails?.leadID?.customerDetail?.gender?.toString(),
              isReverseInfo: template.payload.Template?.order,
            },
            movingDetails: {
              address: offerDetails?.addressID?.address,
              header: offerDetails?.title,
              workDates: offerDetails?.date,
              handleTitleUpdate: () => {},
              handleDescriptionUpdate: () => {},
              time: offerDetails?.time,
            },
            serviceItem: offerDetails?.serviceDetail?.serviceDetail,
            serviceItemFooter: {
              isTax: offerDetails?.isTax,
              isDiscount: offerDetails?.isDiscount,
              subTotal: offerDetails?.subTotal?.toString(),
              tax: offerDetails?.taxAmount?.toString(),
              discount: offerDetails?.discountAmount?.toString(),
              discountPercentage: discountPercentage.toString(),
              updatedDiscountAmount: updatedTotalDiscount.toString(),
              grandTotal: offerDetails?.total?.toString(),
              discountType: offerDetails?.discountType,
              taxType: offerDetails?.taxType,
              isOfferPDF: true,
              serviceDiscountSum:
                offerDetails?.serviceDetail?.serviceDetail?.reduce(
                  (acc, service) => {
                    const price = service?.discount || 0;

                    return acc + price;
                  },
                  0
                ),
              discountDescription: offerDetails?.discountDescription,
            },
            footerDetails: {
              firstColumn: {
                companyName: offerDetails?.createdBy?.company?.companyName,
                email: offerDetails?.createdBy?.email,
                phoneNumber: offerDetails?.createdBy?.company?.phoneNumber,
                taxNumber: offerDetails?.createdBy?.company?.taxNumber,
                website: offerDetails?.createdBy?.company?.website,
              },
              secondColumn: {
                address: {
                  postalCode:
                    offerDetails?.createdBy?.company.address.postalCode,
                  streetNumber:
                    offerDetails?.createdBy?.company.address.streetNumber,
                },
                bankDetails: {
                  accountNumber:
                    offerDetails?.createdBy?.company.bankDetails.accountNumber,
                  bankName:
                    offerDetails?.createdBy?.company.bankDetails.bankName,
                  ibanNumber:
                    offerDetails?.createdBy?.company.bankDetails.ibanNumber,
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
              totalPages: 10,
            },
            aggrementDetails: offerDetails?.additionalDetails || "",
            isOffer: true,
            signature: offerDetails?.signature,
            isCanvas: false,
          };

          setOfferData(formatData);
          contractPdfInfo = {
            ...contractPdfInfo,
            subject: offerDetails?.content?.confirmationContent
              ?.title as string,
            description: offerDetails?.content?.confirmationContent
              ?.body as string,
          };
        }
      }
    })();
  }, [offerID]);

  const handleEmailSend = async () => {
    try {
      const formData = new FormData();

      if (!pdfFile) return;
      formData.append("file", pdfFile as any);

      const fileUrl = await dispatch(uploadFileToFirebase(formData));

      if (fileUrl?.payload) {
        localStoreUtil.store_data("pdf", fileUrl?.payload);
      }

      if (isMail) {
        router.push(
          {
            pathname: `/offers/details`,
            query: { ...router.query, offer: offerDetails?.id, isMail: isMail },
          }

          // `/offers/details?offer=${offerDetails?.id}&isMail=${isMail}`
        );
      } else {
        setActiveButtonId("email");

        const data = await localStoreUtil.get_data("contractComposeEmail");

        if (data) {
          // delete apiData["id"]

          let apiData = { ...data, pdf: fileUrl?.payload };
          delete apiData["content"];

          const res = await dispatch(sendOfferEmail({ data: apiData }));
          if (res?.payload) {
            dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
          }
        } else {
          let apiData = {
            email: offerDetails?.leadID?.customerDetail?.email,
            content: offerDetails?.content?.id,
            subject:
              offerDetails?.title +
              " " +
              offerDetails?.offerNumber +
              " " +
              offerDetails?.createdBy?.company?.companyName,
            description: offerDetails?.content?.offerContent?.body,
            attachments: offerDetails?.content?.offerContent?.attachments,
            id: offerDetails?.id,
            pdf: fileUrl?.payload,
            // pdf: res?.payload
          };
          const res = await dispatch(sendOfferEmail({ data: apiData }));
          if (res?.payload) {
            dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
          }
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
      id: offerID,
    };
    const response = await dispatch(sendOfferByPost({ data: apiData }));
    if (response?.payload)
      dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleDonwload = () => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        offerDetails?.offerNumber +
        "-" +
        offerDetails?.createdBy?.company?.companyName
      }.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    }
  };

  const handlePrint = () => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile);

      let printWindow = window.open(url, "_blank");
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
    router.pathname = "/offers";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  return {
    offerData,
    templateSettings,
    emailTemplateSettings,
    activeButtonId,
    modal,
    loading,
    loadingGlobal,
    pdfFile,
    setPdfFile,
    handleEmailSend,
    handleDonwload,
    handleSendByPost,
    handlePrint,
    onClose,
    onSuccess,
    systemSetting,
    offerDetails,
  };
};
