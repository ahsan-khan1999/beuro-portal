import React from "react";
import CustomerFilter from "./payments-filter";
import { useTranslation } from "next-i18next";

const TableFunctions = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">{translate("admin.support_requests.heading")}</h1>
      <CustomerFilter />
    </div>
  );
};

export default TableFunctions;
