import React from "react";
import AllCustomersFilter from "./follow-up-filter";

const TableFunctions = () => {
  return (
    <div className="flex  items-center mb-5 space-x-10">
      <h1 className="text-xl text-[#222B45] font-normal">All Customers</h1>

      <AllCustomersFilter />
    </div>
  );
};

export default TableFunctions;
