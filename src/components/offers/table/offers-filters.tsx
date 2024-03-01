import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import useFilter from "@/hooks/filter/hook";
import { CheckBoxType, FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import OfferFilter from "@/base-components/filter/offer-filter";
import { staticEnums } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";

export default function OffersFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const checkbox: CheckBoxType[] = [
    {
      label: translate("offers.table_functions.open"),
      type: `${staticEnums.OfferStatus.Open}`,
    },
    {
      label: translate("offers.table_functions.signed"),
      type: `${staticEnums.OfferStatus.Accepted}`,
    },
    {
      label: translate("offers.table_functions.expire"),
      type: `${staticEnums.OfferStatus.Expired}`,
    },
    {
      label: translate("offers.table_functions.rejected"),
      type: `${staticEnums.OfferStatus.Rejected}`,
    },
  ];

  // const handleStatusChange = (value: string, isChecked: boolean) => {
  //   setFilter((prev: FilterType) => {
  //     const updatedStatus = prev.status ? [...prev.status] : [];
  //     if (isChecked) {
  //       if (!updatedStatus.includes(value)) {
  //         updatedStatus.push(value);
  //       }
  //     } else {
  //       const index = updatedStatus.indexOf(value);
  //       if (index > -1) {
  //         updatedStatus.splice(index, 1);
  //       }
  //     }
  //     const status = updatedStatus.length > 0 ? updatedStatus : "";
  //     const updatedFilter = { ...prev, status: status };
  //     handleFilterChange(updatedFilter);
  //     return updatedFilter;
  //   });
  // };

  const handleStatusChange = (value: string, isChecked: boolean) => {
    setFilter((prev: FilterType) => {
      const updatedStatus = prev.status ? [...prev.status] : [];
      if (isChecked) {
        if (!updatedStatus.includes(value)) {
          updatedStatus.push(value);
        }
      } else {
        const index = updatedStatus.indexOf(value);
        if (index > -1) {
          updatedStatus.splice(index, 1);
        }
      }
      const status =
        updatedStatus.length > 0 ? updatedStatus : FiltersDefaultValues.None;
      const updatedFilter = { ...prev, status: status };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  const handleInputChange = (value: string) => {
    setFilter((prev: FilterType) => ({ ...prev, ["text"]: value }));
  };

  const hanldeSortChange = (value: string) => {
    setFilter((prev: FilterType) => {
      const updatedFilter = { ...prev, ["sort"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  const handlePressEnter = () => {
    let inputValue = inputRef?.current?.value;
    if (inputValue === "") {
      inputValue = FiltersDefaultValues.None;
    }
    setFilter((prev: FilterType) => {
      const updatedValue = { ...prev, ["text"]: inputValue };
      handleFilterChange(updatedValue);
      return updatedValue;
    });
  };

  return (
    <div className="flex flex-col xLarge:flex-row xLarge:items-center w-full xl:w-fit gap-4">
      <div className="flex gap-[14px]">
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
      <div className="flex gap-[14px] items-center">
        <InputField
          handleChange={(value) => {}}
          // value={filter?.text || ""}
          onEnterPress={handlePressEnter}
          ref={inputRef}
        />
        <SelectField
          handleChange={(value) => hanldeSortChange(value)}
          value=""
          dropDownIconClassName=""
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
              value: "leadID.customerDetail.fullName",
            },
          ]}
          label={translate("common.sort_button")}
        />
        <OfferFilter
          filter={filter}
          setFilter={setFilter}
          onFilterChange={handleFilterChange}
        />
        {/* <Button
          id="apply"
          inputType="button"
          text="Apply"
          onClick={() => handleFilterChange(filter)}
          className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        /> */}

        <Button
          inputType="button"
          onClick={() => router.push("/offers/add")}
          className="gap-x-2 !h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
          icon={addIcon}
          text={translate("offers.add_button")}
          id="add"
          iconAlt="add button"
        />
      </div>
    </div>
  );
}
