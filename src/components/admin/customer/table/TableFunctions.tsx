import React, { SetStateAction } from "react";
import CustomerFilter from "./customer-filter";
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

  function onInputChange(text: string) {}

  return (
    <div className="flex flex-col xlg:flex-row gap-y-3 justify-between xlg:items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">
        {translate("admin.customers_details.main_heading")}
      </h1>
      <CustomerFilter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={() => handleFilterChange(filter)}
      />
    </div>
  );
};

export default TableFunctions;
