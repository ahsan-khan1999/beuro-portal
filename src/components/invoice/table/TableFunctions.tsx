import React, { SetStateAction } from "react";
import InvoicesFilters from "./invoices-filters";
import { FilterType } from "@/types";
import { useTranslation } from "next-i18next";

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
    <div className="flex flex-col xMaxSize:flex-row justify-between xMaxSize:items-center gap-y-3 mb-4">
      <h1 className="text-xl text-[#222B45] ">
        {translate("invoice.main_heading")}
      </h1>
      <div className="flex gap-x-5">
        <div className="bg-white shadow-lg px-5 py-3 flex flex-col gap-y-1 items-center">
          <span>Total</span>
          <span>0.000000 CHf</span>
        </div>
        <div className="bg-white shadow-lg px-5 py-3 flex flex-col gap-y-1 items-center">
          <span>Page Sum</span>
          <span>0.000000 CHf</span>
        </div>
      </div>

      <InvoicesFilters
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
