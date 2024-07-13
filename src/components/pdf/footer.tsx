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
  emailTemplateSettings,
}: Partial<DocumentDetailFooterProps>) => {
  const textColor = "#" + emailTemplateSettings?.textColour;
  const footerBackgroundColor = "#" + emailTemplateSettings?.FooterColour;

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
    <div
      className={`relative flex items-center justify-between h-[149px] px-4 w-full`}
      style={{ background: footerBackgroundColor }}
    >
      <div className="flex justify-center gap-[20px] w-full">
        {isFirstColumn && (
          <div
            className={`flex flex-col justify-center ${
              showFirstColumnBorder
                ? "pr-[20px] border-r-2 border-[#D9D9D9]"
                : ""
            }`}
          >
            {firstColumnSettings?.isCompanyName && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {firstColumnSettings?.companyName}
              </span>
            )}
            {firstColumnSettings?.isWebsite && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {firstColumnSettings?.website}
              </span>
            )}
            {firstColumnSettings?.isEmail && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {firstColumnSettings?.email}
              </span>
            )}
            {firstColumnSettings?.isPhoneNumber && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {firstColumnSettings?.phoneNumber}
              </span>
            )}
            {firstColumnSettings?.isTaxNumber && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {firstColumnSettings?.taxNumber}
              </span>
            )}
          </div>
        )}

        {/* 2nd column */}
        {isSecondColumn && (
          <div
            className={`flex flex-col ${
              showSecondColumnBorder
                ? "pr-[20px] border-r-2  border-[#D9D9D9]"
                : ""
            }`}
          >
            {secondColumnSettings?.isBankName && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {secondColumnSettings?.bankName}
              </span>
            )}
            {secondColumnSettings?.isStreetNumber && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {secondColumnSettings?.streetNumber}
              </span>
            )}
            {secondColumnSettings?.isPostCode && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {secondColumnSettings?.postCode}
              </span>
            )}

            {secondColumnSettings?.isIBAN && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {secondColumnSettings?.iban}
              </span>
            )}
            {secondColumnSettings?.isAccountNumber && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {secondColumnSettings?.accountNumber}
              </span>
            )}
          </div>
        )}

        {/* 3rd column */}
        {isThirdColumn && (
          <div
            className={`flex flex-col justify-center ${
              showThirdColumnBorder
                ? "pr-[20px] border-r-2 border-[#D9D9D9]"
                : ""
            }`}
          >
            {thirdColumnSettings?.isRow1 && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {thirdColumnSettings?.row1}
              </span>
            )}
            {thirdColumnSettings?.isRow2 && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {thirdColumnSettings?.row2}
              </span>
            )}
            {thirdColumnSettings?.isRow3 && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {thirdColumnSettings?.row3}
              </span>
            )}
            {thirdColumnSettings?.isRow4 && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {thirdColumnSettings?.row4}
              </span>
            )}
            {thirdColumnSettings?.isRow5 && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {thirdColumnSettings?.row5}
              </span>
            )}
          </div>
        )}

        {/* fourth column */}
        {isFourthColumn && (
          <div className="flex flex-col">
            {fourthColumnSettings?.isRow1 && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {fourthColumnSettings?.row1}
              </span>
            )}
            {fourthColumnSettings?.isRow2 && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {fourthColumnSettings?.row2}
              </span>
            )}
            {fourthColumnSettings?.isRow3 && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {fourthColumnSettings?.row3}
              </span>
            )}
            {fourthColumnSettings?.isRow4 && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {fourthColumnSettings?.row4}
              </span>
            )}
            {fourthColumnSettings?.isRow5 && (
              <span
                style={{ color: textColor }}
                className={`text-sm text-[${
                  "#" + emailTemplateSettings?.textColour
                }]`}
              >
                {fourthColumnSettings?.row5}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="self-end w-[80px] pb-2">
        <span
          className={`text-sm text-[${
            "#" + emailTemplateSettings?.textColour
          }] text-sm font-medium mr-[10px]`}
          style={{ color: textColor }}
        >
          {translation("pdf.page")}
        </span>
        <span
          className={`text-sm text-[${
            "#" + emailTemplateSettings?.textColour
          }] font-medium`}
          style={{ color: textColor }}
        >
          {currPage}/{totalPages}
        </span>
      </div>
    </div>
  );
};
