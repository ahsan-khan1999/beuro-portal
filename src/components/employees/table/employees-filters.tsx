import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FilterType, FiltersComponentProps } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import EmployeesFilter from "@/base-components/filter/employees-filter";
import { FiltersDefaultValues } from "@/enums/static";

export default function EmployeesFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  // const [selectedSortLabel, setSelectedSortLabel] = useState<string>("");

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

  // useEffect(() => {
  //   const sortOption = router.query.sort;
  //   if (typeof sortOption === "string") {
  //     const selectedLabel = getSelectedSortLabel(sortOption);
  //     setSelectedSortLabel(selectedLabel);
  //   }
  // }, [router.query.sort]);

  // const getSelectedSortLabel = (value: string): string => {
  //   switch (value) {
  //     case "createdAt":
  //       return translate("filters.sort_by.date");
  //     case "-createdAt":
  //       return translate("filters.sort_by.latest");
  //     case "fullName":
  //       return translate("filters.sort_by.a_z");
  //     default:
  //       return "";
  //   }
  // };

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
    <div className="flex items-center space-x-4">
      <InputField
        handleChange={handleInputChange}
        ref={inputRef}
        value={inputValue}
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
          { label: `${translate("filters.sort_by.a_z")}`, value: "title" },
        ]}
        label={translate("common.sort_button")}
      />
      <EmployeesFilter
        filter={filter}
        setFilter={setFilter}
        onFilterChange={handleFilterChange}
      />

      {/* <Button
        id="apply"
        inputType="button"
        text="Apply"
        onClick={() => handleFilterChange()}
        className="flex items-center gap-x-2 py-2 mr-2 !h-fit px-[10px]  text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
      /> */}

      <Button
        inputType="button"
        onClick={() => router.push("/employees/add")}
        className="flex items-center gap-x-2 py-2 !h-fit px-[10px] text-[13px] font-semibold hover:bg-[#7B18FF] bg-primary text-white rounded-md whitespace-nowrap"
        icon={addIcon}
        text={translate("services.add_button")}
        id="add"
      />
    </div>
  );
}
