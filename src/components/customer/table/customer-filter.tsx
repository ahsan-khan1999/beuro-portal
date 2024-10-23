import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FilterType, FiltersComponentProps } from "@/types";
import React, { useRef, useState, useEffect } from "react";
import plusIcon from "@/assets/svgs/plus_icon.svg";
import { Button } from "@/base-components/ui/button/button";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FiltersDefaultValues } from "@/enums/static";

export default function CustomerFilter({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const router = useRouter();
  const { sort } = router.query as any;
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

    if (value === "None") {
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
      <SelectField
        handleChange={(value) => hanldeSortChange(value)}
        value={sort || "None"}
        options={[
          {
            label: "common.sort_button",
            value: "None",
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

      <Button
        onClick={() => router.push("/customers/add")}
        className="!h-fit py-2 px-[10px] mt-0 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        text={translate("customers.add_button")}
        id="apply"
        inputType="button"
        icon={plusIcon}
        iconAlt="button"
      />
    </div>
    // </div>
  );
}
