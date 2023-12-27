import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FiltersComponentProps } from "@/types";
import LeadsFilter from "@/base-components/filter/leads-filter";
import React from "react";
import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { useRouter } from "next/router";
import useFilter from "@/hooks/filter/hook";
import { useTranslation } from "next-i18next";
import ServicesFilter from "@/base-components/filter/services-filter";

export default function ServicesFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {

  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <div className="flex items-center space-x-4">
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
      <ServicesFilter filter={filter} setFilter={setFilter} />
      <Button
        id="apply"
        inputType="button"
        text="Apply"
        onClick={() => handleFilterChange()}
        className="flex items-center gap-x-2 py-2 !h-fit px-[10px]  text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
      />

      <Button
        inputType="button"
        onClick={() => router.push("/services/add")}
        className="flex items-center gap-x-2 py-2 !h-fit px-[10px] text-[13px] font-semibold hover:bg-[#7B18FF] bg-primary text-white rounded-md whitespace-nowrap"
        icon={addIcon}
        text={translate("services.add_button")}
        id="add"
      />
    </div>
  );
}
