import LeadsFilters from "@/base-components/filter/leads-filter";
import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import useFilter from "@/hooks/filter/hook";
import { CheckBoxType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { Button } from "@/base-components/ui/button/button";

export default function LeadsFilter({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const { t: translate } = useTranslation();
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(false);
  const checkbox: CheckBoxType[] = [
    { label: translate("leads.table_functions.open"), type: "open" },
    { label: translate("leads.table_functions.close"), type: "close" },
    { label: translate("leads.table_functions.expire"), type: "expire" },
  ];
  const {
    isOpen,
    toggleHandler,
    moreFilter,
    setMoreFilter,
    handleFilterResetToInitial,
    handleFilterReset,
    // handleItemSelected,
    
    typeList,
  } = useFilter({ filter, setFilter });

  return (
    <div className="flex flex-col maxSize:flex-row maxSize:items-center w-full xl:w-fit gap-4">
      <div className="flex gap-[14px]">
        {checkbox.map((item, idx) => (
          <CheckField
            checkboxFilter={filter}
            setCheckBoxFilter={setFilter}
            type={"status"}
            label={item.label}
            value={item.type}
          />
        ))}
      </div>
      <div className="flex gap-x-4">
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
        <LeadsFilters
          filter={filter}
          setFilter={setFilter}
          moreFilter={moreFilter}
          setMoreFilter={setMoreFilter}
          handleFilterResetToInitial={handleFilterResetToInitial}
          handleFilterReset={handleFilterReset}
          // handleItemSelected={handleItemSelected}
          typeList={typeList}
        />
        <Button
          id="apply"
          inputType="button"
          text="Apply"
          onClick={() => handleFilterChange(filter)}
          className="!h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
        />

        <Button
          inputType="button"
          onClick={() => router.push("/leads/add")}
          className="gap-x-2 !h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
          icon={addIcon}
          text="Add New"
          id="add"
        />
      </div>
    </div>
  );
}
