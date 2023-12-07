import React, { SetStateAction, useState } from "react";
import { SearchInput } from "@/base-components/ui/searchBar/search-bar";
import { useRouter } from "next/router";
import OffersFilters from "./offers-filters";
import { Status } from "@/types/global";
import { FilterType } from "@/types";
import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { useTranslation } from "next-i18next";


const TableFunctions = ({ filter, setFilter, handleFilterChange }: { filter: FilterType, setFilter: SetStateAction<any>, handleFilterChange: (value: FilterType) => void }) => {

  const router = useRouter()
  const { t: translate } = useTranslation();
  return (
    <div className="flex flex-col 2xl:flex-row 2xl:justify-between 2xl:items-center mb-4 gap-y-3 2xl:gap-y-0">
      <h1 className="text-xl text-[#222B45] ">{translate("offers.main_heading")}</h1>
      <div className="flex items-center ">

        <OffersFilters filter={filter} setFilter={setFilter} />
        <Button
          id="apply"
          inputType="button"
          text="Apply"
          onClick={() => handleFilterChange(filter)}
          className="!h-[40px] p-2  flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
        />


        <Button
          inputType="button"

          onClick={() => router.push("/offers/add")}
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
