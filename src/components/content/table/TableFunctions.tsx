import React from "react";
import ContentFilters from "./content-filters";
import { FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex flex-col mlg:flex-row justify-between mlg:items-center mb-4 gap-y-3">
      <h1 className="text-xl text-[#222B45] ">
        {translate("content.main_heading")}
      </h1>

      <ContentFilters
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
