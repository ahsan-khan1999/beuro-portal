import React, { SetStateAction } from "react";
import FollowUpFilter from "./follow-up-filter";
import { FilterType } from "@/types";

const TableFunctions = ({ filter, setFilter, handleFilterChange }: { filter: FilterType, setFilter: SetStateAction<any>, handleFilterChange: () => void }) => {
  return (
    <div className="flex  items-center mb-5 space-x-10">
      <h1 className="text-xl text-[#222B45] font-normal">All Follow ups</h1>

      <FollowUpFilter filter={filter} setFilter={setFilter} handleFilterChange={handleFilterChange} />
    </div>
  );
};

export default TableFunctions;
