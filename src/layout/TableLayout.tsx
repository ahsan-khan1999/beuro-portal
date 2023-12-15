import { detailScreenCardsLayout } from "@/types";
import React from "react";

const TableLayout = ({ children }: detailScreenCardsLayout) => {
  return (
    <div className="overflow-hidden">
      <p className="text-[16px] mlg:hidden block mb-2 mt-3">
        <span className="text-red-600 font-bold">Note: </span>Drag to scroll on
        the table
      </p>

      <div className="min-w-full overflow-x-scroll">
        <div className="xs:w-[1120px] md:w-auto rounded-md ">{children}</div>
      </div>
    </div>
  );
};

export default TableLayout;
