import {
  AcknowledgementSlipProps,
  ContractEmailHeaderProps,
  PayableToProps,
  PdfProps,
  TemplateType,
} from "@/types";
import { EmailTemplate } from "@/types/settings";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  getTemplateSettings,
  readEmailSettings,
} from "@/api/slices/settingSlice/settings";
import { readContractDetails } from "@/api/slices/contract/contractSlice";
import { contractTableTypes } from "@/types/contract";

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

export const usePdfDownload = (offerID: string) => {
  const [offerData, setOfferData] =
    useState<PdfProps<ContractEmailHeaderProps>>();
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
    null
  );
  const [emailTemplateSettings, setEmailTemplateSettings] =
    useState<EmailTemplate | null>(null);
  const {
    auth: { user },
    global: { modal },
    contract: { error, loading, contractDetails },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

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
              handleTitleUpdate: () => {},
              handleDescriptionUpdate: () => {},
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
              totalPages: 10,
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

          setOfferData(formatData);
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
  return { offerData };
};
