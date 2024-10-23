import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FiltersDefaultValues } from "@/enums/static";
import { CheckBoxType, FilterType, FiltersComponentProps } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export default function CustomerFilter({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const router = useRouter();
  const { sort } = router.query as any;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const checkbox: CheckBoxType[] = [
    {
      label: `${translate("customer_status.block")}`,
      type: "0",
    },
    {
      label: `${translate("customer_status.unBlock")}`,
      type: "1",
    },
  ];

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

  const handleStatusChange = (value: string, isChecked: boolean) => {
    setFilter((prev: FilterType) => {
      const updatedStatus = prev.status ? [...prev.status] : [];
      const newStatus = updatedStatus;

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
          {
            shallow: true,
          }
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

  return (
    <div className="flex flex-col mlg:flex-row gap-4 z-10">
      <div className="flex items-center gap-x-4 xl:w-fit">
        {checkbox?.map((item, idx) => (
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
      <div className="flex items-center gap-x-4">
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
      </div>
      {/* <CustomerFilters
        filter={filter}
        setFilter={setFilter}
        onFilterChange={handleFilterChange}
      /> */}

      {/* <Button
        onClick={() => handleFilterChange()}
        className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        text="Apply"
        id="apply"
        inputType="button"
        name=""
      /> */}
    </div>
  );
}
