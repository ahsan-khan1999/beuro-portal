import React, { SetStateAction } from "react";
import ServicesFilters from "./services-filters";
import { FilterType } from "@/types";
import { TFunction } from "i18next";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
  translate,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: () => void;
  translate: TFunction<"translation", undefined>;
}) => {
  return (
    <div className="flex flex-col mlg:flex-row justify-between mlg:items-center gap-y-3 mb-4">
      <h1 className="text-xl text-[#222B45] ">
        {translate("services.main_heading")}
      </h1>

      <ServicesFilters
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={() => handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
