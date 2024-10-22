import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FilterType, FiltersComponentProps } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import ServicesFilter from "@/base-components/filter/services-filter";
import { FiltersDefaultValues } from "@/enums/static";

export default function ServicesFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const router = useRouter();
  const { t: translate } = useTranslation();
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

  return (
    <div className="flex items-center gap-4">
      <InputField
        handleChange={handleInputChange}
        ref={inputRef}
        value={inputValue}
        iconDisplay={true}
        onEnterPress={onEnterPress}
        textClassName="w-[177px]"
      />
      <div className="flex items-center gap-x-4">
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
    </div>
  );
}
