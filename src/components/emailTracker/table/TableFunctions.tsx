import React from "react";
import EmailTrackerFilters from "./email-tacker-filters";
import { useTranslation } from "next-i18next";

const TableFunctions = () => {
  const { t: translate } = useTranslation();
  // function onInputChange(text: string) {}

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-base lg:text-xl text-[#222B45] ">
        {translate("email_tracker.main_heading")}
      </h1>

      <EmailTrackerFilters />
    </div>
  );
};

export default TableFunctions;
