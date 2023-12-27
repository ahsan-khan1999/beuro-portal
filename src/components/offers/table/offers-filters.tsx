import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import useFilter from "@/hooks/filter/hook";
import { CheckBoxType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import OfferFilter from "@/base-components/filter/offer-filter";

export default function OffersFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const { t: translate } = useTranslation();
  const router = useRouter();

  const checkbox: CheckBoxType[] = [
    { label: translate("offers.table_functions.open"), type: "open" },
    { label: translate("offers.table_functions.signed"), type: "signed" },
    { label: translate("offers.table_functions.expire"), type: "expire" },
    { label: translate("offers.table_functions.rejected"), type: "rejected" },
  ];

  return (
    <div className="flex flex-col maxSize:flex-row maxSize:items-center w-full xl:w-fit gap-4">
      <div className="flex gap-[14px]">
        {checkbox.map((item, idx) => (
          <CheckField
            key={idx}
            checkboxFilter={filter}
            setCheckBoxFilter={setFilter}
            type={"status"}
            label={item.label}
            value={item.type}
            onChange={(value, isChecked) => {
              setFilter((prev: any) => {
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
                return { ...prev, status: updatedStatus };
              });
            }}
          />
        ))}
      </div>
      <div className="flex gap-[14px] items-center">
        <InputField
          handleChange={(value) => setFilter({ ...filter, text: value })}
          value={filter.text}
        />
        <SelectField
          handleChange={(value) => setFilter({ ...filter, sortBy: value })}
          value=""
          dropDownIconClassName=""
          options={["Date", "Latest", "Oldest", "A - Z", "Expiring Soon"]}
          label="Sort By"
        />
        <OfferFilter filter={filter} setFilter={setFilter} />
        <Button
          id="apply"
          inputType="button"
          text="Apply"
          onClick={() => handleFilterChange()}
          className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        />

        <Button
          inputType="button"
          onClick={() => router.push("/offers/add")}
          className="gap-x-2 !h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
          icon={addIcon}
          text="Add New"
          id="add"
        />
      </div>
    </div>
  );
}
