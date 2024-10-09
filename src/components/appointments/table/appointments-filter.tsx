import LeadsFilters from "@/base-components/filter/leads-filter";
import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxType, FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { staticEnums } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";
import BooleanSelectField from "@/base-components/filter/fields/boolean-select-field";

export default function AppointmentsFilter({
  filter,
  setFilter,
  handleFilterChange,
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

  const hanldeOfferFilter = (value: boolean) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          isOfferCreated: value,
        },
      },
      undefined,
      { shallow: false }
    );

    setFilter((prev: FilterType) => {
      const updatedFilter = { ...prev, ["isOfferCreated"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex flex-col xMaxProLarge:flex-row xMaxProLarge:items-center w-full xl:w-fit gap-4 z-10">
      <div className="flex items-center gap-[14px]">
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
      <div className="flex flex-col xMaxSize:flex-row xMaxSize:items-center gap-4">
        <div className="flex items-center gap-x-4">
          <BooleanSelectField
            handleChange={(value) => hanldeOfferFilter(value)}
            value=""
            options={[
              {
                label: `${translate("leads.created")}`,
                value: true,
              },
              {
                label: `${translate("leads.not_created")}`,
                value: false,
              },
            ]}
            label={translate("appointments.table_headings.offer_status")}
            containerClassName="w-[160px]"
            labelClassName="w-[160px]"
          />
          <InputField
            handleChange={handleInputChange}
            ref={inputRef}
            value={inputValue}
            iconDisplay={true}
            onEnterPress={onEnterPress}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-x-4">
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
            <LeadsFilters
              filter={filter}
              setFilter={setFilter}
              onFilterChange={handleFilterChange}
              containerClassName="z-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
