import React from "react";
import LeadsFilter from "./leads-filter";
import { FiltersComponentProps } from "@/types";

export const LeadsTableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
  isAgent,
}: FiltersComponentProps) => {
  return (
    <div className="flex flex-col xMaxProLarge:flex-row justify-between xMaxProLarge:items-center gap-y-3 mb-4">
      <h1 className="text-2xl font-medium text-[#222B45]">Leads</h1>
      <LeadsFilter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
        isAgent={isAgent}
      />
    </div>
  );
};
