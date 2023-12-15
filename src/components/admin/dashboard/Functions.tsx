import React from "react";
import DashboardFilters from "./filters";
import { useTranslation } from "next-i18next";

const DashboardFunctions = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex justify-between items-center mt-6 mb-[35px]">
      <h1 className="text-xl text-[#222B45] ">{translate("admin.overview.main_heading")} </h1>
      <DashboardFilters />
    </div>
  );
};

export default DashboardFunctions;
