import CustomerFilters from "@/base-components/filter/customer-filters";
import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
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
  const moreFilters = {
    text: "",
  };
  const { handleFilterResetToInitial, handleFilterReset } = useFilter({
    filter,
    setFilter,
    moreFilters,
  });

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
    <div className="flex items-center space-x-4">
      {checkbox.map((item, idx) => (
        <CheckField
          checkboxFilter={filter}
          setCheckBoxFilter={setFilter}
          type={"status"}
          label={item.label}
          value={item.type}
          onChange={(val) => {}}
        />
      ))}
      <InputField
        handleChange={(value) => setFilter({ ...filter, ["text"]: value })}
        value={filter?.text || ""}
        iconDisplay={true}
      />
      <SelectField
        handleChange={(value) => setFilter({ ...filter, ["sortBy"]: value })}
        value={filter?.sort || ""}
        dropDownIconClassName=""
        options={[
          { label: "Date", value: "createdAt" },
          { label: "Latest", value: "-createdAt" },
          { label: "Oldest", value: "createdAt" },
          { label: "A - Z", value: "title" },
        ]}
        label="Sort By"
      />
      {/* <CustomerFilters
        filter={filter}
        setFilter={setFilter}
        onFilterChange={handleFilterChange}
      /> */}

      {/* <Button
        onClick={() => handleFilterChange()}
        className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        text="Apply"
        id="apply"
        inputType="button"
        name=""
      /> */}
    </div>
  );
}
