import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxType, FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";
import ContractFilter from "@/base-components/filter/contracts-filter";
import { staticEnums } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";
import { useRouter } from "next/router";
export default function ContractFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const { t: translate } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");

  const checkbox: CheckBoxType[] = [
    {
      label: translate("contracts.table_functions.open"),
      type: `${staticEnums.ContractStatus.Open}`,
    },
    {
      label: translate("contracts.table_functions.confirm"),
      type: `${staticEnums.ContractStatus.Confirmed}`,
    },
    {
      label: translate("contracts.table_functions.cancel"),
      type: `${staticEnums.ContractStatus.Cancelled}`,
    },
  ];

  const handleStatusChange = (value: string, isChecked: boolean) => {
    setFilter((prev: FilterType) => {
      const updatedStatus = prev.status ? [...prev.status] : [];

      const newStatus = updatedStatus.map(Number);

      if (isChecked) {
        if (!updatedStatus.includes(value)) {
          updatedStatus.push(value);
        }
        router.push(
          {
            pathname: router.pathname,
            query: {
              status:
                newStatus && newStatus.length > 0
                  ? newStatus.join(",")
                  : "None",
            },
          },
          undefined,
          { shallow: true }
        );
      } else {
        const index = updatedStatus.indexOf(value);
        if (index > -1) {
          updatedStatus.splice(index, 1);
        }
        router.push(
          {
            pathname: router.pathname,
            query: {
              status:
                newStatus && newStatus.length > 0
                  ? newStatus.join(",")
                  : "None",
            },
          },
          undefined,
          { shallow: true }
        );
      }
      const status =
        updatedStatus.length > 0 ? updatedStatus : FiltersDefaultValues.None;
      const updatedFilter = { ...prev, status: status };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

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
    <div className="flex flex-col maxSize:flex-row maxSize:items-center w-full xl:w-fit gap-4 z-10">
      <div className="flex gap-[14px]">
        {checkbox.map((item, idx) => (
          <CheckField
            key={idx}
            checkboxFilter={filter}
            setCheckBoxFilter={setFilter}
            type={"status"}
            label={item.label}
            value={item.type}
            onChange={(value, isChecked) =>
              handleStatusChange(value, isChecked)
            }
          />
        ))}
      </div>
      <div className="flex gap-x-4 items-center">
        <InputField
          handleChange={handleInputChange}
          ref={inputRef}
          value={inputValue}
          iconDisplay={false}
          onEnterPress={onEnterPress}
        />
        <SelectField
          handleChange={(value) => hanldeSortChange(value)}
          value=""
          dropDownIconClassName=""
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
        />
        <ContractFilter
          filter={filter}
          setFilter={setFilter}
          onFilterChange={handleFilterChange}
        />
        {/* <Button
          id="apply"
          inputType="button"
          text="Apply"
          onClick={() => handleFilterChange()}
          className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        /> */}
      </div>
    </div>
  );
}
