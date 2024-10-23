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
  const router = useRouter();
  const { sort } = router.query as any;
  const { t: translate } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const queryOffer = router.query.isOfferCreated;

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

  const hanldeOfferFilter = (value?: boolean) => {
    const updatedQuery = { ...router.query };

    if (value === undefined) {
      delete updatedQuery.isOfferCreated;
    } else {
      updatedQuery.isOfferCreated = String(value);
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
      const updatedFilter = { ...prev, ["isOfferCreated"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex flex-col maxLarge:flex-row maxLarge:items-center w-full xl:w-fit gap-4 z-10">
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
            value={
              queryOffer === "true"
                ? true
                : queryOffer === "false"
                ? false
                : undefined
            }
            options={[
              {
                label: "appointments.table_headings.offer_status",
                value: undefined,
              },
              {
                label: "leads.created",
                value: true,
              },
              {
                label: "leads.not_created",
                value: false,
              },
            ]}
            containerClassName="w-[170px]"
            labelClassName="w-[170px]"
          />
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
          <LeadsFilters
            filter={filter}
            setFilter={setFilter}
            onFilterChange={handleFilterChange}
            containerClassName="z-0"
          />
        </div>
        {/* <div className="flex flex-col lg:flex-row lg:items-center gap-4">
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
        </div> */}
      </div>
    </div>
  );
}
