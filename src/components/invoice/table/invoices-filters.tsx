import DetailFilter from "@/base-components/filter/leads-filter";
import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import useFilter from "@/hooks/filter/hook";
import { CheckBoxType, FilterType } from "@/types";
import React, { SetStateAction } from "react";
import { Button } from "@/base-components/ui/button/button";
import InvoicesFilter from "@/base-components/filter/invoices-filter";

export default function InvoicesFilters({
  filter,
  setFilter,
  handleFilterChange,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (value: FilterType) => void;
}) {
  const checkbox: CheckBoxType[] = [
    { label: "Open", type: "open" },
    { label: "Overdue", type: "overdue" },
    { label: "Paid", type: "paid" },
  ];

  const {
    isOpen,
    toggleHandler,
    moreFilter,
    setMoreFilter,
    handleFilterResetToInitial,
    handleFilterReset,
    typeList,
  } = useFilter({ filter, setFilter });
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
          />
        ))}
      </div>

      <div className="flex gap-x-4">
        <InputField
          handleChange={(value) => setFilter({ ...filter, text: value })}
          value={filter?.text}
        />
        <SelectField
          handleChange={(value) => setFilter({ ...filter, sortBy: value })}
          value=""
          dropDownIconClassName=""
          options={["Date", "Latest", "Oldest", "A - Z", "Expiring Soon"]}
          label="Sort By"
        />
        <InvoicesFilter
          filter={filter}
          setFilter={setFilter}
          moreFilter={moreFilter}
          setMoreFilter={setMoreFilter}
          handleFilterResetToInitial={handleFilterResetToInitial}
          handleFilterReset={handleFilterReset}
          typeList={typeList}
        />

        <Button
          id="apply"
          inputType="button"
          text="Apply"
          onClick={() => handleFilterChange(filter)}
          className="!h-[40px] p-2  flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
        />
      </div>
    </div>
  );
}
