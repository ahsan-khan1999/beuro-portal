import Image from "next/image";
import React from "react";
import umzugsLogo from "@/assets/svgs/Umzug-fuchs-logo.svg";
import { DocumentHeaderDetailsProps } from "@/types/types";
import { formatDateTimeToDate } from "@/utils/utility";
import { useTranslation } from "next-i18next";

export const DocumentHeader = ({
  createdBy,
  offerDate,
  offerNo,
  logo,
  emailTemplateSettings,
}: Partial<DocumentHeaderDetailsProps>) => {
  const { t: translation } = useTranslation();
  const textColor = "#" + emailTemplateSettings?.textColour;

  return (
    <div
      className={`grid grid-cols-4 items-center h-[173px] px-[74px] py-[27px] w-full bg-[#${emailTemplateSettings?.FooterColour}]`}
    >
      <div className="col-span-3">
        {emailTemplateSettings && (
          <Image
            src={emailTemplateSettings?.logo}
            alt="umzugsLogo"
            height={75}
            width={185}
          />
        )}
      </div>

      <div className="flex flex-col gap-[6px] col-span-1">
        <div className="flex gap-[30px]">
          <span
            className={`text-[#${emailTemplateSettings?.textColour}] text-base font-medium`}
            style={{ color: textColor }}
          >
            {translation("pdf.offer_number")}:
          </span>
          <span
            className={`text-[#${emailTemplateSettings?.textColour}] text-base font-medium`}
          >
            {offerNo}
          </span>
        </div>
        <div className="flex gap-[15px] ">
          <span
            className={`text-[#${emailTemplateSettings?.textColour}] text-base font-medium`}
          >
            {translation("pdf.offer_date")}:
          </span>
          <span
            className={`text-[#${emailTemplateSettings?.textColour}] text-base font-medium`}
          >
            {formatDateTimeToDate(offerDate || "")}
          </span>
        </div>
        <div className="flex gap-[12px] ">
          <span
            className={`text-[#${emailTemplateSettings?.textColour}] text-base font-medium`}
          >
            {translation("pdf.created_by")}:
          </span>
          <span
            className={`text-[#${emailTemplateSettings?.textColour}] text-base font-medium`}
          >
            {createdBy}
          </span>
        </div>
      </div>
    </div>
  );
};
