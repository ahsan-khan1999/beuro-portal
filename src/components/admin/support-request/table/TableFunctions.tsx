import React from "react";
import CustomerFilter from "./payments-filter";

const TableFunctions = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">Support Requests</h1>
      <CustomerFilter />
    </div>
  );
};

export default TableFunctions;
