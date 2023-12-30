import React from "react";
import { useTranslation } from "next-i18next";
import { FiltersComponentProps } from "@/types";
import DashboardFilters from "@/components/dashboard/filters";

const DashboardFunctions = ({ filter, handleFilterChange, setFilter }: FiltersComponentProps) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex justify-between items-center mt-6 mb-[35px]">
      <h1 className="text-xl text-[#222B45] ">{translate("admin.overview.main_heading")} </h1>
      {/* <DashboardFilters filter={filter} handleFilterChange={handleFilterChange} setFilter={setFilter}/> */}
      <DashboardFilters filter={filter} handleFilterChange={handleFilterChange} setFilter={setFilter}/>

    </div>
  );
};

export default DashboardFunctions;
