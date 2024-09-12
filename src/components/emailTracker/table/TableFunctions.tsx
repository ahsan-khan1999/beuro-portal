import React, { SetStateAction } from "react";
import EmailTrackerFilters from "./email-tacker-filters";
import { useTranslation } from "next-i18next";
import { FilterType } from "@/types";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (value: FilterType) => void;
}) => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex maxSize:flex-row flex-col justify-between maxSize:items-center mb-4 gap-y-3">
      <h1 className="text-2xl font-medium text-[#222B45]">
        {translate("email_tracker.main_heading")}
      </h1>

      <EmailTrackerFilters
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
