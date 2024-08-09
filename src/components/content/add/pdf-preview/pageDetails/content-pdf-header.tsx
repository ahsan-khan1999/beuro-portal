import Image from "next/image";
import React from "react";
import { DocumentHeaderDetailsProps } from "@/types/types";
import { useTranslation } from "next-i18next";

export const ContentPdfHeader = ({
  createdBy,
  offerDate,
  offerNo,
  logo,
  emailTemplateSettings,
  isReverseLogo,
}: Partial<DocumentHeaderDetailsProps>) => {
  const { t: translate } = useTranslation();
  const headerBgColor = "#" + emailTemplateSettings?.FooterColour;
  const textColor = "#" + emailTemplateSettings?.textColour;

  return (
    <div
      className={`my-2 grid grid-cols-4 items-center h-[173px] px-[74px] py-[27px] w-full`}
      style={{ backgroundColor: headerBgColor }}
    >
      {isReverseLogo ? (
        <>
          <div className="flex flex-col col-span-1">
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
                o-4040 umzugsguchs
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
                {/* {formatDateTimeToDate(offerDate || "")} */}
                26/06/2024
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
                {/* {createdBy} */}
                Rahal Ahmad
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
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {translate("pdf.offer_number")}:
              </span>
              <span
                className={`text-[${textColor}] text-sm font-medium`}
                style={{ color: textColor }}
              >
                {/* {offerNo} */}
                o-4040 umzugsguchs
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
                {/* {formatDateTimeToDate(offerDate || "")} */}
                26/06/2024
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
                {/* {createdBy} */}
                Rahal Ahmad
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
