import Image from "next/image";
import React from "react";
import { DocumentHeaderDetailsProps } from "@/types/types";
import { formatDateTimeToDate } from "@/utils/utility";
import { useTranslation } from "next-i18next";

export const DocumentHeader = ({
  createdBy,
  offerDate,
  offerNo,
  logo,
  emailTemplateSettings,
  isReverseLogo,
}: Partial<DocumentHeaderDetailsProps>) => {
  const { t: translate } = useTranslation();

  return (
    <div
      className={`my-2 grid grid-cols-4 items-center h-[173px] px-[74px] py-[27px] w-full`}
    >
      {isReverseLogo ? (
        <>
          <div className="flex flex-col gap-[0px] col-span-1">
            <div className="flex gap-[5px]">
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {translate("pdf.offer_number")}:
              </span>
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {offerNo}
              </span>
            </div>
            <div className="flex gap-[5px]">
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {translate("pdf.offer_date")}:
              </span>
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {formatDateTimeToDate(offerDate || "")}
              </span>
            </div>
            <div className="flex gap-[5px]">
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {translate("pdf.created_by")}:
              </span>
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {createdBy}
              </span>
            </div>
          </div>
          <div className="col-span-3 flex justify-end">
            {emailTemplateSettings && (
              <Image
                src={emailTemplateSettings?.logo}
                alt="umzugsLogo"
                height={75}
                width={185}
                style={{ height: "75px", width: "185px" }}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <div className="col-span-3">
            {emailTemplateSettings && (
              <Image
                src={emailTemplateSettings?.logo}
                alt="umzugsLogo"
                height={75}
                width={185}
                style={{ height: "75px", width: "185px" }}
              />
            )}
          </div>
          <div className="flex flex-col gap-[0px] col-span-1">
            <div className="flex gap-[5px]">
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {translate("pdf.offer_number")}:
              </span>
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {offerNo}
              </span>
            </div>
            <div className="flex gap-[5px]">
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {translate("pdf.offer_date")}:
              </span>
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {formatDateTimeToDate(offerDate || "")}
              </span>
            </div>
            <div className="flex gap-[5px]">
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {translate("pdf.created_by")}:
              </span>
              <span
                className={`text-[#${emailTemplateSettings?.textColour}] text-sm font-medium`}
              >
                {createdBy}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
