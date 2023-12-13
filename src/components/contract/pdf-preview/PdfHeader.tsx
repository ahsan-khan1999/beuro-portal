import Image from "next/image";
import React from "react";
import umzugsLogo from "@/assets/svgs/Umzug-fuchs-logo.svg";
import { useTranslation } from "next-i18next";

const PdfHeader = () => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex justify-between items-center h-[173px] px-[74px] py-[27px] w-full bg-[#EEEEEE]">
      <Image src={umzugsLogo} alt="umzugsLogo" />

      <div className="flex flex-col gap-[6px]">
        <div className="flex gap-[30px]">
          <span className="text-[#404040] text-base font-medium">
            {translate("common.PDF_HEADER.offer_no")}:
          </span>
          <span className="text-[#000] text-base font-medium">
            O-4040 Umzugsfuchs
          </span>
        </div>
        <div className="flex gap-[15px] ">
          <span className="text-[#404040] text-base font-medium">
            {translate("common.PDF_HEADER.offer_date")}:
          </span>
          <span className="text-[#000] text-base font-medium">22.09.2023</span>
        </div>
        <div className="flex gap-[12px] ">
          <span className="text-[#404040] text-base font-medium">
            {translate("common.PDF_HEADER.created_by")}:
          </span>
          <span className="text-[#000] text-base font-medium">
            Heiniger Michèle
          </span>
        </div>
      </div>
    </div>
  );
};

export default PdfHeader;
