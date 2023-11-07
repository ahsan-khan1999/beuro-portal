import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxType } from "@/types";
import { Status } from "@/types/global";
import React, { useState } from "react";

export default function LeadsFilter() {
  const [checkboxFilter, setCheckBoxFilter] = useState<Status>({
    open: true,
    close: false,
    expired: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const checkbox:CheckBoxType[] = [
    { label: "Open Leads", type: "open" },
    { label: "Close Leads", type: "close" },
    { label: "Expire Leads", type: "expired" },
  ];
  return (
    <div className="flex">
      <div className="flex items-center space-x-4">
        {checkbox.map((item, idx) => (
          <CheckField
            checkboxFilter={checkboxFilter}
            setCheckBoxFilter={setCheckBoxFilter}
            type={item.type}
            label={item.label}
          />
        ))}
        <InputField handleChange={(value) => console.log(value)} value="" />
        <SelectField
          handleChange={(value) => console.log(value)}
          value=""
          dropDownIconClassName=""
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          options={["1", "2", "2", "2", "2"]}
          label="Sort By"
        />
      </div>
    </div>
  );
}
