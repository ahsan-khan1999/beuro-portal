import React, { SetStateAction } from "react";
import { useTranslation } from "next-i18next";
import { FilterType } from "@/types";
import SupportFilter from "./support-filter";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (query: FilterType) => void;
}) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex justify-between flex-wrap items-center mb-4">
      <h1 className="text-2xl font-medium text-[#222B45] mb-2 mr-3">
        {translate("admin.support_requests.heading")}
      </h1>
      <SupportFilter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
