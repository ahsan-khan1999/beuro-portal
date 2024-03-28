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
import { staticEnums } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";

export default function LeadsFilter({
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
    <div className="flex flex-col xMaxProLarge:flex-row xMaxProLarge:items-center w-full xl:w-fit gap-4 z-10">
      <div className="flex items-center gap-[14px]">
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
      <div className="flex flex-col xMaxSize:flex-row xMaxSize:items-center gap-4">
        <InputField
          handleChange={handleInputChange}
          ref={inputRef}
          value={inputValue}
          iconDisplay={false}
          onEnterPress={onEnterPress}
        />
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
            />
            <div className="flex items-center gap-x-3">
              <span className="text-[#4B4B4B] font-semibold text-base">
                {translate("global_search.notes")}
              </span>
              <SelectField
                handleChange={() => {}}
                value=""
                dropDownIconClassName=""
                containerClassName="w-[225px]"
                labelClassName="w-[225px]"
                options={[
                  {
                    value: "All Notes",
                    label: `${translate("add_note_dropdown.all_notes")}`,
                  },
                  {
                    value: "Sending pictures",
                    label: `${translate("add_note_dropdown.sending_picture")}`,
                  },
                  {
                    value: "Viewing date",
                    label: `${translate("add_note_dropdown.view_date")}`,
                  },
                  {
                    value: "Approximate Offer open",
                    label: `${translate(
                      "add_note_dropdown.approximate_offer_open"
                    )}`,
                  },
                  {
                    value: "Will contact us",
                    label: `${translate("add_note_dropdown.contact_us")}`,
                  },
                  {
                    value: "Individual Note",
                    label: `${translate("add_note_dropdown.individual_note")}`,
                  },
                ]}
                label={translate("add_note_dropdown.all_notes")}
              />
            </div>
            <LeadsFilters
              filter={filter}
              setFilter={setFilter}
              onFilterChange={handleFilterChange}
            />
          </div>

          <Button
            inputType="button"
            onClick={() => router.push("/leads/add")}
            className="gap-x-2 !h-fit py-2 mt-0 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap w-fit"
            icon={addIcon}
            text={translate("leads.add_button")}
            id="add"
            iconAlt="add button"
          />
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
