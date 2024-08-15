import LeadsFilters from "@/base-components/filter/leads-filter";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { Button } from "@/base-components/ui/button/button";
import { DEFAULT_LEAD, staticEnums } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";
import { useAppDispatch } from "@/hooks/useRedux";
import { setLeadDetails } from "@/api/slices/lead/leadSlice";

export default function TabletLeadsFilter({
  filter,
  setFilter,
  handleFilterChange,
  isAgent,
}: FiltersComponentProps) {
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

  return (
    <div className="flex xMd:hidden items-center justify-between w-full z-10">
      <h1 className="text-2xl font-medium text-[#222B45]">Leads</h1>

      <div className="flex items-center">
        <SelectField
          handleChange={(value) => hanldeSortChange(value)}
          value=""
          options={[
            {
              label: translate("leads.table_functions.open"),
              value: `${staticEnums.LeadStatus.Open}`,
            },
            {
              label: translate("leads.table_functions.inProcess"),
              value: `${staticEnums.LeadStatus.InProcess}`,
            },
            {
              label: translate("leads.table_functions.close"),
              value: `${staticEnums.LeadStatus.Close}`,
            },
            {
              label: translate("leads.table_functions.expire"),
              value: `${staticEnums.LeadStatus.Expired}`,
            },
          ]}
          label={translate("leads.table_functions.open")}
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
        />

        <LeadsFilters
          filter={filter}
          setFilter={setFilter}
          onFilterChange={handleFilterChange}
        />
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
