import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxFilterProps, Status } from "@/types/global";
import React, { useState } from "react";

export default function OffersFilters() {
  const [checkboxFilter, setCheckBoxFilter] = useState<Status>({
    open: true,
    signed: false,
    expired: false,
    rejected: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const checkbox:CheckBoxFilterProps[] = [
    { label: "Open", type: "open" },
    { label: "Signed", type: "signed" },
    { label: "Expired", type: "expired" },
    { label: "Rejected", type: "rejected" },
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
