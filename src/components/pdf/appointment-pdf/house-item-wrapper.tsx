import React from "react";
import { HouseDetailObjectProps } from "@/components/reportPdf/generate-report-pdf";
import { HouseItem } from "./house-item";
import { HouseItemHeader } from "./house-item-header";

interface HouseItemWrapperProps {
  items: HouseDetailObjectProps[];
  mainHeading: string;
  description?: string;
  language?: string;
  className?: string;
}

export const HouseItemWrapper: React.FC<HouseItemWrapperProps> = ({
  items,
  mainHeading,
  description,
  language,
  className,
}) => {
  const langContent = {
    en: {
      remarks: "Remarks",
    },
    de: {
      remarks: "Bemerkung",
    },
  };

  return (
    <div className="pb-6 px-5 bg-white">
      <h1 className="text-sm font-semibold text-purple-700 mb-2">
        {mainHeading}
      </h1>

      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-xs font-medium text-gray-900">
          {langContent[language as keyof typeof langContent]?.remarks}
        </h2>
        <p className="text-xs font-normal text-gray-600">{description}</p>
      </div>

      <HouseItemHeader language={language} count={items.length} />

      <div className={`flex flex-wrap gap-y-4 pb-6 ${className}`}>
        {items.map((item, index) => (
          <div key={index} className="w-1/3 pr-6">
            <HouseItem
              icon={item.icon}
              name={item.name}
              quantity={item?.quantity || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
