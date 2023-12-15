import React, { useEffect, useState } from "react";
import { PreviewCard } from "./preview-card";
import { ProductPurchasedItemsDetails } from "./preview/productDetails/purchased-items-details";
import { Aggrement } from "./preview/aggrement/aggrement";
import {
  PdfProps,
  AcknowledgementSlipProps,
  PayableToProps,
  ProductItemProps,
} from "@/types/types";
import { PaymentQRCodeDetails } from "./preview/qrCode/payment-qr-code-details";
import { YogaPdfContainer } from "./yoga-pdf-container";
import { ProductItemNewPage } from "./preview/productDetails/product-item-next-page";

export const productItems: ProductItemProps[] = [
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
  },
  {
    title: "3 Mitarbeiter ohne Farzeung",
    description:
      "Arbeit nach Aufwand. Mindestbetrag 4 Stunden. Nur die grossen.",
    price: "150",
    count: "05.00",
    total: "750",
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
    address1: "Erlenweg 8, 3294 Buren an der Aare",
    address1Details:
      "6.5 Zimmerwohanhnung, Ug/EG/OG, grosser und voller Keller, vollmolbilert, Kartons einpacken, Mobel demontieren",
    address2: "Rebenstrasse, 4112 Battwil",
    address2Details: "6Mobel montieren, Kartons auspacken",
    workDates: "30-11-2023 to 07-11-2023",
  },
  serviceItem: productItems,
  serviceItemFooter: {
    subTotal: "2000CHF",
    tax: "100CHF (7.7%)",
    discount: "100.50 CHF",
    grandTotal: "2100.50 CHF",
  },
  footerDetails: {
    companyName: "Umzugsfuchs",
    companyDomain: "umzugsfuchs.ch",
    infoMail: "info@umzugsfuchs.ch",
    firstNumber: "0782141114",
    secondNumber: "0800400410",
    postFinance: "PostFinance",
    streeAdress: "St. Urbanstrasse 79,",
    streetNumber: "4914, Roggwil",
    lastNumber: "15-561356-9",
  },
  qrCode: {
    acknowledgementSlip: qrCodeAcknowledgementData,
    payableTo: qrCodePayableToData,
  },
};

export const Pdf = () => {
  const [newPageData, setNewPageData] = useState<ProductItemProps[][]>([]);
  const maxItemsFirstPage = 6;
  const maxItemsPerPage = 10;
  useEffect(() => {
    const distributeItems = (): ProductItemProps[][] => {
      const totalItems = DUMMY_DATA.serviceItem.length;
      let pages: ProductItemProps[][] = [];

      if (totalItems > maxItemsFirstPage) {
        pages.push(DUMMY_DATA.serviceItem.slice(0, maxItemsFirstPage));
        for (let i = maxItemsFirstPage; i < totalItems; i += maxItemsPerPage) {
          pages.push(DUMMY_DATA.serviceItem.slice(i, i + maxItemsPerPage));
        }
      } else {
        pages.push(DUMMY_DATA.serviceItem);
      }

      return pages;
    };

    setNewPageData(distributeItems());
  }, []);

  return (
    <YogaPdfContainer>
      <PreviewCard />
      <div className="flex flex-col gap-y-[30px]">
        {newPageData.length > 0 && (
          <ProductPurchasedItemsDetails
            {...DUMMY_DATA}
            serviceItem={newPageData[0]}
            isShowTotal={newPageData.length === 1}
          />
        )}
        {newPageData.slice(1).map((pageItems, index) => (
          <ProductItemNewPage
            key={index}
            serviceItem={pageItems}
            footerDetails={DUMMY_DATA.footerDetails}
            headerDetails={DUMMY_DATA.headerDetails}
            serviceItemFooter={DUMMY_DATA.serviceItemFooter}
            isShowTotal={index === newPageData.length - 2}
          />
        ))}
        <Aggrement
          contactAddress={DUMMY_DATA.contactAddress}
          headerDetails={DUMMY_DATA.headerDetails}
          footerDetails={DUMMY_DATA.footerDetails}
        />
        <PaymentQRCodeDetails
          contactAddress={DUMMY_DATA.contactAddress}
          headerDetails={DUMMY_DATA.headerDetails}
          qrCode={DUMMY_DATA.qrCode}
        />
      </div>

      <button className="mt-[55px] w-full bg-[#45C769] rounded-[4px] shadow-md py-[10px] text-center text-white">
        Accepted
      </button>
    </YogaPdfContainer>
  );
};
