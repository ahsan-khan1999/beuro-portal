import React, { useEffect, useState } from "react";
import EmailCard from "./PdfCard";
import Page1 from "./pages/Page1";
import EmailButtons from "./PdfButtons";
import Page2 from "./pages/Page2";
import { Pdf } from "@/components/pdf/pdf";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { readOfferDetails } from "@/api/slices/offer/offerSlice";
import { useRouter } from "next/router";
import { OffersTableRowTypes, ServiceList } from "@/types/offers";
import { AcknowledgementSlipProps, PayableToProps, PdfProps } from "@/types";

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
  },
  qrCode: {
    acknowledgementSlip: qrCodeAcknowledgementData,
    payableTo: qrCodePayableToData,
  },
  aggrementDetails: "",
};
interface ActionType {
  payload: OffersTableRowTypes;
  type: string;
}

const PdfPriview = () => {
  const [newPageData, setNewPageData] = useState<ServiceList[][]>([]);
  const [offerData, setOfferData] = useState<PdfProps>(DUMMY_DATA);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const maxItemsFirstPage = 6;
  const maxItemsPerPage = 10;

  const router = useRouter();
  const { offerID } = router.query;

  console.log(user);

  useEffect(() => {
    if (offerID)
      dispatch(readOfferDetails({ params: { filter: offerID } })).then(
        (response: ActionType) => {
          if (response?.payload) {
            console.log(response);
            const offerDetails: OffersTableRowTypes = response?.payload;
            let formatData: PdfProps = {
              emailHeader: {
                offerNo: offerDetails?.offerNumber,
                emailStatus: offerDetails?.emailStatus,
              },
              headerDetails: {
                offerNo: offerDetails?.offerNumber,
                offerDate: offerDetails?.createdAt,
                createdBy: offerDetails?.createdBy?.fullName,
              },
              contactAddress: {
                address: {
                  name: offerDetails?.leadID?.customerDetail?.fullName,
                  city: offerDetails?.leadID?.customerDetail?.address?.country,
                  postalCode:
                    offerDetails?.leadID?.customerDetail?.address?.postalCode,
                  streetWithNumber:
                    offerDetails?.leadID?.customerDetail?.address?.streetNumber,
                },
                email: offerDetails?.leadID?.customerDetail?.email,
                phone: offerDetails?.leadID?.customerDetail?.phoneNumber,
              },
              movingDetails: {
                address: offerDetails?.addressID?.address,
                header: offerDetails?.title,
                workDates: offerDetails?.date,
              },
              serviceItem: offerDetails?.serviceDetail?.serviceDetail,
              serviceItemFooter: {
                subTotal: offerDetails?.subTotal?.toString(),
                tax: offerDetails?.taxAmount?.toString(),
                discount: offerDetails?.discountAmount?.toString(),
                grandTotal: offerDetails?.total?.toString(),
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
                fourthColumn: {
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
              },
              qrCode: {
                acknowledgementSlip: qrCodeAcknowledgementData,
                payableTo: qrCodePayableToData,
              },
              aggrementDetails:
                offerDetails?.content?.offerContent?.description || "",
            };
            const distributeItems = (): ServiceList[][] => {
              const totalItems =
                offerDetails?.serviceDetail?.serviceDetail?.length;
              let pages: ServiceList[][] = [];

              if (totalItems > maxItemsFirstPage) {
                pages.push(
                  offerDetails?.serviceDetail?.serviceDetail?.slice(
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
                    offerDetails?.serviceDetail?.serviceDetail?.slice(
                      i,
                      i + maxItemsPerPage
                    )
                  );
                }
              } else {
                pages.push(offerDetails?.serviceDetail?.serviceDetail);
              }

              return pages;
            };

            setNewPageData(distributeItems());
            setOfferData(formatData);
          }
        }
      );
  }, [offerID]);

  return (
    <div className="">
      <EmailCard {...offerData.emailHeader} />
      <div className="my-5">
        <Pdf offerData={offerData} newPageData={newPageData} />
      </div>
    </div>
  );
};

export default PdfPriview;
