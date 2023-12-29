import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FilterType, FiltersComponentProps } from "@/types";
import React from "react";
import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import ServicesFilter from "@/base-components/filter/services-filter";

export default function ServicesFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const router = useRouter();
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
    handleFilterChange(filter);
  };

  return (
    <div className="flex items-center space-x-4">
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
      <ServicesFilter
        filter={filter}
        setFilter={setFilter}
        onFilterChange={handleFilterChange}
      />
      {/* <Button
        id="apply"
        inputType="button"
        text="Apply"
        onClick={() => handleFilterChange()}
        className="flex items-center gap-x-2 py-2 !h-fit px-[10px]  text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
      /> */}

      <Button
        inputType="button"
        onClick={() => router.push("/services/add")}
        className="flex items-center gap-x-2 py-2 !h-fit px-[10px] mt-0  text-[13px] font-semibold hover:bg-[#7B18FF] bg-primary text-white rounded-md whitespace-nowrap"
        icon={addIcon}
        text={translate("services.add_button")}
        id="add"
      />
    </div>
  );
}
