import React from "react";

interface HouseItemHeaderProps {
  language?: string;
}

export const HouseItemHeader: React.FC<HouseItemHeaderProps> = ({
  language,
}) => {
  const headerLabel = [0, 1, 2];

  const langContent = {
    en: {
      item: "Item",
    },
    de: {
      item: "Artikel",
    },
  };

  return (
    <div className="flex justify-between ">
      {headerLabel.map((index) => (
        <div key={index} className="w-1/3 pr-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-medium text-gray-900">
              {langContent[language as keyof typeof langContent]?.item}
            </span>
            <span className="text-xs font-medium text-gray-900">Qty</span>
          </div>
        </div>
      ))}
    </div>
  );
};
