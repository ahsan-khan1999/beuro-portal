import { DocumentDetailFooterProps } from "@/types/types";
import React, { useMemo } from "react";

export const Footer = ({
  firstColumn,
  fourthColumn,
  secondColumn,
  thirdColumn,
  columnSettings,
  totalPages,
  currPage,
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

  return (
    <div className="relative flex items-center justify-between h-[149px] px-4  w-full bg-[#EEEEEE]">
      <div className="flex justify-center gap-[60px] w-full">
        {isFirstColumn && (
          <div
            className={`flex flex-col justify-center ${
              showFirstColumnBorder
                ? "pr-[60px] border-r-2 border-[#D9D9D9]"
                : ""
            }`}
          >
            {firstColumnSettings?.isCompany && (
              <span>{firstColumn?.companyName}</span>
            )}
            {firstColumnSettings?.isWebsite && (
              <span>{firstColumn?.website}</span>
            )}
            {firstColumnSettings?.isEmail && <span>{firstColumn?.email}</span>}
            {firstColumnSettings?.isPhoneNumber && (
              <span>{firstColumn?.phoneNumber}</span>
            )}
            {firstColumnSettings?.isTaxNumber && (
              <span>{firstColumn?.taxNumber}</span>
            )}
          </div>
        )}

        {/* 2nd column */}
        {isSecondColumn && (
          <div
            className={`flex flex-col ${
              showSecondColumnBorder
                ? "pr-[60px] border-r-2 border-[#D9D9D9]"
                : ""
            }`}
          >
            {secondColumnSettings?.isStreetNumber && (
              <span>{secondColumn?.address?.streetNumber}</span>
            )}
            {secondColumnSettings?.isPostCode && (
              <span>{secondColumn?.address?.postalCode}</span>
            )}
            {secondColumnSettings?.isBankName && (
              <span>{secondColumn?.bankDetails?.bankName}</span>
            )}
            {secondColumnSettings?.isAccountNumber && (
              <span>{secondColumn?.bankDetails?.accountNumber}</span>
            )}
            {secondColumnSettings?.isIBAN && (
              <span>{secondColumn?.bankDetails?.ibanNumber}</span>
            )}
          </div>
        )}

        {/* 3rd column */}
        {isThirdColumn && (
          <div
            className={`flex flex-col justify-center ${
              showThirdColumnBorder
                ? "pr-[60px] border-r-2 border-[#D9D9D9]"
                : ""
            }`}
          >
            {thirdColumnSettings?.isRow1 && <span>{thirdColumn.row1}</span>}
            {thirdColumnSettings?.isRow2 && <span>{thirdColumn.row2}</span>}
            {thirdColumnSettings?.isRow3 && <span>{thirdColumn.row3}</span>}
            {thirdColumnSettings?.isRow4 && <span>{thirdColumn.row4}</span>}
            {thirdColumnSettings?.isRow5 && <span>{thirdColumn.row5}</span>}
          </div>
        )}

        {/* fourth column */}
        {isFourthColumn && (
          <div className="flex flex-col">
            {fourthColumnSettings?.isRow1 && <span>{fourthColumn.row1}</span>}
            {fourthColumnSettings?.isRow2 && <span>{fourthColumn.row2}</span>}
            {fourthColumnSettings?.isRow3 && <span>{fourthColumn.row3}</span>}
            {fourthColumnSettings?.isRow4 && <span>{fourthColumn.row4}</span>}
            {fourthColumnSettings?.isRow5 && <span>{fourthColumn.row5}</span>}
          </div>
        )}
      </div>

      <div className="s self-end">
        <span className="text-[#1E1E1E] text-[14px] font-medium mr-[10px]">
          Page
        </span>
        <span className="text-[#1E1E1E] text-[14px] font-medium">{currPage}/{totalPages}</span>
      </div>
    </div>
  );
};
