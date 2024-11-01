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
import { useAppSelector } from "@/hooks/useRedux";
import BooleanSelectField from "@/base-components/filter/fields/boolean-select-field";

export default function ContractFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const { sort, noteType, emailStatus } = router.query as any;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { noteSettings } = useAppSelector((state) => state.settings);
  const queryTask = router.query.isTaskCreated;

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

  const hanldeMailStatus = (value?: string) => {
    const updatedQuery = { ...router.query };

    if (value === "None") {
      delete updatedQuery.emailStatus;
    } else {
      updatedQuery.emailStatus = String(value);
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
      const updatedFilter = { ...prev, ["emailStatus"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  const hanldeTaskFilter = (value?: boolean) => {
    const updatedQuery = { ...router.query };

    if (value === undefined) {
      delete updatedQuery.isTaskCreated;
    } else {
      updatedQuery.isTaskCreated = String(value);
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
      const updatedFilter = { ...prev, ["isTaskCreated"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex flex-col xMaxProLarge:flex-row xMaxProLarge:items-center w-full xl:w-fit gap-4 z-10">
      <div className="flex gap-[14px]">
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
      <div className="flex flex-col xlg:flex-row xlg:items-center gap-3">
        <div className="flex items-center gap-3 z-20  flex-wrap">
          <BooleanSelectField
            handleChange={(value) => hanldeTaskFilter(value)}
            value={
              queryTask === "true"
                ? true
                : queryTask === "false"
                ? false
                : undefined
            }
            options={[
              {
                label: "calendar.main_heading",
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

        <div className="flex items-center gap-3 flex-wrap">
          <SelectField
            handleChange={(value) => handleNoteType(value)}
            value={noteType || "None"}
            dropDownIconClassName=""
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
          <SelectField
            handleChange={(value) => hanldeMailStatus(value)}
            value={emailStatus || "None"}
            options={[
              {
                label: "offers.card_content.email_status",
                value: "None",
              },
              {
                label: "email_status.Pending",
                value: `${staticEnums.EmailStatus.Pending}`,
              },
              {
                label: "email_status.Sent",
                value: `${staticEnums.EmailStatus.Sent}`,
              },
              {
                label: "email_status.Post",
                value: `${staticEnums.EmailStatus.Post}`,
              },
              {
                label: "email_status.Failed",
                value: `${staticEnums.EmailStatus.Failed}`,
              },
            ]}
            containerClassName="w-[175px]"
            labelClassName="w-[175px]"
          />

          <ContractFilter
            filter={filter}
            setFilter={setFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}
