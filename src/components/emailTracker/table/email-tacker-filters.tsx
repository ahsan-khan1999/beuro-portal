import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { Button } from "@/base-components/ui/button/button";
import { FiltersDefaultValues } from "@/enums/static";
import { FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import React, { useRef } from "react";

export default function EmailTrackerFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t: translate } = useTranslation();

  const handleInputChange = (value: string) => {
    setFilter((prev: FilterType) => ({ ...prev, ["text"]: value }));
  };
  const hanldeSortChange = (value: string) => {
    setFilter((prev: FilterType) => {
      const updatedFilter = { ...prev, ["sort"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  const handleEnterPress = () => {
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
  return (
    <div className="flex">
      <div className="flex items-center space-x-4">
        <InputField
          handleChange={(value) => {}}
          // value={filter?.text}
          iconDisplay={true}
          onEnterPress={handleEnterPress}
          ref={inputRef}
        />
        <SelectField
          handleChange={(value) => hanldeSortChange(value)}
          value={filter?.sort || ""}
          dropDownIconClassName=""
          options={[
            {
              label: `${translate("filters.sort_by.date")}`,
              value: "createdAt",
            },
            {
              label: `${translate("filters.sort_by.latest")}`,
              value: "-createdAt",
            },
            {
              label: `${translate("filters.sort_by.oldest")}`,
              value: "createdAt",
            },
            { label: `${translate("filters.sort_by.a_z")}`, value: "title" },
          ]}
          label={translate("common.sort_button")}
        />
        {/* <Button
          onClick={() => handleFilterChange()}
          className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
          text="Apply"
          id="apply"
          inputType="button"
          name=""
        /> */}
      </div>
    </div>
  );
}
