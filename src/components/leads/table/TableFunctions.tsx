import React from "react";
import LeadsFilter from "./leads-filter";
import { FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex flex-col xLarge:flex-row justify-between xLarge:items-center gap-y-3 mb-4">
      <h1 className="text-xl text-[#222B45]">
        {translate("leads.main_heading")}
      </h1>
      <LeadsFilter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
