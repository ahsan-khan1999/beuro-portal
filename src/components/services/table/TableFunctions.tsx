import React, { SetStateAction } from "react";
import { useRouter } from "next/router";
import ServicesFilters from "./services-filters";
import Image from "next/image";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { FilterType } from "@/types";
import { Button } from "@/base-components/ui/button/button";
import { useTranslation } from "next-i18next";

const TableFunctions = ({ filter, setFilter, handleFilterChange }: { filter: FilterType, setFilter: SetStateAction<any>, handleFilterChange: (value: FilterType) => void }) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <div className="flex items-center ">
      <ServicesFilters filter={filter} setFilter={setFilter} />
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
        className="flex items-center gap-x-3 py-2 pl-2 pr-[10px] px-[8px]  text-[13px] font-semibold hover:bg-[#7B18FF] bg-primary text-white rounded-md ml-8 whitespace-nowrap"
        icon={addIcon}
        text={translate("services.add_button")}

        id="add"
      />
    </div>
  );
};

export default TableFunctions;
