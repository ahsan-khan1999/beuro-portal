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
  PayableToProps,
  PdfProps,
  TemplateType,
} from "@/types";
import { Layout } from "@/layout";

import { getTemplateSettings } from "@/api/slices/settingSlice/settings";
import localStoreUtil from "@/utils/localstore.util";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { readContractDetails, sendContractEmail, updateContractContent } from "@/api/slices/contract/contractSlice";
import { contractTableTypes } from "@/types/contract";

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


const PdfPriview = () => {

  const [newPageData, setNewPageData] = useState<ServiceList[][]>([]);
  const [offerData, setOfferData] = useState<PdfProps<ContractEmailHeaderProps>>(DUMMY_DATA);
  const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
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
    if (offerID) {
      dispatch(readContractDetails({ params: { filter: offerID } })).then(
        (response: ActionType) => {
          if (response?.payload) {
            const contractDetails: contractTableTypes = response?.payload;
            let formatData: PdfProps<ContractEmailHeaderProps> = {
              id: contractDetails?.id,
              emailHeader: {
                offerNo: contractDetails?.contractNumber,
                emailStatus: contractDetails?.contractStatus,
                contractTitle: contractDetails?.title,
                worker: contractDetails?.offerID?.createdBy?.fullName

              },
              headerDetails: {
                offerNo: contractDetails?.offerID?.offerNumber,
                offerDate: contractDetails?.offerID?.createdAt,
                createdBy: contractDetails?.offerID?.createdBy?.fullName,
              },
              contactAddress: {
                address: {
                  name: contractDetails?.offerID?.leadID?.customerDetail?.fullName,
                  city: contractDetails?.offerID?.leadID?.customerDetail?.address?.country,
                  postalCode:
                    contractDetails?.offerID?.leadID?.customerDetail?.address?.postalCode,
                  streetWithNumber:
                    contractDetails?.offerID?.leadID?.customerDetail?.address?.streetNumber,
                },
                email: contractDetails?.offerID?.leadID?.customerDetail?.email,
                phone: contractDetails?.offerID?.leadID?.customerDetail?.phoneNumber,
              },
              movingDetails: {
                address: contractDetails?.offerID?.addressID?.address,
                header: contractDetails?.offerID?.title,
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
                fourthColumn: {
                  row1: "row 1",
                  row2: "row 2",
                  row3: "row 3",
                  row4: "row 4",
                  row5: "row 5",
                },
                columnSettings: null,
                currPage: 1,
                totalPages: calculateTotalPages,
              },
              qrCode: {
                acknowledgementSlip: qrCodeAcknowledgementData,
                payableTo: qrCodePayableToData,
              },
              aggrementDetails:
                contractDetails?.additionalDetails || "",
              isOffer: false,
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
                pages.push(contractDetails?.offerID?.serviceDetail?.serviceDetail);
              }

              return pages;
            };

            setNewPageData(distributeItems());
            setOfferData(formatData);
          }
        }
      );
    }
  }, [offerID]);

  useEffect(() => {
    (async () => {
      try {
        const response: CompanySettingsActionType = await dispatch(
          getTemplateSettings()
        );
        if (response?.payload?.Template) {
          const {
            firstColumn,
            fourthColumn,
            isFirstColumn,
            isFourthColumn,
            isSecondColumn,
            isThirdColumn,
            secondColumn,
            thirdColumn,
          }: TemplateType = response.payload.Template;

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
      } catch (error) {
        console.error("Error fetching template settings:", error);
      }
    })();
  }, []);
  const totalItems = offerData?.serviceItem?.length;

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

        const res = await dispatch(sendContractEmail({ data: apiData }));
        if (res?.payload) {
          dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
        }
        await localStoreUtil.remove_data("contractComposeEmail");
      }
    } catch (error) {
      console.error("Error in handleEmailSend:", error);
    }
  };

  const handleDonwload = () => {
    console.log("download");
  };
  const handlePrint = () => {
    console.log("print");
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  const onSuccess = () => {
    router.push("/offers");
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
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;

  };
  const handleTitleUpdate = async (value: string) => {
    const apiData = {
      id: offerID,
      title: value,
      additionalDetails: offerData?.aggrementDetails
    }
    const response = await dispatch(updateContractContent({ data: apiData }))
    if (response?.payload) return true
    else return false
  }
  const handleDescriptionUpdate = async (value: string) => {
    const apiData = {
      id: offerID,
      title: offerData?.emailHeader?.contractTitle,
      additionalDetails: value
    }
    console.log(offerData, "data");

    const response = await dispatch(updateContractContent({ data: apiData }))
    if (response?.payload) return true
    else return false
  }
  return (
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
      />
      <div className="my-5">
        <Pdf<EmailHeaderProps>
          pdfData={offerData}
          newPageData={newPageData}
          templateSettings={templateSettings}
          totalPages={calculateTotalPages}
        />
      </div>
      {renderModal()}
    </>
  );
};

export default PdfPriview;
