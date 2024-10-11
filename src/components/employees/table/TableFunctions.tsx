import React from "react";
import EmployeesFilters from "./employees-filters";
import { FiltersComponentProps } from "../../../types/types";
import { useTranslation } from "next-i18next";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex flex-col mlg:flex-row justify-between mlg:items-center gap-y-3 mb-4">
      <h1 className="text-2xl font-medium text-[#222B45]">
        {translate("employees.main_heading")}
      </h1>

      <EmployeesFilters
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
