
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import useFilter from "@/hooks/filter/hook";
import { FiltersComponentProps } from "@/types";
import React from "react";
import plusIcon from "@/assets/svgs/plus_icon.svg";
import { Button } from "@/base-components/ui/button/button";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import CustomerFilters from "@/base-components/filter/customer-filters";

export default function CustomerFilter({
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

  const { t: translate } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex gap-x-4 items-center">
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
      <CustomerFilters
        filter={filter}
        setFilter={setFilter}
        moreFilter={moreFilter}
        setMoreFilter={setMoreFilter}
        handleFilterResetToInitial={handleFilterResetToInitial}
        handleFilterReset={handleFilterReset}
        typeList={typeList}
      />

      <Button
        onClick={() => handleFilterChange(filter)}
        className="!h-fit py-2 px-[10px] mt-0 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        text="Apply"
        id="apply"
        inputType="button"
        name=""
      />

      <Button
        onClick={() => router.push("/customers/add")}
        className="!h-fit py-2 px-[10px] mt-0 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        text={translate("customers.add_button")}
        id="apply"
        inputType="button"
        icon={plusIcon}
      />
    </div>
  );
}
