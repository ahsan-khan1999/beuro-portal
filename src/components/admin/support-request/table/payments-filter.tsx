import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FiltersDefaultValues } from "@/enums/static";
import { FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import React, { useRef, useState } from "react";

export default function PaymentsFilter({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t: translate } = useTranslation();

  const onEnterPress = () => {
    let inputValue = inputRef?.current?.value;
    if (inputValue === "") {
      inputValue = FiltersDefaultValues.None;
    }
    setFilter((prev: FilterType) => {
      const updatedValue = { ...prev, ["text"]: inputValue };
      handleFilterChange(updatedValue);
      return updatedValue;
    });
  };

  const hanldeSortChange = (value: string) => {
    setFilter((prev: FilterType) => {
      const updatedFilter = { ...prev, ["sort"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex space-x-4">
      <InputField
        handleChange={(value) => {}}
        ref={inputRef}
        // value=""
        iconDisplay={true}
        onEnterPress={onEnterPress}
        options={[]}
      />
      <SelectField
        handleChange={(value) => hanldeSortChange(value)}
        value={filter?.sort || ""}
        dropDownIconClassName=""
        options={[
          { label: "Date", value: "createdAt" },
          { label: "Latest", value: "-createdAt" },
          { label: "Oldest", value: "createdAt" },
          { label: "A - Z", value: "title" },
        ]}
        label={translate("common.sort_button")}
      />
    </div>
  );
}
