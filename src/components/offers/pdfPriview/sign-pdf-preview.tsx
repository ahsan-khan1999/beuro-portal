import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  readOfferPublicDetails,
  sendOfferEmail,
} from "@/api/slices/offer/offerSlice";
import { useRouter } from "next/router";
import { PublicOffersTableRowTypes, ServiceList } from "@/types/offers";
import { EmailHeaderProps, PdfProps, TemplateType } from "@/types";
import { SystemSetting } from "@/api/slices/settingSlice/settings";
import localStoreUtil from "@/utils/localstore.util";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { SignPdf } from "@/components/pdf/sign-pdf";
import { EmailTemplate } from "@/types/settings";
import { YogaPdfContainer } from "@/components/pdf/yoga-pdf-container";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import { smoothScrollToSection } from "@/utils/utility";

export const DUMMY_DATA: PdfProps = {
  emailHeader: { emailStatus: "pending", offerNo: "23-A" },
  headerDetails: {
    offerNo: "O-4040 Umzugsfuchs",
    offerDate: "22.09.2023",
    createdBy: "Heiniger Michèle",
    logo: "",
    emailTemplateSettings: null,
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
  serviceItem: [],
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
    emailTemplateSettings: null,
  },
  aggrementDetails: "",
};
interface ActionType {
  payload: PublicOffersTableRowTypes;
  type: string;
}

const SignPdfPreview = () => {
  const [newPageData, setNewPageData] = useState<ServiceList[][]>([]);
  const [offerData, setOfferData] = useState<PdfProps | null>(null);

  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );

  const [emailTemplateSettings, setEmailTemplateSettings] =
    useState<EmailTemplate | null>(null);

  const [systemSetting, setSystemSettings] = useState<SystemSetting | null>(
    null
  );

  const { loading } = useAppSelector((state) => state.offer);
  const dispatch = useAppDispatch();

  const maxItemsFirstPage = 6;
  const maxItemsPerPage = 10;

  const router = useRouter();
  const { offerID, action } = router.query;

  useEffect(() => {
    if (offerID) {
      dispatch(readOfferPublicDetails({ params: { filter: offerID } })).then(
        (response: ActionType) => {
          if (response?.payload) {
            const offerDetails: PublicOffersTableRowTypes = response?.payload;

            let formatData: PdfProps = {
              isCanvas: true,
              signature: offerDetails?.Offer?.signature,
              id: offerDetails?.Offer?.id,
              emailHeader: {
                offerNo: offerDetails?.Offer?.offerNumber,
                emailStatus: offerDetails?.Offer?.emailStatus,
              },
              headerDetails: {
                offerNo: offerDetails?.Offer?.offerNumber,
                offerDate: offerDetails?.Offer?.createdAt,
                createdBy: offerDetails?.Offer?.createdBy?.fullName,
                logo: offerDetails?.Mail?.logo,
                emailTemplateSettings: offerDetails?.Mail,
              },
              contactAddress: {
                address: {
                  name: offerDetails?.Offer?.leadID?.customerDetail?.fullName,
                  city: offerDetails?.Offer?.leadID?.customerDetail?.address
                    ?.country,
                  postalCode:
                    offerDetails?.Offer?.leadID?.customerDetail?.address
                      ?.postalCode,
                  streetWithNumber:
                    offerDetails?.Offer?.leadID?.customerDetail?.address
                      ?.streetNumber,
                },
                email: offerDetails?.Offer?.leadID?.customerDetail?.email,
                phone: offerDetails?.Offer?.leadID?.customerDetail?.phoneNumber,
              },
              movingDetails: {
                address: offerDetails?.Offer?.addressID?.address,
                header: offerDetails?.Offer?.title,
                workDates: offerDetails?.Offer?.date,
              },
              serviceItem: offerDetails?.Offer?.serviceDetail?.serviceDetail,
              serviceItemFooter: {
                subTotal: offerDetails?.Offer?.subTotal?.toString(),
                tax: offerDetails?.Offer?.taxAmount?.toString(),
                discount: offerDetails?.Offer?.discountAmount?.toString(),
                grandTotal: offerDetails?.Offer?.total?.toString(),
              },
              footerDetails: {
                firstColumn: {
                  companyName:
                    offerDetails?.Offer?.createdBy?.company?.companyName,
                  email: offerDetails?.Offer?.createdBy?.email,
                  phoneNumber:
                    offerDetails?.Offer?.createdBy?.company?.phoneNumber,
                  taxNumber: offerDetails?.Offer?.createdBy?.company?.taxNumber,
                  website: offerDetails?.Offer?.createdBy?.company?.website,
                },
                secondColumn: {
                  address: {
                    postalCode:
                      offerDetails?.Offer?.createdBy?.company.address
                        .postalCode,
                    streetNumber:
                      offerDetails?.Offer?.createdBy?.company.address
                        .streetNumber,
                  },
                  bankDetails: {
                    accountNumber:
                      offerDetails?.Offer?.createdBy?.company.bankDetails
                        .accountNumber,
                    bankName:
                      offerDetails?.Offer?.createdBy?.company.bankDetails
                        .bankName,
                    ibanNumber:
                      offerDetails?.Offer?.createdBy?.company.bankDetails
                        .ibanNumber,
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
              aggrementDetails:
                offerDetails?.Offer?.content?.offerContent?.description || "",
              isOffer: true,
            };
            const distributeItems = (): ServiceList[][] => {
              const totalItems =
                offerDetails?.Offer?.serviceDetail?.serviceDetail?.length;
              let pages: ServiceList[][] = [];

              if (totalItems > maxItemsFirstPage) {
                pages.push(
                  offerDetails?.Offer?.serviceDetail?.serviceDetail?.slice(
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
                    offerDetails?.Offer?.serviceDetail?.serviceDetail?.slice(
                      i,
                      i + maxItemsPerPage
                    )
                  );
                }
              } else {
                pages.push(offerDetails?.Offer?.serviceDetail?.serviceDetail);
              }

              return pages;
            };

            setNewPageData(distributeItems());
            setOfferData(formatData);
            if (offerDetails?.Template) {
              const {
                firstColumn,
                fourthColumn,
                isFirstColumn,
                isFourthColumn,
                isSecondColumn,
                isThirdColumn,
                secondColumn,
                thirdColumn,
              }: TemplateType = offerDetails?.Template;

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
            if (offerDetails?.Mail) {
              setEmailTemplateSettings({
                email: offerDetails?.Mail?.email,
                FooterColour: offerDetails?.Mail?.FooterColour,
                logo: offerDetails?.Mail?.logo,
                mobileNumber: offerDetails?.Mail?.mobileNumber,
                phoneNumber: offerDetails?.Mail?.phoneNumber,
                textColour: offerDetails?.Mail?.textColour,
              });
            }
            if (offerDetails?.setting) {
              setSystemSettings({ ...offerDetails?.setting });
            }
          }
        }
      );
    }
  }, [offerID]);

  const totalItems = offerData?.serviceItem?.length || 0;

  const calculateTotalPages = useMemo(() => {
    const itemsOnFirstPage = Math.min(totalItems, maxItemsFirstPage);
    const remainingItems = totalItems - itemsOnFirstPage;
    const additionalPages = Math.ceil(remainingItems / maxItemsPerPage);

    // Add 1 for the first page and 1 for the last page
    return 1 + 1 + additionalPages;
  }, [totalItems, maxItemsFirstPage, maxItemsPerPage]);

  const handleEmailSend = async () => {
    try {
      const data = await localStoreUtil.get_data("contractComposeEmail");

      if (data) {
        let apiData = { ...data };
        // delete apiData["id"]
        delete apiData["content"];

        const res = await dispatch(sendOfferEmail({ data: apiData }));
        if (res?.payload) {
          dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
        }
        await localStoreUtil.remove_data("contractComposeEmail");
      }
    } catch (error) {
      console.error("Error in handleEmailSend:", error);
    }
  };

  const handleDonwload = () => {};
  const handlePrint = () => {};

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  return loading ? (
    <LoadingState />
  ) : (
    offerData && (
      <YogaPdfContainer>
        <div className="my-5">
          <SignPdf<EmailHeaderProps>
            pdfData={offerData}
            newPageData={newPageData}
            templateSettings={templateSettings}
            totalPages={calculateTotalPages}
            action={action as string}
            emailTemplateSettings={emailTemplateSettings}
            systemSettings={systemSetting}
          />
        </div>
      </YogaPdfContainer>
    )
  );
};

export default SignPdfPreview;
