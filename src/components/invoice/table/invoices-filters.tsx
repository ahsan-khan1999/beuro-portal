import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxType, FilterType } from "@/types";
import React, { SetStateAction, useRef } from "react";
import { Button } from "@/base-components/ui/button/button";
import InvoicesFilter from "@/base-components/filter/invoices-filter";
import { staticEnums } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";

export default function InvoicesFilters({
  filter,
  setFilter,
  handleFilterChange,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (value: FilterType) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const checkbox: CheckBoxType[] = [
    { label: "Open", type: `${staticEnums.InvoiceStatus.Pending}` },
    { label: "Overdue", type: `${staticEnums.InvoiceStatus.Overdue}` },
    { label: "Paid", type: `${staticEnums.InvoiceStatus.Paid}` },
  ];

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

  const handlePressEnter = () => {
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
    <div className="flex flex-col maxSize:flex-row maxSize:items-center w-full xl:w-fit gap-4">
      <div className="flex gap-[14px]">
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

      <div className="flex gap-x-4 items-center">
        <InputField
          handleChange={(value) => {}}
          // value={filter?.text}
          onEnterPress={handlePressEnter}
          ref={inputRef}
        />
        <SelectField
          handleChange={(value) => hanldeSortChange(value)}
          value=""
          dropDownIconClassName=""
          options={[
            { label: "Date", value: "createdAt" },
            { label: "Latest", value: "-createdAt" },
            { label: "Oldest", value: "createdAt" },
            { label: "A - Z", value: "title" },
          ]}
          label="Sort By"
        />
        <InvoicesFilter
          filter={filter}
          setFilter={setFilter}
          onFilterChange={handleFilterChange}
        />

        {/* <Button
          id="apply"
          inputType="button"
          text="Apply"
          onClick={() => handleFilterChange(filter)}
          className="!h-[40px] p-2  flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
        /> */}
      </div>
    </div>
  );
}
