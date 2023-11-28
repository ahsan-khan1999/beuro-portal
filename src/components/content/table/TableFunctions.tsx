import React, { SetStateAction } from "react";
import { SearchInput } from "@/base-components/ui/searchBar/search-bar";
import { useRouter } from "next/router";
import ContentFilters from "./content-filters";
import { FilterType } from "@/types";
import { Button } from "@/base-components/ui/button/button";
import plusIcon from "@/assets/svgs/plus_icon.svg"
const TableFunctions = ({ filter, setFilter, handleFilterChange }: { filter: FilterType, setFilter: SetStateAction<any>, handleFilterChange: (value: FilterType) => void }) => {
  const router = useRouter();

  return (
    <div className="flex items-center ">

      <ContentFilters filter={filter} setFilter={setFilter} />
      <Button
        onClick={() => handleFilterChange(filter)}
        className="py-2 !h-[35px] px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
        text="Apply"
        id="apply"
        inputType="button"
        name=""
      />

      <Button
        onClick={() => router.push("/content/add")}
        className="py-2 !h-[35px]  px-[8px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-2 whitespace-nowrap"

        text="Add New"
        id="apply"
        inputType="button"
        icon={plusIcon}
      />

     
    </div>
  );
};

export default TableFunctions;
