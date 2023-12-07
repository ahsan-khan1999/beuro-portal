import React, { SetStateAction, useState } from "react";
import { SearchInput } from "@/base-components/ui/searchBar/search-bar";
import { useRouter } from "next/router";
import { Status } from "@/types/global";
import InvoicesFilters from "./invoices-filters";
import { FilterType } from "@/types";
import { Button } from "@/base-components/ui/button/button";

const TableFunctions = ({ filter, setFilter, handleFilterChange }: { filter: FilterType, setFilter: SetStateAction<any>, handleFilterChange: (value: FilterType) => void }) => {

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">Invoice</h1>
      <div className="flex items-center ">

        <div className="flex items-center space-x-4">

          <InvoicesFilters filter={filter} setFilter={setFilter} handleFilterChange={handleFilterChange} /></div>
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
