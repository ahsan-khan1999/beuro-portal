import React from "react";
import OffersFilters from "./offers-filters";
import { FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex flex-col xMaxProLarge:flex-row xMaxProLarge:justify-between xMaxProLarge:items-center mb-4 gap-y-3 xMaxProLarge:gap-y-0">
      <h1 className="text-xl text-[#222B45] ">
        {translate("offers.main_heading")}
      </h1>
      <OffersFilters
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
