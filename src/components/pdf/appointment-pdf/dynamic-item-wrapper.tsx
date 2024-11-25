import React from "react";
import { HouseItem } from "./house-item";
import { HouseItemHeader } from "./house-item-header";
import { RoomObject } from "@/types";
import { getDynamicRoom } from "@/utils/utility";

interface RoomItem {
  generalRoom: RoomObject;
  language?: string;
  className?: string;
}

export const DynamicItemWrapper: React.FC<RoomItem> = ({
  generalRoom,
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
    <div className="pb-6 px-5">
      <h1 className="text-sm font-semibold text-purple-700 mb-2">
        {generalRoom?.mainHeading}
      </h1>
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-xs font-medium text-gray-900">
          {langContent[language as keyof typeof langContent]?.remarks}
        </h2>
        <p className="text-xs font-normal text-gray-600">
          {generalRoom?.descriptions}
        </p>
      </div>
      <HouseItemHeader
        language={language}
        count={getDynamicRoom(language || "en", generalRoom)?.length}
      />
      <div className={`flex flex-wrap gap-y-4 pb-6 ${className}`}>
        {getDynamicRoom(language || "en", generalRoom)?.map((item, index) => (
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
