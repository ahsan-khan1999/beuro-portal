import React from "react";
import FollowUpFilter from "./follow-up-filter";

const TableFunctions = () => {
  return (
    <div className="flex  items-center mb-5 space-x-10">
      <h1 className="text-xl text-[#222B45] font-normal">All Follow ups</h1>

      <FollowUpFilter />
    </div>
  );
};

export default TableFunctions;
