import React from "react";
import LeadsFilter from "./leads-filter";
import { FiltersComponentProps } from "@/types";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) => {
  return (
    <div className="flex flex-col xMaxProLarge:flex-row justify-between xMaxProLarge:items-center gap-y-3 mb-4">
      <h1 className="text-xl text-[#222B45]">Leads</h1>
      <LeadsFilter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
