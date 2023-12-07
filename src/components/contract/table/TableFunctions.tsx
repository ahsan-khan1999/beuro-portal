import React, { SetStateAction, useState } from "react";
import ContractFilters from "./contract-filters";
import { FilterType } from "@/types";
import { Button } from "@/base-components/ui/button/button";
import { useTranslation } from "next-i18next";

const TableFunctions = ({ filter, setFilter, handleFilterChange }: { filter: FilterType, setFilter: SetStateAction<any>, handleFilterChange: (value: FilterType) => void }) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">{translate("contracts.main_heading")}</h1>
      <div className="flex items-center ">

        <ContractFilters filter={filter} setFilter={setFilter} handleFilterChange={handleFilterChange} />
        <Button
          id="apply"
          inputType="button"
          text="Apply"
          onClick={() => handleFilterChange(filter)}
          className="!h-[40px] p-2  flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
        />
      </div>
    </div>

  );
};

export default TableFunctions;
