import InputField from "@/base-components/filter/fields/input-field";
import { AppointmentTableFunction, FilterType } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FiltersDefaultValues } from "@/enums/static";
import { CustomDatePciker } from "@/base-components/ui/custom-date-picker";

export default function AppointmentsMobileFilters({
  filter,
  setFilter,
  handleFilterChange,
  onDateChange,
}: AppointmentTableFunction) {
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

  // const hanldeSortChange = (value: string) => {
  //   router.push(
  //     {
  //       pathname: router.pathname,
  //       query: {
  //         ...router.query,
  //         sort: value,
  //       },
  //     },
  //     undefined,
  //     { shallow: false }
  //   );

  //   setFilter((prev: FilterType) => {
  //     const updatedFilter = { ...prev, ["sort"]: value };
  //     handleFilterChange(updatedFilter);
  //     return updatedFilter;
  //   });
  // };

  return (
    <div className="flex flex-col gap-y-4 w-full z-50">
      <div className="flex items-center justify-between">
        <h1 className={`font-medium text-[#1E1E1E] text-base`}>
          {translate("sidebar.customer.appointments.appointment")}
        </h1>

        <div className="w-[200px] z-10">
          <CustomDatePciker
            id="today"
            name="today"
            value={filter?.today}
            onInputChange={onDateChange}
          />
        </div>
        {/* </div> */}
      </div>

      <InputField
        handleChange={handleInputChange}
        ref={inputRef}
        value={inputValue}
        iconDisplay={true}
        onEnterPress={onEnterPress}
        textClassName="w-full rounded-full"
        containerClassName="w-full"
        inputDivClassName="w-full"
      />
    </div>
  );
}
