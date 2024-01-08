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
  getTemplateSettings,
  readEmailSettings,
} from "@/api/slices/settingSlice/settings";
import {
  readContractDetails,
  sendContractEmail,
  updateContractContent,
} from "@/api/slices/contract/contractSlice";
import { contractTableTypes } from "@/types/contract";
import { useRouter } from "next/router";
import localStoreUtil from "@/utils/localstore.util";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { sendOfferByPost } from "@/api/slices/offer/offerSlice";

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
  // const [newPageData, setNewPageData] = useState<ServiceList[][]>([]);
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

  const {
    auth: { user },
    global: { modal },
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
        const [template, emailTemplate, offerData] = await Promise.all([
          dispatch(getTemplateSettings()),
          dispatch(readEmailSettings()),
          dispatch(readContractDetails({ params: { filter: offerID } })),
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
              offerNo: contractDetails?.offerID?.offerNumber,
              offerDate: contractDetails?.offerID?.createdAt,
              createdBy: contractDetails?.offerID?.createdBy?.fullName,
              logo: contractDetails?.offerID?.createdBy?.company?.logo,
              emailTemplateSettings: emailTemplate?.payload,
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
              tax: contractDetails?.offerID?.taxAmount?.toString(),
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

  const handleEmailSend = async () => {
    setActiveButtonId("email");
    try {
      const localStorageContractData = await localStoreUtil.get_data(
        "contractComposeEmail"
      );

      const data = {
        id: contractDetails?.id,
        email: localStorageContractData?.email,
        subject: localStorageContractData?.subject,
        description: localStorageContractData?.description,
        pdf: localStorageContractData?.pdf,
      };
      if (localStorageContractData) {
        const res = await dispatch(sendContractEmail({ data: data }));
        if (res?.payload) {
          dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
        }
      } else {
        let apiData = {
          email: contractDetails?.offerID?.leadID?.customerDetail?.email,
          content: contractDetails?.offerID?.content?.id,
          subject:
            contractDetails?.offerID?.content?.confirmationContent?.title,
          description:
            contractDetails?.offerID?.content?.confirmationContent?.body,
          pdf: contractDetails?.offerID?.content?.confirmationContent
            ?.attachments,
          id: contractDetails?.id,
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
    window.open(contractData?.attachement);
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
    templateSettings,
    emailTemplateSettings,
    dispatch,
    onClose,
    onSuccess,
    handleDonwload,
    handleEmailSend,
    handlePrint,
    handleSendByPost,
  };
};
