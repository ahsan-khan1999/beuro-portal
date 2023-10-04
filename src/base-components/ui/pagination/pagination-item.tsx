import { PaginationItemProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import React from "react";

export const PaginationItem = React.memo(
  ({ handlePageClick, icon, className, disabled }: PaginationItemProps) => {
    const defaultClasses =
      "w-10 h-10 px-[10px] py-2 rounded-full text-gray font-semibold bg-white";
    const buttonClasses = combineClasses(defaultClasses, className);
    return (
      <button
        onClick={handlePageClick}
        className={`${buttonClasses}`}
        disabled={disabled}
      >
        {icon}
      </button>
    );
  }
);
