import InputField from "@/base-components/filter/fields/input-field";
import { FiltersDefaultValues } from "@/enums/static";
import { FiltersComponentProps, FilterType } from "@/types";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export const CalendarFilters = ({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

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
    <InputField
      handleChange={handleInputChange}
      ref={inputRef}
      value={inputValue}
      iconDisplay={true}
      onEnterPress={onEnterPress}
    />
  );
};
