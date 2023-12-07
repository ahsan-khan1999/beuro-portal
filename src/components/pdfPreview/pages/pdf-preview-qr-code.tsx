import React from "react";
import { DocumentHeaderDetail } from "../document-header-detail";
import { ContactDetails } from "./contact-details";
import { PdfPreviewProps, ServiceItemProps } from "@/types/global";
import { QrCodeDetails } from "./qr-code-details";
const serviceItems: ServiceItemProps[] = [
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

const DUMMY_DATA: PdfPreviewProps = {
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
  serviceItem: serviceItems,
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
};
export const PdfPreviewQrCode = () => {
  return (
    <div>
      <DocumentHeaderDetail {...DUMMY_DATA.headerDetails} />
      <div className="px-[80px] flex flex-col bg-white pb-[50px]">
        <ContactDetails {...DUMMY_DATA.contactAddress} />
        <hr className="h-[3px] bg-black" />
        <QrCodeDetails />
      </div>
    </div>
  );
};
