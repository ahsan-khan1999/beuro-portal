import React, { SetStateAction } from "react";
import AllLeadsFilter from "./follow-up-filter";
import { FilterType } from "@/types";

const TableFunctions = ({ filter, setFilter }: { filter: FilterType, setFilter: SetStateAction<any> }) => {
  return (
    <div className="flex items-center mb-5 space-x-[85px]">
      <h1 className="text-xl text-[#222B45] font-normal">All Leads</h1>

      <AllLeadsFilter filter={filter} setFilter={setFilter}/>
    </div>
  );
};

export default TableFunctions;
