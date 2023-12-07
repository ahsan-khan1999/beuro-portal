import React, { SetStateAction, useState } from "react";
import { SearchInput } from "@/base-components/ui/searchBar/search-bar";
import { useRouter } from "next/router";
import CustomerFilter from "./customer-filter";
import { FilterType } from "@/types";
import plusIcon from "@/assets/svgs/plus_icon.svg"
import { Button } from "@/base-components/ui/button/button";
import { useTranslation } from "next-i18next";

const TableFunctions = ({ filter, setFilter, handleFilterChange }: { filter: FilterType, setFilter: SetStateAction<any>, handleFilterChange: (value: FilterType) => void }) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  function onInputChange(text: string) { }

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 gap-y-3 2xl:gap-y-0">
      <h1 className="text-xl text-[#222B45] ">
        {translate("customers.title")}
      </h1>
      <div className="flex items-center ">
        <div className="flex items-center space-x-4">
          <CustomerFilter filter={filter} setFilter={setFilter} />
        </div>
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
          className="py-2 !h-[35px] px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-2 whitespace-nowrap"

          text={translate("customers.add_button")}
          id="apply"
          inputType="button"
          icon={plusIcon}
        />
      </div>
    </div>
  );
};

export default TableFunctions;
