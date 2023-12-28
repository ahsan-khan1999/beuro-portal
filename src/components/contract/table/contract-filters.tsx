import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { Button } from "@/base-components/ui/button/button";
import { CheckBoxType, FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import React from "react";
import ContractFilter from "@/base-components/filter/contracts-filter";
import { staticEnums } from "@/utils/static";
export default function ContractFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const { t: translate } = useTranslation();

  const checkbox: CheckBoxType[] = [
    {
      label: translate("contracts.table_functions.open"),
      type: `${staticEnums.ContractStatus.Open}`,
    },
    {
      label: translate("contracts.table_functions.confirm"),
      type: `${staticEnums.ContractStatus.Confirmed}`,
    },
    {
      label: translate("contracts.table_functions.cancel"),
      type: `${staticEnums.ContractStatus.Cancelled}`,
    },
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
      const updatedFilter = { ...prev, status: updatedStatus };
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

  const handleEnterPress = () => {
    handleFilterChange(filter);
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
          handleChange={(value) => handleInputChange(value)}
          value={filter.text}
          onEnterPress={handleEnterPress}
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
        <ContractFilter
          filter={filter}
          setFilter={setFilter}
          onFilterChange={handleFilterChange}
        />
        {/* <Button
          id="apply"
          inputType="button"
          text="Apply"
          onClick={() => handleFilterChange()}
          className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        /> */}
      </div>
    </div>
  );
}
