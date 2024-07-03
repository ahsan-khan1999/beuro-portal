import InputField from "@/base-components/filter/fields/input-field";
import { Button } from "@/base-components/ui/button/button";
import { FilterType } from "@/types";
import { useTranslation } from "next-i18next";
import React, { SetStateAction, useRef, useState } from "react";
import { FiltersDefaultValues } from "@/enums/static";

export default function FollowUpFilter({
  filter,
  setFilter,
  handleFilterChange,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (text: FilterType) => void;
}) {
  const { t: translate } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleApply = () => {
    const inputValue = inputRef?.current?.value || FiltersDefaultValues.None;

    setFilter((prev: FilterType) => {
      // const updatedValue = { ...prev, text: inputValue };
      const updatedFilter = {
        ...prev,
        text: inputValue,
        status: FiltersDefaultValues.None,
      };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex">
      <InputField
        handleChange={handleInputChange}
        ref={inputRef}
        value={inputValue}
        iconDisplay={true}
      />
      <Button
        text={translate("common.apply_button")}
        id="Apply"
        inputType="submit"
        onClick={handleApply}
        className="!h-[36px] px-5 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
      />
    </div>
  );
}
