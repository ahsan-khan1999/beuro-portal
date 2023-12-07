import {
  PdfPreviewProps,
  ServiceItemFooterProps,
  ServiceItemProps,
} from "@/types/global";
import { DocumentHeaderDetail } from "../document-header-detail";
import PdfFooter from "../PdfFooter";
import { ContactDetails } from "./contact-details";
import { MovingDetails } from "./movng-details";
import { ServiceItem } from "./service-item";
import { ServiceItemHeader } from "./service-item-header";
import { ServiceItemFooter } from "./service-item-footer";

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

export const PdfPreviewDigitalSignature = () => {
  return (
    <div>
      <DocumentHeaderDetail {...DUMMY_DATA.headerDetails} />
      <div className="px-[80px] flex flex-col bg-white">
        <ContactDetails {...DUMMY_DATA.contactAddress} />
        <MovingDetails {...DUMMY_DATA.movingDetails} />
        <ServiceItemHeader />
        {DUMMY_DATA.serviceItem.map((item) => (
          <ServiceItem {...item} />
        ))}

        <ServiceItemFooter {...DUMMY_DATA.serviceItemFooter} />
      </div>
      <PdfFooter {...DUMMY_DATA.footerDetails}/>
    </div>
  );
};
