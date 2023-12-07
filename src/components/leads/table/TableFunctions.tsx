import React, { SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import LeadsFilter from "./leads-filter";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { FilterType } from "@/types";
import { Button } from "@/base-components/ui/button/button";

const TableFunctions = ({ filter, setFilter, handleFilterChange }: { filter: FilterType, setFilter: SetStateAction<any>, handleFilterChange: (value: FilterType) => void }) => {
  const router = useRouter()
  function onInputChange(text: string) { }

  const handleButtonClick = (key: string, value: boolean) => {
    setFilter({ ...filter, [key]: value });
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl text-[#222B45] ">Leads</h1>
      <div className="flex items-center ">

        <LeadsFilter filter={filter} setFilter={setFilter} />
        <Button
          id="apply"
          inputType="button"
          text="Apply"
          onClick={() => handleFilterChange(filter)}
          className="!h-[40px] p-2  flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
        />


        <Button
          inputType="button"

          onClick={() => router.push("/leads/add")}
          className="gap-x-2 p-2 !h-[40px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-2 whitespace-nowrap"
          icon={addIcon}
          text="Add New"
          id="add"
        />


      </div>
    </div>
  );
};

export default TableFunctions;
