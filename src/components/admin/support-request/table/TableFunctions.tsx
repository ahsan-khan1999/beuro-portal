import React, { SetStateAction } from "react";
import CustomerFilter from "./payments-filter";
import { useTranslation } from "next-i18next";
import { FilterType } from "@/types";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (query: FilterType) => void;
}) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">{translate("admin.support_requests.heading")}</h1>
      <CustomerFilter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
