import React from "react";
import ContractFilters from "./contract-filters";
import { FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex flex-col maxLarge:flex-row gap-y-3 justify-between maxLarge:items-center mb-4">
      <h1 className="text-2xl font-medium text-[#222B45]">
        {translate("contracts.main_heading")}
      </h1>
      <ContractFilters
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
