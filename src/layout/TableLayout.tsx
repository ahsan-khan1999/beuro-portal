import { detailScreenCardsLayout } from "@/types";
import { useTranslation } from "next-i18next";
import React from "react";

const TableLayout = ({ children, isAgent }: detailScreenCardsLayout) => {
  const { t: translate } = useTranslation();

  return (
    <div className="overflow-x-hidden">
      {!isAgent && (
        <p className="text-base mlg:hidden block mb-5">
          <span className="text-red-600 font-bold">
            {translate("common.note")}:{" "}
          </span>
          {translate("common.drag_table")}
        </p>
      )}

      <div className={`${!isAgent && "overflow-x-scroll"}`}>
        <div
          className={`${
            !isAgent ? "xs:w-[1120px] md:w-auto" : "w-full"
          }  rounded-md`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
