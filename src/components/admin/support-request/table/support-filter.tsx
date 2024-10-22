import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FiltersDefaultValues } from "@/enums/static";
import { FilterType, FiltersComponentProps } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export default function SupportFilter({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const queryText = router.query.text;
    const textValue = Array.isArray(queryText) ? queryText[0] : queryText;
    setInputValue(textValue || "");
  }, [router.query.text]);

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

  return (
    <div className="flex space-x-4 z-10">
      <InputField
        handleChange={handleInputChange}
        ref={inputRef}
        value={inputValue}
        iconDisplay={true}
        onEnterPress={onEnterPress}
        options={[]}
      />
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
    </div>
  );
}
