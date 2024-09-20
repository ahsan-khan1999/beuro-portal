import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxType, FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FiltersDefaultValues } from "@/enums/static";
import { staticEnums } from "@/utils/static";
import CheckField from "@/base-components/filter/fields/check-field";

export default function AppointmentsTabletFilters({
  filter,
  setFilter,
  handleFilterChange,
  isAgent,
}: FiltersComponentProps) {
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

  const checkbox: CheckBoxType[] = [
    {
      label: translate("sidebar.customer.appointments.pending"),
      type: `${staticEnums.AppointmentStatus.Pending}`,
    },
    {
      label: translate("sidebar.customer.appointments.completed"),
      type: `${staticEnums.AppointmentStatus.Completed}`,
    },
    {
      label: translate("sidebar.customer.appointments.cancelled"),
      type: `${staticEnums.AppointmentStatus.Cancelled}`,
    },
  ];

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

  return (
    <div className="flex items-center justify-between z-50">
      <h1 className={`text-2xl font-medium text-[#222B45]`}>
        {translate("sidebar.customer.appointments.appointment")}
      </h1>
      <div className="flex items-center gap-x-2">
        <div className="hidden maxSize:flex items-center gap-[14px]">
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
        <InputField
          handleChange={handleInputChange}
          ref={inputRef}
          value={inputValue}
          iconDisplay={true}
          onEnterPress={onEnterPress}
          textClassName="w-[177px]"
        />

        {/* <div className="block xlg:hidden z-50">
          <SelectField
            handleChange={(value) => hanldeFilterStatus(value)}
            value=""
            options={[
              {
                label: translate("sidebar.customer.appointments.pending"),
                value: `${staticEnums.AppointmentStatus.Pending}`,
              },
              {
                label: translate("sidebar.customer.appointments.completed"),
                value: `${staticEnums.AppointmentStatus.Completed}`,
              },
              {
                label: translate("sidebar.customer.appointments.cancelled"),
                value: `${staticEnums.AppointmentStatus.Cancelled}`,
              },
            ]}
            label={translate("sidebar.customer.appointments.pending")}
            containerClassName="min-w-fit"
            dropdownClassName="w-fit"
          />
        </div> */}
        <SelectField
          handleChange={(value) => hanldeSortChange(value)}
          value=""
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
          containerClassName="min-w-fit"
        />
      </div>
    </div>
  );
}
