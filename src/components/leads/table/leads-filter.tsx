import DetailFilter from "@/base-components/filter/detail-filter";
import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import useFilter from "@/hooks/filter/hook";
import { CheckBoxType, FilterType } from "@/types";
import React, { SetStateAction, useState } from "react";

export default function LeadsFilter({ filter, setFilter }: { filter: FilterType, setFilter: SetStateAction<any> }) {

  // const [isOpen, setIsOpen] = useState(false);
  const checkbox: CheckBoxType[] = [
    { label: "Open Leads", type: "open" },
    { label: "Close Leads", type: "close" },
    { label: "Expire Leads", type: "expire" },
  ];
  const { isOpen, setIsOpen, moreFilter, setMoreFilter, handleFilterResetToInitial, handleFilterReset, handleItemSelected, typeList } = useFilter({ filter, setFilter })

  return (
    <div className="flex">
      <div className="flex items-center space-x-4">
        {checkbox.map((item, idx) => (
          <CheckField
            checkboxFilter={filter}
            setCheckBoxFilter={setFilter}
            type={"status"}
            label={item.label}
            value={item.type}
          />
        ))}
        <InputField handleChange={(value) => setFilter({ ...filter, "text": value })} value={filter.text} />
        <SelectField
          handleChange={(value) => setFilter({ ...filter, "sortBy": value })}
          value=""
          dropDownIconClassName=""
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          options={["Date", "Latest", "Oldest", "A - Z", "Expiring Soon"]}
          label="Sort By"
        />
        <DetailFilter
          filter={filter}
          setFilter={setFilter}
          moreFilter={moreFilter}
          setMoreFilter={setMoreFilter}
          handleFilterResetToInitial={handleFilterResetToInitial}
          handleFilterReset={handleFilterReset}
          handleItemSelected={handleItemSelected}
          typeList={typeList}
        />
      </div>
    </div>
  );
}
