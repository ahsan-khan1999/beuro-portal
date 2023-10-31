import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import React, { useState } from "react";
interface Status {
  open: boolean;
  close: boolean;
  expired: boolean;
}
export default function LeadsFilter() {
  const [filter, setFilter] = useState<Status>({
    open: false,
    close: false,
    expired: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex">
      <CheckField
        // options={["open 1", "close", "expire"]}
        filter={filter}
        setFilter={setFilter}
        type={"open"}
        label="Open Leads"
      />
      <CheckField
        // options={["open 1", "close", "expire"]}
        filter={filter}
        setFilter={setFilter}
        type={"close"}
        label="Close Leads"
      />
      <CheckField
        // options={["open 1", "close", "expire"]}
        filter={filter}
        setFilter={setFilter}
        type={"expire"}
        label="Expire Leads"
      />
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
