import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { Button } from "@/base-components/ui/button/button";
import useFilter from "@/hooks/filter/hook";
import { FiltersComponentProps } from "@/types";
import React, { useState } from "react";

export default function EmailTrackerFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const {
    isOpen,
    toggleHandler,
    moreFilter,
    setMoreFilter,
    handleFilterResetToInitial,
    handleFilterReset,
    typeList,
  } = useFilter({ filter, setFilter });
  return (
    <div className="flex">
      <div className="flex items-center space-x-4">
        <InputField
          handleChange={(value) => setFilter({ ...filter, ["text"]: value })}
          value={filter?.text}
          iconDisplay={true}
        />
        <SelectField
          handleChange={(value) => setFilter({ ...filter, ["sortBy"]: value })}
          value={filter?.sortBy || ""}
          dropDownIconClassName=""
         
          options={["Date", "Latest", "Oldest", "A - Z", "Expiring Soon"]}
          label="Sort By"
        />
        <Button
          onClick={() => console.log()}
          className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
          text="Apply"
          id="apply"
          inputType="button"
          name=""
        />
      </div>
    </div>
  );
}
