import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FilterType, FiltersComponentProps } from "@/types";
import React, { useRef } from "react";
import plusIcon from "@/assets/svgs/plus_icon.svg";
import { Button } from "@/base-components/ui/button/button";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FiltersDefaultValues } from "@/enums/static";

export default function CustomerFilter({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // const handleInputChange = (value: string) => {
  //   setFilter((prev: FilterType) => ({ ...prev, ["text"]: value }));
  // };

  const hanldeSortChange = (value: string) => {
    setFilter((prev: FilterType) => {
      const updatedFilter = { ...prev, ["sort"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

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

  return (
    <div className="flex gap-x-4 items-center">
      <InputField
        handleChange={(value) => {}}
        ref={inputRef}
        // value={inputValue || ""}
        iconDisplay={false}
        onEnterPress={onEnterPress}
        
      />
      <SelectField
        handleChange={(value) => hanldeSortChange(value)}
        value={filter?.sort || ""}
        dropDownIconClassName=""
        options={[
          { label: `${translate("filters.sort_by.date")}`, value: "createdAt" },
          {
            label: `${translate("filters.sort_by.latest")}`,
            value: "-createdAt",
          },
          {
            label: `${translate("filters.sort_by.oldest")}`,
            value: "createdAt",
          },
          { label: `${translate("filters.sort_by.a_z")}`, value: "fullName" },
        ]}
        label={translate("common.sort_button")}
      />
      {/* <CustomerFilters
        filter={filter}
        setFilter={setFilter}
        onFilterChange={handleFilterChange}
      /> */}

      {/* <Button
        onClick={() => handleFilterChange(filter)}
        className="!h-fit py-2 px-[10px] mt-0 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        text="Apply"
        id="apply"
        inputType="button"
        name=""
      /> */}

      <Button
        onClick={() => router.push("/customers/add")}
        className="!h-fit py-2 px-[10px] mt-0 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        text={translate("customers.add_button")}
        id="apply"
        inputType="button"
        icon={plusIcon}
        iconAlt="button"
      />
    </div>
  );
}
