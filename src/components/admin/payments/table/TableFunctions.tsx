import React from "react";
import CustomerFilter from "./payments-filter";
import { useTranslation } from "next-i18next";
import { SelectMonthProps } from "@/types/admin/payments";

const TableFunctions = ({ handleSelectMonth }: SelectMonthProps) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">
        {translate("admin.payment_history.heading")}
      </h1>
      <CustomerFilter handleSelectMonth={handleSelectMonth} />
    </div>
  );
};

export default TableFunctions;
