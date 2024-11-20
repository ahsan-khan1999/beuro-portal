import { ReportPDFOfferDetailsProps } from "@/types";
import React from "react";

export const AppointmentDetails: React.FC<
  Partial<ReportPDFOfferDetailsProps>
> = ({ language, noteAndInformation, remarks }) => {
  const langContent = {
    en: {
      heading: "Detail Offer",
      employees: "Employees",
      deliveryVan: "Delivery van",
      hours: "Hours",
      cleaningWithDelivery: "Cleaning with delivery guarantee",
      broomClean: "Broom clean",
      price: "Price",
      remarks: "Remarks",
      noteAndInfo: "Note and instructions",
    },
    de: {
      heading: "Angebots details",
      employees: "Mitarbeiter",
      deliveryVan: "Lieferwagen",
      hours: "Stunden",
      cleaningWithDelivery: "Reinigung mit Abgabegarantie",
      broomClean: "Besenrein",
      price: "Preis",
      remarks: "Bemerkung",
      noteAndInfo: "Hinweis und Angaben",
    },
  };

  return (
    <div className="px-[80px] bg-white">
      <h1 className="text-sm font-medium text-purple-700">
        {langContent[language as keyof typeof langContent]?.heading}
      </h1>
      <div className="p-4 rounded mt-4 mb-4 bg-[#f5f5f5]">
        <div className="flex flex-col gap-1">
          <h2 className="text-xs font-medium text-black">
            {langContent[language as keyof typeof langContent]?.remarks}
          </h2>
          <p className="text-xs font-normal text-gray-600">{remarks}</p>
        </div>
      </div>

      {noteAndInformation && (
        <div className="p-4 bg-[gray-800] rounded mt-2 bg-[#f5f5f5]">
          <div className="flex flex-col gap-1">
            <h2 className="text-xs font-medium text-black">
              {langContent[language as keyof typeof langContent]?.noteAndInfo}
            </h2>
            <p className="text-xs font-normal text-gray-600">
              {noteAndInformation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
