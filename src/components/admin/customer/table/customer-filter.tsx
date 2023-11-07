import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxType } from "@/types";
import { Status } from "@/types/global";
import React, { useState } from "react";

export default function CustomerFilter() {
  const [checkboxFilter, setCheckBoxFilter] = useState<Status>({
    active: true,
    blocked: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const checkbox: CheckBoxType[] = [
    { label: "Active", type: "active" },
    { label: "Blocked", type: "blocked" },
  ];
  return (
    <div className="flex space-x-4">
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
  );
}