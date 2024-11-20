import React from "react";
import { HouseItem } from "./house-item";
import { HouseItemHeader } from "./house-item-header";
import { RoomObject } from "@/types";
import shelfIcon from "@/assets/pngs/shelf.png";
import sofaIcon from "@/assets/pngs/safe.png";
import boxIcon from "@/assets/pngs/box.png";
import armChairIcon from "@/assets/pngs/arm-chair.png";
import lSofaIcon from "@/assets/pngs/l-sofa.png";
import tvTableIcon from "@/assets/pngs/tv-table.png";
import teacherDeskIcon from "@/assets/pngs/teacher-desk.png";
import deskIcon from "@/assets/pngs/desk.png";
import tvIcon from "@/assets/pngs/tv.png";
import decoGrossIcon from "@/assets/pngs/deco-gross.png";

interface RoomItem {
  generalRoom?: RoomObject;
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

  const generalRoomItem = [
    {
      icon: sofaIcon,
      name: generalRoom?.label1 || "",
      quantity: generalRoom?.label1Value,
    },
    {
      icon: teacherDeskIcon,
      name: generalRoom?.label2 || "",
      quantity: generalRoom?.label2Value,
    },
    {
      icon: tvTableIcon,
      name: generalRoom?.label3 || "",
      quantity: generalRoom?.label3Value,
    },
    {
      icon: armChairIcon,
      name: generalRoom?.label4 || "",
      quantity: generalRoom?.label4Value,
    },
    {
      icon: deskIcon,
      name: generalRoom?.label5 || "",
      quantity: generalRoom?.label5Value,
    },
    {
      icon: shelfIcon,
      name: generalRoom?.label6 || "",
      quantity: generalRoom?.label6Value,
    },
    {
      icon: lSofaIcon,
      name: generalRoom?.label7 || "",
      quantity: generalRoom?.label7Value,
    },
    {
      icon: tvIcon,
      name: generalRoom?.label8 || "",
      quantity: generalRoom?.label8Value,
    },
    {
      icon: decoGrossIcon,
      name: generalRoom?.label9 || "",
      quantity: generalRoom?.label9Value,
    },
    {
      icon: boxIcon,
      name: generalRoom?.label10 || "",
      quantity: generalRoom?.label10Value,
    },
  ];

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
      <HouseItemHeader language={language} />
      <div
        className={`flex flex-wrap justify-between gap-y-4 pb-6 ${className}`}
      >
        {generalRoomItem.map((item, index) => (
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
