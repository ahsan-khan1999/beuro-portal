import { PaginationItemProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import React from "react";

export const PaginationItem = React.memo(
  ({ handlePageClick, icon, className, disabled }: PaginationItemProps) => {
    const defaultClasses =
      "w-10 h-10 xMini:w-[3rem] xMini:h-[3rem] p-[10px] rounded-full text-gray font-semibold bg-white mb-7";
    const buttonClasses = combineClasses(defaultClasses, className);

    return (
      <button
        onClick={handlePageClick}
        className={`${buttonClasses}`}
        disabled={disabled}
        // style={{ minWidth: "3rem", minHeight: "3rem" }}
      >
        {icon}
      </button>
    );
  }
);
