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
import { useAppSelector } from "@/hooks/useRedux";

export default function AppointmentsFilter({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { noteSettings } = useAppSelector((state) => state.settings);

  useEffect(() => {
    const queryText = router.query.text;
    const textValue = Array.isArray(queryText) ? queryText[0] : queryText;
    setInputValue(textValue || "");
  }, [router.query.text, router.query.today]);

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

    if (router?.query?.today) {
      delete router?.query?.today;
    }
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

    if (value === undefined) {
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

  const hanldeNoteType = (value?: string) => {
    const updatedQuery = { ...router.query };

    if (value === undefined) {
      delete updatedQuery.noteType;
    } else {
      updatedQuery.noteType = String(value);
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
      const updatedFilter = { ...prev, ["noteType"]: value };
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
        <InputField
          handleChange={handleInputChange}
          ref={inputRef}
          value={inputValue}
          iconDisplay={true}
          onEnterPress={onEnterPress}
        />
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-x-4">
            <SelectField
              handleChange={(value) => hanldeSortChange(value)}
              value={
                Array.isArray(router.query.sort)
                  ? router.query.sort[0]
                  : router.query.sort
              }
              options={[
                {
                  label: "common.sort_button",
                  value: undefined,
                },
                {
                  label: "filters.sort_by.date",
                  value: "date",
                },
                {
                  label: "filters.sort_by.latest",
                  value: "-date",
                },
                {
                  label: "filters.sort_by.oldest",
                  value: "date",
                },
                {
                  label: "filters.sort_by.a_z",
                  value: "customerDetail.fullName",
                },
              ]}
              containerClassName="w-[120px]"
              labelClassName="w-[120px]"
            />
            <div className="flex items-center gap-x-3">
              <span className="text-[#4B4B4B] font-semibold text-base">
                {translate("global_search.notes")}
              </span>
              <SelectField
                handleChange={(value) => hanldeNoteType(value)}
                value=""
                dropDownIconClassName=""
                containerClassName="w-[225px]"
                labelClassName="w-[225px]"
                options={
                  noteSettings
                    ? noteSettings
                        .slice()
                        .reverse()
                        .map((item) => ({
                          label: item.notes.noteType,
                          value: item.notes.noteType,
                        }))
                    : []
                }
                label={translate("add_note_dropdown.all_notes")}
              />
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <LeadsFilters
              filter={filter}
              setFilter={setFilter}
              onFilterChange={handleFilterChange}
            />
            {/* <Button
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
            /> */}
          </div>
        </div>

        {/* <Button
          id="apply"
          inputType="button"
          text="Apply"
          onClick={() => handleFilterChange()}
          className="!h-fit py-2 px-[10px] mt-0 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        /> */}
      </div>
    </div>
  );
}
