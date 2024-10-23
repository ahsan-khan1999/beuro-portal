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

  const hanldeSortChange = (value?: string) => {
    const updatedQuery = { ...router.query };

    if (value === undefined) {
      delete updatedQuery.sort;
    } else {
      updatedQuery.sort = String(value);
    }

    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: false }
    );

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
        value={
          Array.isArray(router.query.sort)
            ? router.query.sort[0]
            : router.query.sort
        }
        options={[
          {
            label: "common.sort_button",
            value: undefined,
          },
          {
            label: "filters.sort_by.date",
            value: "createdAt",
          },
          {
            label: "filters.sort_by.latest",
            value: "-createdAt",
          },
          {
            label: "filters.sort_by.oldest",
            value: "createdAt",
          },
          {
            label: "filters.sort_by.a_z",
            value: "customerDetail.fullName",
          },
        ]}
        containerClassName="w-[120px]"
        labelClassName="w-[120px]"
      />
      <LeadsFilters
        filter={filter}
        setFilter={setFilter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
