import { detailScreenCardsLayout } from "@/types";
import React from "react";

const TableLayout = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="overflow-hidden">
      <p className="text-[16px] lg:hidden block mb-2">
        <span className="text-red-600  font-bold">Note: </span>Drag to scroll on
        the table
      </p>

      <div className="overflow-x-auto rounded-md ">{children}</div>
    </div>
  );
};

export default TableLayout;
