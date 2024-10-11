import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import {
  AppointmentTableFunction,
  CheckBoxType,
  FilterType,
  FiltersComponentProps,
} from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { Button } from "@/base-components/ui/button/button";
import { DEFAULT_LEAD, staticEnums } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";
import { useAppDispatch } from "@/hooks/useRedux";
import { setLeadDetails } from "@/api/slices/lead/leadSlice";
import CheckField from "@/base-components/filter/fields/check-field";
import BooleanSelectField from "@/base-components/filter/fields/boolean-select-field";
import { CustomDatePciker } from "@/base-components/ui/custom-date-picker";

export default function TabletLeadsFilter({
  filter,
  setFilter,
  handleFilterChange,
  isAgent,
  currentDate,
  onDateChange,
}: AppointmentTableFunction) {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();

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

  // const hanldeStatusChange = (value: string) => {
  //   router.push(
  //     {
  //       pathname: router.pathname,
  //       query: {
  //         ...router.query,
  //         status: value,
  //       },
  //     },
  //     undefined,
  //     { shallow: false }
  //   );

  //   setFilter((prev: FilterType) => {
  //     const updatedFilter = { ...prev, ["status"]: value };
  //     handleFilterChange(updatedFilter);
  //     return updatedFilter;
  //   });
  // };

  const checkbox: CheckBoxType[] = [
    {
      label: translate("leads.table_functions.open"),
      type: `${staticEnums.LeadStatus.Open}`,
    },
    {
      label: translate("leads.table_functions.inProcess"),
      type: `${staticEnums.LeadStatus.InProcess}`,
    },
    {
      label: translate("leads.table_functions.close"),
      type: `${staticEnums.LeadStatus.Close}`,
    },
    {
      label: translate("leads.table_functions.expire"),
      type: `${staticEnums.LeadStatus.Expired}`,
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

  const hanldeAppointmentFilter = (value: boolean) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          isAppointmentCreated: value,
        },
      },
      undefined,
      { shallow: false }
    );

    setFilter((prev: FilterType) => {
      const updatedFilter = { ...prev, ["isAppointmentCreated"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex flex-col xLarge:flex-row xMd:hidden xLarge:items-center justify-between w-full z-10 gap-y-4">
      <h1 className="text-2xl font-medium text-[#222B45]">Leads</h1>

      <div className="flex flex-col xLarge:flex-row xLarge:items-center gap-1 mlg:gap-4">
        <div className="hidden xlg:flex items-center gap-[14px]">
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
          <BooleanSelectField
            handleChange={(value) => hanldeAppointmentFilter(value)}
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
            label={translate("leads.lead_dropdown_status.Appointment")}
            containerClassName="w-[140px]"
            labelClassName="w-[140px]"
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
          <div className="w-fit">
            <CustomDatePciker
              id="today"
              name="today"
              value={currentDate}
              onInputChange={onDateChange}
            />
          </div>
        </div>

        {!isAgent && (
          <Button
            inputType="button"
            onClick={() => {
              dispatch(setLeadDetails(DEFAULT_LEAD));
              router.push("/leads/add");
            }}
            className="gap-x-2 !h-fit py-2 mt-0 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap w-fit"
            icon={addIcon}
            text={translate("leads.add_button")}
            id="add"
            iconAlt="add button"
          />
        )}
      </div>
    </div>
  );
}
