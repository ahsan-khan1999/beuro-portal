import { DocumentDetailFooterProps } from "@/types/types";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";

export const Footer = ({
  firstColumn,
  fourthColumn,
  secondColumn,
  thirdColumn,
  columnSettings,
  totalPages,
  currPage,
  emailTemplateSettings
}: DocumentDetailFooterProps) => {
  const {
    firstColumn: firstColumnSettings,
    secondColumn: secondColumnSettings,
    thirdColumn: thirdColumnSettings,
    fourthColumn: fourthColumnSettings,
    isFirstColumn,
    isSecondColumn,
    isThirdColumn,
    isFourthColumn,
  } = columnSettings || {};

  const {
    showFirstColumnBorder,
    showSecondColumnBorder,
    showThirdColumnBorder,
  } = useMemo(() => {
    const showFirstColumnBorder =
      isFirstColumn && (isSecondColumn || isThirdColumn || isFourthColumn);
    const showSecondColumnBorder =
      isSecondColumn && (isThirdColumn || isFourthColumn);
    const showThirdColumnBorder = isThirdColumn && isFourthColumn;
    return {
      showFirstColumnBorder,
      showSecondColumnBorder,
      showThirdColumnBorder,
    };
  }, [isFirstColumn, isSecondColumn, isThirdColumn, isFourthColumn]);

  const { t: translation } = useTranslation();

  return (
    <div className={`relative flex items-center justify-between h-[149px] px-4  w-full bg-[${"#" + emailTemplateSettings?.FooterColour}]`}>
      <div className="flex justify-center gap-[60px] w-full">
        {isFirstColumn && (
          <div
            className={`flex flex-col justify-center ${showFirstColumnBorder
              ? "pr-[60px] border-r-2 border-[#D9D9D9]"
              : ""
              }`}
          >
            {firstColumnSettings?.isCompanyName && (
              <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{firstColumn?.companyName}</span>
            )}
            {firstColumnSettings?.isWebsite && (
              <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{firstColumn?.website}</span>
            )}
            {firstColumnSettings?.isEmail && <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{firstColumn?.email}</span>}
            {firstColumnSettings?.isPhoneNumber && (
              <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{firstColumn?.phoneNumber}</span>
            )}
            {firstColumnSettings?.isTaxNumber && (
              <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{firstColumn?.taxNumber}</span>
            )}
          </div>
        )}

        {/* 2nd column */}
        {isSecondColumn && (
          <div
            className={`flex flex-col ${showSecondColumnBorder
              ? "pr-[60px] border-r-2 border-[#D9D9D9]"
              : ""
              }`}
          >
            {secondColumnSettings?.isStreetNumber && (
              <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{secondColumn?.address?.streetNumber}</span>
            )}
            {secondColumnSettings?.isPostCode && (
              <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{secondColumn?.address?.postalCode}</span>
            )}
            {secondColumnSettings?.isBankName && (
              <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{secondColumn?.bankDetails?.bankName}</span>
            )}
            {secondColumnSettings?.isAccountNumber && (
              <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{secondColumn?.bankDetails?.accountNumber}</span>
            )}
            {secondColumnSettings?.isIBAN && (
              <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{secondColumn?.bankDetails?.ibanNumber}</span>
            )}
          </div>
        )}

        {/* 3rd column */}
        {isThirdColumn && (
          <div
            className={`flex flex-col justify-center ${showThirdColumnBorder
              ? "pr-[60px] border-r-2 border-[#D9D9D9]"
              : ""
              }`}
          >
            {thirdColumnSettings?.isRow1 && <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{thirdColumn.row1}</span>}
            {thirdColumnSettings?.isRow2 && <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{thirdColumn.row2}</span>}
            {thirdColumnSettings?.isRow3 && <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{thirdColumn.row3}</span>}
            {thirdColumnSettings?.isRow4 && <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{thirdColumn.row4}</span>}
            {thirdColumnSettings?.isRow5 && <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{thirdColumn.row5}</span>}
          </div>
        )}

        {/* fourth column */}
        {isFourthColumn && (
          <div className="flex flex-col">
            {fourthColumnSettings?.isRow1 && <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{fourthColumn.row1}</span>}
            {fourthColumnSettings?.isRow2 && <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{fourthColumn.row2}</span>}
            {fourthColumnSettings?.isRow3 && <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{fourthColumn.row3}</span>}
            {fourthColumnSettings?.isRow4 && <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{fourthColumn.row4}</span>}
            {fourthColumnSettings?.isRow5 && <span className={`text-[${'#' + emailTemplateSettings?.textColour}]`}>{fourthColumn.row5}</span>}
          </div>
        )}
      </div>

      <div className="s self-end">
        <span className="text-[#1E1E1E] text-[14px] font-medium mr-[10px]">
          {translation("pdf.page")}
        </span>
        <span className="text-[#1E1E1E] text-[14px] font-medium">
          {currPage}/{totalPages}
        </span>
      </div>
    </div>
  );
};
