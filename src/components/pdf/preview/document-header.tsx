import Image from "next/image";
import React from "react";
import umzugsLogo from "@/assets/svgs/Umzug-fuchs-logo.svg";
import { DocumentHeaderDetailsProps } from "@/types/types";
import { formatDateTimeToDate } from "@/utils/utility";

export const DocumentHeader = ({
  createdBy,
  offerDate,
  offerNo,
  logo
}: DocumentHeaderDetailsProps) => {
  return (
    <div className="flex justify-between items-center h-[173px] px-[74px] py-[27px] w-full bg-[#EEEEEE]">
      <Image src={logo} alt="umzugsLogo" height={75} width={185} />

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
          <span className="text-[#000] text-base font-medium">{formatDateTimeToDate(offerDate)}</span>
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
