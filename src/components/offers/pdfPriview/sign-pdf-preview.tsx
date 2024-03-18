import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { readOfferPublicDetails } from "@/api/slices/offer/offerSlice";
import { useRouter } from "next/router";
import { PublicOffersTableRowTypes, ServiceList } from "@/types/offers";
import { EmailHeaderProps, PdfProps, TemplateType } from "@/types";
import { SystemSetting } from "@/api/slices/settingSlice/settings";
import { SignPdf } from "@/components/pdf/sign-pdf";
import { EmailTemplate } from "@/types/settings";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import { Container } from "@/components/pdf/container";

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
            // calculate discount percentage
            const discountPercentage =
              (offerDetails?.Offer?.discountAmount /
                offerDetails?.Offer?.subTotal) *
              100;

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
                companyName:
                  offerDetails?.Offer?.createdBy?.company?.companyName,
                // isReverseLogo: offerDetails?.Template?.order,
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
                  companyName:
                    offerDetails?.Offer?.leadID?.customerDetail?.companyName,
                },
                email: offerDetails?.Offer?.leadID?.customerDetail?.email,
                phone: offerDetails?.Offer?.leadID?.customerDetail?.phoneNumber,
                gender:
                  offerDetails?.Offer?.leadID?.customerDetail?.gender?.toString(),
                mobile:
                  offerDetails?.Offer?.leadID?.customerDetail?.mobileNumber,
                // isReverseInfo: offerDetails?.Template?.order,
              },
              movingDetails: {
                address: offerDetails?.Offer?.addressID?.address,
                header: offerDetails?.Offer?.title,
                workDates: offerDetails?.Offer?.date,
                time: offerDetails?.Offer?.time,
              },
              serviceItem: offerDetails?.Offer?.serviceDetail?.serviceDetail,
              serviceItemFooter: {
                subTotal: offerDetails?.Offer?.subTotal?.toString(),
                tax: offerDetails?.Offer?.taxAmount?.toString(),
                discount: offerDetails?.Offer?.discountAmount?.toString(),
                discountPercentage: discountPercentage?.toString(),
                grandTotal: offerDetails?.Offer?.total?.toString(),
                discountType: offerDetails?.Offer?.discountType,
                taxType: offerDetails?.Offer?.taxType,
                serviceDiscountSum:
                  offerDetails?.Offer?.serviceDetail?.serviceDetail?.reduce(
                    (acc, service) => {
                      const price = service?.discount || 0;
                      return acc + price;
                    },
                    0
                  ),
                isTax: offerDetails?.Offer?.isTax,
                isDiscount: offerDetails?.Offer?.isDiscount,
                discountDescription: offerDetails?.Offer?.discountDescription,
              },

              footerDetails: {
                firstColumn: {
                  companyName: offerDetails?.Template?.firstColumn?.companyName,
                  email: offerDetails?.Template?.firstColumn?.email,
                  phoneNumber: offerDetails?.Template?.firstColumn?.phoneNumber,
                  taxNumber: Number(
                    offerDetails?.Template?.firstColumn?.taxNumber
                  ) as number,
                  website: offerDetails?.Template?.firstColumn?.website,
                },
                secondColumn: {
                  address: {
                    postalCode: offerDetails?.Template?.secondColumn?.postCode,
                    streetNumber:
                      offerDetails?.Template?.secondColumn?.streetNumber,
                  },
                  bankDetails: {
                    accountNumber:
                      offerDetails?.Template?.secondColumn?.accountNumber,
                    bankName: offerDetails?.Template?.secondColumn?.bankName,
                    ibanNumber: offerDetails?.Template?.secondColumn?.iban,
                  },
                },
                thirdColumn: {
                  row1: offerDetails?.Template?.thirdColumn?.row1,
                  row2: offerDetails?.Template?.thirdColumn?.row2,
                  row3: offerDetails?.Template?.thirdColumn?.row3,
                  row4: offerDetails?.Template?.thirdColumn?.row4,
                  row5: offerDetails?.Template?.thirdColumn?.row5,
                },
                fourthColumn: {
                  row1: offerDetails?.Template?.fourthColumn?.row1,
                  row2: offerDetails?.Template?.fourthColumn?.row2,
                  row3: offerDetails?.Template?.fourthColumn?.row3,
                  row4: offerDetails?.Template?.fourthColumn?.row4,
                  row5: offerDetails?.Template?.fourthColumn?.row5,
                },
                columnSettings: null,
                currPage: 1,
                totalPages: calculateTotalPages,
              },
              aggrementDetails: offerDetails?.Offer?.additionalDetails || "",
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
                order,
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
                order,
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

  return loading ? (
    <LoadingState />
  ) : (
    offerData && (
      <Container>
        <SignPdf<EmailHeaderProps>
          pdfData={offerData}
          newPageData={newPageData}
          templateSettings={templateSettings}
          totalPages={calculateTotalPages}
          action={action as string}
          emailTemplateSettings={emailTemplateSettings}
          systemSettings={systemSetting}
          setOfferData={setOfferData}
        />
      </Container>
    )
  );
};

export default SignPdfPreview;
