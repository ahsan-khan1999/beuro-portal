import InputField from "@/base-components/filter/fields/input-field";
import { Button } from "@/base-components/ui/button/button";
import { FilterType } from "@/types";
import { useTranslation } from "next-i18next";
import React, { SetStateAction, useRef, useState } from "react";
import { FiltersDefaultValues } from "@/enums/static";
import { useRouter } from "next/router";
export default function FollowUpFilter({
  filter,
  setFilter,
  handleFilterChange,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (filter: FilterType) => void;
}) {
  const { t: translate } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();

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

  return (
    <div className="flex">
      <InputField
        handleChange={handleInputChange}
        ref={inputRef}
        value={inputValue}
        iconDisplay={false}
      />
      <Button
        text={translate("common.apply_button")}
        id="Apply"
        inputType="submit"
        onClick={onEnterPress}
        className="!h-[36px] px-5 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
      />
    </div>
  );
}
