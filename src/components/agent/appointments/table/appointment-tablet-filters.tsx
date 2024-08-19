import LeadsFilters from "@/base-components/filter/leads-filter";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FiltersDefaultValues } from "@/enums/static";

export default function AppointmentsTabletFilters({
  filter,
  setFilter,
  handleFilterChange,
  isAgent,
}: FiltersComponentProps) {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const queryText = router.query.text;
    const textValue = Array.isArray(queryText) ? queryText[0] : queryText;
    setInputValue(textValue || "");
  }, [router.query.text]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const onEnterPress = () => {
    let inputValue = inputRef?.current?.value;

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          text: inputValue,
        },
      },
      undefined,
      { shallow: false }
    );

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
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sort: value,
        },
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
    <div className="flex items-center justify-between w-full z-50">
      <h1
        className={`font-semibold text-[#222B45] ${
          isAgent ? "xAir:text-base mlg:text-2xl" : "text-2xl"
        }`}
      >
        {translate("sidebar.customer.appointments.appointment")}
      </h1>
      <div className="flex items-center gap-x-2">
        <InputField
          handleChange={handleInputChange}
          ref={inputRef}
          value={inputValue}
          iconDisplay={true}
          onEnterPress={onEnterPress}
          textClassName="w-[177px]"
        />

        <SelectField
          handleChange={(value) => hanldeSortChange(value)}
          value=""
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
          containerClassName="min-w-fit"
        />

        {/* <LeadsFilters
          filter={filter}
          setFilter={setFilter}
          onFilterChange={handleFilterChange}
        /> */}
      </div>
    </div>
  );
}
