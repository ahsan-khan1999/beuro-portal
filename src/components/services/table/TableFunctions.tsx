import React, { SetStateAction } from "react";
import { useRouter } from "next/router";
import ServicesFilters from "./services-filters";
import Image from "next/image";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { FilterType } from "@/types";
import { Button } from "@/base-components/ui/button/button";

const TableFunctions = ({ filter, setFilter, handleFilterChange }: { filter: FilterType, setFilter: SetStateAction<any>, handleFilterChange: (value: FilterType) => void }) => {
  const router = useRouter();

  return (
    <div className="flex items-center ">
      <ServicesFilters filter={filter} setFilter={setFilter}/>
      <Button
        id="apply"
        inputType="button"
        text="Apply"
        onClick={() => handleFilterChange(filter)}
        className="!h-[40px] p-2  flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
      />


      <Button
        inputType="button"

        onClick={() => router.push("/services/add")}
        className="gap-x-2 p-2 !h-[40px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-2 whitespace-nowrap"
        icon={addIcon}
        text="Add New"
        id="add"
      />
    </div>
  );
};

export default TableFunctions;
