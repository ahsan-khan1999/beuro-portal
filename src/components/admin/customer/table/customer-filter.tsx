import CustomerFilters from "@/base-components/filter/customer-filters";
import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FiltersDefaultValues } from "@/enums/static";
import useFilter from "@/hooks/filter/hook";
import { CheckBoxType, FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useRef } from "react";

export default function CustomerFilter({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
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
  const onEnterPress = () => {
    let inputValue = inputRef?.current?.value;
    if (inputValue === "") {
      inputValue = FiltersDefaultValues.None;
    }
    setFilter((prev: FilterType) => {
      const updatedValue = { ...prev, ["text"]: inputValue };
      handleFilterChange(updatedValue);
      console.log(updatedValue);
      
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
  const handleStatusChange = (value: string, isChecked: boolean) => {
    setFilter((prev: FilterType) => {
      const updatedStatus = prev.status ? [...prev.status] : [];
      if (isChecked) {
        if (!updatedStatus.includes(value)) {
          updatedStatus.push(value);
        }
      } else {
        const index = updatedStatus.indexOf(value);
        if (index > -1) {
          updatedStatus.splice(index, 1);
        }
      }
      const status =
        updatedStatus.length > 0 ? updatedStatus : FiltersDefaultValues.None;
      const updatedFilter = { ...prev, status: status };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex space-x-4">
      <div className="flex gap-x-4 w-full xl:w-fit">
        {checkbox.map((item, idx) => (
          <CheckField
          key={idx}
            checkboxFilter={filter}
            setCheckBoxFilter={setFilter}
            type={"status"}
            label={item.label}
            value={item.type}
            onChange={(value, isChecked) =>
              handleStatusChange(value, isChecked)
            }
          />
        ))}
      </div>
      <InputField
        handleChange={(value) => {}}
        ref={inputRef}
        // value={filter?.text || ""}
        iconDisplay={true}
        onEnterPress={onEnterPress}
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
