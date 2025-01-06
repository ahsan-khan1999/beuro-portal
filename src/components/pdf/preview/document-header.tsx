import Image from "next/image";
import React from "react";
import { DocumentHeaderDetailsProps } from "@/types/types";
import {
  convertUTCToLocalDate,
  formatDateTimeToDate,
  germanDateFormat,
} from "@/utils/utility";
import { useTranslation } from "next-i18next";

export const DocumentHeader = ({
  createdBy,
  offerDate,
  offerNo,
  logo,
  emailTemplateSettings,
  isReverseLogo,
  desireDate,
}: Partial<DocumentHeaderDetailsProps>) => {
  const { t: translate } = useTranslation();
  const headerBackgroundColor = emailTemplateSettings?.headerColour
    ? "#" + emailTemplateSettings?.headerColour
    : "#" + emailTemplateSettings?.FooterColour;
  const textColor = "#" + emailTemplateSettings?.textColour;

  return (
    <div
      className={`grid grid-cols-4 items-center h-[173px] px-[74px] py-[27px] w-full`}
      style={{ backgroundColor: headerBackgroundColor }}
    >
      {isReverseLogo ? (
        <>
          <div className="flex flex-col gap-[0px] col-span-1">
            <div className="flex gap-[5px]">
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {translate("pdf.offer_number")}:
              </span>
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {offerNo}
              </span>
            </div>
            <div className="flex gap-[5px]">
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {translate("pdf.offer_date")}:
              </span>
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {formatDateTimeToDate(offerDate || "")}
              </span>
            </div>
            <div className="flex gap-[5px]">
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {translate("pdf.created_by")}:
              </span>
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {createdBy}
              </span>
            </div>
            {desireDate && (
              <div className="flex gap-[5px]">
                <span
                  className={`text-[${textColor}] text-sm font-medium`}
                  style={{ color: textColor }}
                >
                  {translate("agent.report_contact_fields.desire_date")}:
                </span>
                <span
                  className={`text-[${textColor}] text-sm font-medium`}
                  style={{ color: textColor }}
                >
                  {convertUTCToLocalDate(desireDate)}
                </span>
              </div>
            )}
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
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {translate("pdf.report_number")}:
              </span>
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {offerNo}
              </span>
            </div>
            <div className="flex gap-[5px]">
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {translate("pdf.offer_date")}:
              </span>
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {germanDateFormat(offerDate || "")}
              </span>
            </div>
            <div className="flex gap-[5px]">
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {translate("pdf.created_by")}:
              </span>
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {createdBy}
              </span>
            </div>
            {/* {desireDate && (
              <div className="flex gap-[5px]">
                <span
                  className={`text-[${textColor}] text-sm font-medium`}
                  style={{ color: textColor }}
                >
                  {translate("agent.report_contact_fields.desire_date")}:
                </span>
                <span
                  className={`text-[${textColor}] text-sm font-medium`}
                  style={{ color: textColor }}
                >
                  {convertUTCToLocalDate(desireDate)}
                </span>
              </div>
            )} */}
          </div>
        </>
      )}
    </div>
  );
};
