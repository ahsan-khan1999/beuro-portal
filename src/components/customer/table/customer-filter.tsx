import DetailFilter from "@/base-components/filter/detail-filter";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import useFilter from "@/hooks/filter/hook";
import { FilterType } from "@/types";
import React, { SetStateAction, useState } from "react";


export default function CustomerFilter({ filter, setFilter }: { filter: FilterType, setFilter: SetStateAction<any> }) {

  const { isOpen, setIsOpen, moreFilter, setMoreFilter, handleFilterResetToInitial, handleFilterReset, handleItemSelected, typeList } = useFilter({ filter, setFilter })
  return (
    <div className="flex">
      <InputField
        handleChange={(value) => setFilter({ ...filter, ["text"]: value })}
        value={filter?.text}
        iconDisplay={true}
      />
      <SelectField
        handleChange={(value) => setFilter({ ...filter, ["sortBy"]: value })}
        value={filter?.sortBy || ""}
        dropDownIconClassName=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={["Date", "Latest", "Oldest", "A - Z", "Expiring Soon"]}
        label="Sort By"
      />
      <DetailFilter
        filter={filter}
        setFilter={setFilter}
        moreFilter={moreFilter}
        setMoreFilter={setMoreFilter}
        handleFilterResetToInitial={handleFilterResetToInitial}
        handleFilterReset={handleFilterReset}
        handleItemSelected={handleItemSelected}
        typeList={typeList}
      />
    </div>
  );
}
