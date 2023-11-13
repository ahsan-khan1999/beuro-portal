import React from "react";
import AllLeadsFilter from "./follow-up-filter";

const TableFunctions = () => {
  return (
    <div className="flex items-center mb-5 space-x-[85px]">
      <h1 className="text-xl text-[#222B45] font-normal">All Leads</h1>

      <AllLeadsFilter />
    </div>
  );
};

export default TableFunctions;
