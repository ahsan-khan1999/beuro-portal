import Image from "next/image";
import React from "react";
import umzugsLogo from "@/assets/svgs/Umzug-fuchs-logo.svg";
import { DocumentHeaderDetailsProps } from "@/types/global";

export const DocumentHeaderDetail = ({
  createdBy,
  offerDate,
  offerNo,
}: DocumentHeaderDetailsProps) => {
  return (
    <div className="flex justify-between items-center h-[173px] px-[74px] py-[27px] w-full bg-[#EEEEEE]">
      <Image src={umzugsLogo} alt="umzugsLogo" />

      <div className="flex flex-col gap-[6px]">
        <div className="flex gap-[30px]">
          <span className="text-[#404040] text-base font-medium">
            Offer No:
          </span>
          <span className="text-[#000] text-base font-medium">
            {offerNo}
          </span>
        </div>
        <div className="flex gap-[15px] ">
          <span className="text-[#404040] text-base font-medium">
            Offer Date:
          </span>
          <span className="text-[#000] text-base font-medium">{offerDate}</span>
        </div>
        <div className="flex gap-[12px] ">
          <span className="text-[#404040] text-base font-medium">
            Created By:
          </span>
          <span className="text-[#000] text-base font-medium">
            {createdBy}
          </span>
        </div>
      </div>
    </div>
  );
};
