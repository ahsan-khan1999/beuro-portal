import React from "react";
import DashboardFilters from "./filters";

const DashboardFunctions = () => {
  return (
    <div className="flex justify-between items-center mt-5 mb-9">
      <h1 className="text-xl text-[#222B45] ">Overview </h1>
      <DashboardFilters />
    </div>
  );
};

export default DashboardFunctions;
