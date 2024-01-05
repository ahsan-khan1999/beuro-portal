import React, { useEffect, useMemo, useState } from "react";
import EmailCard from "./PdfCard";
import { Pdf } from "@/components/pdf/pdf";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  readOfferDetails,
  sendOfferEmail,
} from "@/api/slices/offer/offerSlice";
import { useRouter } from "next/router";
import { OffersTableRowTypes, ServiceList } from "@/types/offers";
import {
  AcknowledgementSlipProps,
  CompanySettingsActionType,
  ContractEmailHeaderProps,
  EmailHeaderProps,
  EmailSettingsActionType,
  PayableToProps,
  PdfProps,
  TemplateType,
} from "@/types";
import { Layout } from "@/layout";

import { getTemplateSettings, readEmailSettings } from "@/api/slices/settingSlice/settings";
import localStoreUtil from "@/utils/localstore.util";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import {
  readContractDetails,
  sendContractEmail,
  sendOfferByPost,
  updateContractContent,
} from "@/api/slices/contract/contractSlice";
import { contractTableTypes } from "@/types/contract";
import { updateQuery } from "@/utils/update-query";
import { EmailTemplate } from "@/types/settings";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import { YogaPdfContainer } from "@/components/pdf/yoga-pdf-container";

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

export const DUMMY_DATA: PdfProps = {
  emailHeader: { emailStatus: "pending", offerNo: "23-A" },
  headerDetails: {
    offerNo: "O-4040 Umzugsfuchs",
    offerDate: "22.09.2023",
    createdBy: "Heiniger Michèle",
    logo: "",
    emailTemplateSettings: null
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
    emailTemplateSettings: null
  },
  qrCode: {
    acknowledgementSlip: qrCodeAcknowledgementData,
    payableTo: qrCodePayableToData,
  },
  aggrementDetails: "",
};
interface ActionType {
  payload: contractTableTypes;
  type: string;
}

let contractPdfInfo = {
  subject: "",
  description: "",
};
const PdfPriview = () => {
  const [newPageData, setNewPageData] = useState<ServiceList[][]>([]);
  const [offerData, setOfferData] =
    useState<PdfProps<ContractEmailHeaderProps>>(DUMMY_DATA);
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );
  const [emailTemplateSettings, setEmailTemplateSettings] = useState<EmailTemplate | null>(
    null
  );

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
        const [template, emailTemplate, offerData] = await Promise.all([dispatch(
          getTemplateSettings()
        ), dispatch(
          readEmailSettings()
        ), dispatch(readContractDetails({ params: { filter: offerID } }))])
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

          })
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
              emailTemplateSettings: emailTemplate?.payload
            },
            contactAddress: {
              address: {
                name: contractDetails?.offerID?.leadID?.customerDetail
                  ?.fullName,
                city: contractDetails?.offerID?.leadID?.customerDetail
                  ?.address?.country,
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
            serviceItem:
              contractDetails?.offerID?.serviceDetail?.serviceDetail,
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
            isCanvas: false
          };
          const distributeItems = (): ServiceList[][] => {
            const totalItems =
              contractDetails?.offerID?.serviceDetail?.serviceDetail?.length;
            let pages: ServiceList[][] = [];

            if (totalItems > maxItemsFirstPage) {
              pages.push(
                contractDetails?.offerID?.serviceDetail?.serviceDetail?.slice(
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
                  contractDetails?.offerID?.serviceDetail?.serviceDetail?.slice(
                    i,
                    i + maxItemsPerPage
                  )
                );
              }
            } else {
              pages.push(
                contractDetails?.offerID?.serviceDetail?.serviceDetail
              );
            }

            return pages;
          };

          setNewPageData(distributeItems());
          setOfferData(formatData);
          contractPdfInfo = {
            ...contractPdfInfo,
            subject: contractDetails?.offerID?.content?.confirmationContent?.title,
            description: contractDetails?.offerID?.content?.confirmationContent?.body,
          };
        }

      }
    })()
  }, [offerID]);


  const totalItems = offerData?.serviceItem?.length;

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
      }
      else {
        let apiData = {
          email: contractDetails?.offerID?.leadID?.customerDetail?.email,
          content: contractDetails?.offerID?.content?.id,
          subject: contractDetails?.offerID?.content?.confirmationContent?.title,
          description: contractDetails?.offerID?.content?.confirmationContent?.body,
          pdf: contractDetails?.offerID?.content?.confirmationContent?.attachments,
          id: contractDetails?.id
        }
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
    window.open(offerData?.attachement);
  };
  const handlePrint = () => {
    window.open(offerData?.attachement);
  };
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  const onSuccess = () => {
    router.push("/contract");
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
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Status Update Successful "
        subHeading="Thanks for updating offer we are happy to have you. "
        route={() => {
          dispatch(updateModalType({ type: ModalType.NONE }));
          router.back();
        }}
      />
    ),
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
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
  return (
    <>
      {
        loading ? <LoadingState /> :
          <>
            <EmailCard
              contractStatus={offerData?.emailHeader?.emailStatus}
              contractNo={offerData?.emailHeader?.offerNo}
              onEmailSend={handleEmailSend}
              loading={loading}
              onDownload={handleDonwload}
              onPrint={handlePrint}
              contractTitle={offerData?.emailHeader?.contractTitle || ""}
              worker={offerData?.emailHeader?.worker || ""}
              onSendViaPost={handleSendByPost}
              activeButtonId={activeButtonId}
            />
            <YogaPdfContainer>

              <div className="my-5">
                <Pdf<EmailHeaderProps>
                  pdfData={offerData}
                  newPageData={newPageData}
                  templateSettings={templateSettings}
                  totalPages={calculateTotalPages}
                  emailTemplateSettings={emailTemplateSettings}
                />
              </div>
            </YogaPdfContainer>

            {renderModal()}
          </>
      }
    </>
  );
};

export default PdfPriview;
