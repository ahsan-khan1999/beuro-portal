import React, { SetStateAction } from "react";
import InvoicesFilters from "./invoices-filters";
import { FilterType } from "@/types";
import { useTranslation } from "next-i18next";
import { XlsIcon } from "@/assets/svgs/components/xls-icon";

export interface InvoiceFunctionProps {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (value: FilterType) => void;
  onCSVDownload: () => Promise<void>;
}

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
  onCSVDownload,
}: InvoiceFunctionProps) => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex flex-col xMaxProLarge:flex-row justify-between xMaxProLarge:items-center gap-y-3 mb-4">
      <div className="flex items-center gap-x-2">
        <h1 className="text-xl text-[#222B45]">
          {translate("invoice.main_heading")}
        </h1>

        <XlsIcon onClick={onCSVDownload} />
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
