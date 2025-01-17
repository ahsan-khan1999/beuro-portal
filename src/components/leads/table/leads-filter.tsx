import LeadsFilters from "@/base-components/filter/leads-filter";
import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxType, FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { Button } from "@/base-components/ui/button/button";
import { DEFAULT_LEAD, staticEnums } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setLeadDetails } from "@/api/slices/lead/leadSlice";
import BooleanSelectField from "@/base-components/filter/fields/boolean-select-field";

export default function LeadsFilter({
  filter,
  setFilter,
  handleFilterChange,
  isAgent,
}: FiltersComponentProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { sort, noteType } = router.query as any;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { noteSettings } = useAppSelector((state) => state.settings);

  const queryAppointment = router.query.isAppointmentCreated;

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

  const handleNoteType = (value: string | undefined) => {
    const updatedQuery: { [key: string]: string | string[] | undefined } = {
      ...router.query,
    };

    if (value === "None") {
      delete updatedQuery.noteType;
    } else {
      updatedQuery.noteType = String(value);
    }

    updatedQuery.page = "1";

    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true }
    );

    setFilter((prev: FilterType) => {
      const updatedFilter = { ...prev, noteType: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  const hanldeAppointmentFilter = (value?: boolean) => {
    const updatedQuery = { ...router.query };

    if (value === undefined) {
      delete updatedQuery.isAppointmentCreated;
    } else {
      updatedQuery.isAppointmentCreated = String(value);
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
      const updatedFilter = { ...prev, ["isAppointmentCreated"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div
      className={`flex flex-col maxLargePro:flex-row maxLargePro:items-center w-full xl:w-fit gap-4 z-10`}
    >
      <div className="flex items-center gap-4">
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
        <div className="flex items-center gap-x-4 z-20">
          <BooleanSelectField
            handleChange={(value) => hanldeAppointmentFilter(value)}
            value={
              queryAppointment === "true"
                ? true
                : queryAppointment === "false"
                ? false
                : undefined
            }
            options={[
              {
                label: "sidebar.customer.appointments.appointment",
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
            containerClassName="w-[160px]"
            labelClassName="w-[160px]"
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
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {!isAgent && (
            <div className="flex items-center gap-x-3 z-10">
              <SelectField
                handleChange={(value) => handleNoteType(value)}
                value={noteType || "None"}
                containerClassName="w-[225px]"
                labelClassName="w-[225px]"
                options={[
                  { label: "add_note_dropdown.all_notes", value: "None" },
                  ...(noteSettings
                    ? noteSettings
                        ?.slice()
                        ?.reverse()
                        ?.map((item) => ({
                          label: item.notes.noteType,
                          value: item.notes.noteType,
                        }))
                    : []),
                ]}
              />
            </div>
          )}
          <div className="flex items-center gap-x-4">
            {!isAgent && (
              <LeadsFilters
                filter={filter}
                setFilter={setFilter}
                onFilterChange={handleFilterChange}
                containerClassName="!z-0"
              />
            )}
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
      </div>
    </div>
  );
}
