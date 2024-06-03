import React, { useEffect, useRef, useState } from "react";
import PdfFooter from "../PdfFooter";
import { PdfPreviewProps, ServiceItemProps } from "@/types/global";
import { DocumentHeaderDetail } from "../document-header-detail";
import { ContactDetails } from "./contact-details";
import { ServiceTerms } from "./service-terms";
import { SignatureSubmittedSuccessFully } from "./signature-submitted-success";
import { SignaturePad } from "./signature-pad";

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
export const PdfPreviewSignatureDocument = () => {
  return (
    <div>
      <DocumentHeaderDetail {...DUMMY_DATA.headerDetails} />
      <div className="px-[80px] flex flex-col bg-white pb-[50px]">
        <ContactDetails {...DUMMY_DATA.contactAddress} />
        <ServiceTerms />
        <div className="grid grid-cols-2 gap-x-[103px] mt-4">
          <div>
            <div className="h-[223.656px] flex flex-col justify-between">
              <div className=" pt-5">
                <span className="text-[#000] text-base font-medium">
                  Gültigkeit der Offerte:
                </span>

                <p className="text-[#000] text-[14px] font-normal">
                  3 Monate ab Erstellung der Offerte
                </p>
              </div>
              <p className="text-[18px] text-black font-medium pb-[43px]">
                I share the contract with you.
              </p>
            </div>
            <div className="flex flex-col mt-[23px]">
              <span className="font-medium text-base mb-2">
                25 December 2023
              </span>
              <hr className="mb-[17px]" />
              <span className="text-base text-black font-normal">Date</span>
            </div>
          </div>
          <div>
            <SignaturePad />
            <div className="flex flex-col gap-y-[18px]">
              <hr />
              <span className="text-base text-black font-normal">
                Signature
              </span>
            </div>
          </div>
        </div>
      </div>
      <PdfFooter {...DUMMY_DATA.footerDetails} />
    </div>
  );
};
