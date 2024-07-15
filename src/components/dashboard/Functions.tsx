import React from "react";
import DashboardFilters from "./filters";
import { useTranslation } from "next-i18next";
import { FiltersComponentProps } from "@/types";

const DashboardFunctions = ({
  filter,
  handleFilterChange,
  setFilter,
}: FiltersComponentProps) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex justify-between items-center mt-5 mb-9">
      <h1 className="text-xl text-[#222B45]">
        {translate("dashboard_detail.overview")}{" "}
      </h1>
      <DashboardFilters
        filter={filter}
        handleFilterChange={handleFilterChange}
        setFilter={setFilter}
      />
    </div>
  );
};

export default DashboardFunctions;
