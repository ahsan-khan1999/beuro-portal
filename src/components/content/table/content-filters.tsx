import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FiltersComponentProps } from "@/types";
import React from "react";
import { Button } from "@/base-components/ui/button/button";
import plusIcon from "@/assets/svgs/plus_icon.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import useFilter from "@/hooks/filter/hook";
import ServicesFilter from "@/base-components/filter/services-filter";
import ContractFilter from "@/base-components/filter/contracts-filter";

export default function ContentFilters({
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
    handleItemSelected,
    typeList,
  } = useFilter({ filter, setFilter });

  const router = useRouter();

  const { t: translate } = useTranslation();

  return (
    <div className="flex items-center space-x-4">
      <InputField
        handleChange={(value) => setFilter({ ...filter, text: value })}
        value={filter?.text}
      />
      <SelectField
        handleChange={(value) => setFilter({ ...filter, sortBy: value })}
        value={filter?.sortBy || ""}
        dropDownIconClassName=""
        options={["Date", "Latest", "Oldest", "A - Z", "Expiring Soon"]}
        label="Sort By"
      />
      <ContractFilter
        filter={filter}
        setFilter={setFilter}
        moreFilter={moreFilter}
        setMoreFilter={setMoreFilter}
        handleFilterResetToInitial={handleFilterResetToInitial}
        handleFilterReset={handleFilterReset}
        handleItemSelected={handleItemSelected}
        typeList={typeList}
      />
      <Button
        onClick={() => handleFilterChange(filter)}
        className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        text="Apply"
        id="apply"
        inputType="button"
        name=""
      />

      <Button
        onClick={() => router.push("/content/add")}
        className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        text={translate("content.add_button")}
        id="apply"
        inputType="button"
        icon={plusIcon}
      />
    </div>
  );
}
