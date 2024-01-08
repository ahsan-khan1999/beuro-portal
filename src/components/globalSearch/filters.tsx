import LeadsFilters from "@/base-components/filter/leads-filter";
import SelectField from "@/base-components/filter/fields/select-field";
import { FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

export default function GlobalSearchFilter({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const { t: translate } = useTranslation();
  const router = useRouter();

  const hanldeSortChange = (value: string) => {
    setFilter((prev: FilterType) => {
      const updatedFilter = { ...prev, ["sort"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex gap-x-4 justify-end">
      <SelectField
        handleChange={(value) => hanldeSortChange(value)}
        value=""
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
          {
            label: `${translate("filters.sort_by.a_z")}`,
            value: "customerDetail.fullName",
          },
        ]}
        label={translate("common.sort_button")}
      />
      <LeadsFilters
        filter={filter}
        setFilter={setFilter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
