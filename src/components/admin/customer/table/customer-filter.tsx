import CustomerFilters from "@/base-components/filter/customer-filters";
// import DetailFilter from "@/base-components/filter/detail-filter";
import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { Button } from "@/base-components/ui/button/button";
import useFilter from "@/hooks/filter/hook";
import { CheckBoxType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

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
  const checkbox: CheckBoxType[] = [
    {
      label: `${translate("admin.customers_details.table_functions.active")}`,
      type: "active",
    },
    {
      label: `${translate("admin.customers_details.table_functions.block")}`,
      type: "blocked",
    },
  ];
  return (
    <div className="flex space-x-4">
      <div className="flex gap-x-4 w-full xl:w-fit">
        {checkbox.map((item, idx) => (
          <CheckField
            checkboxFilter={filter}
            setCheckBoxFilter={setFilter}
            type={"status"}
            label={item.label}
            value={item.type}
            checked
            onChange={(val) => {}}
          />
        ))}
      </div>
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
        onClick={() => handleFilterChange()}
        className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        text="Apply"
        id="apply"
        inputType="button"
        name=""
      />
    </div>
  );
}
