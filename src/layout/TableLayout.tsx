import { detailScreenCardsLayout } from "@/types";
import { useTranslation } from "next-i18next";
import React from "react";

const TableLayout = ({ children }: detailScreenCardsLayout) => {
  const { t: translate } = useTranslation();
  return (
    <div className="overflow-x-hidden">
      <p className="text-[16px] mlg:hidden block mb-2 mt-3">
        <span className="text-red-600 font-bold">
          {translate("common.note")}:{" "}
        </span>
        {translate("common.drag_table")}
      </p>

      <div className="min-w-full overflow-x-scroll">
        <div className="xs:w-[1120px] md:w-auto rounded-md">{children}</div>
      </div>
    </div>
  );
};

export default TableLayout;
