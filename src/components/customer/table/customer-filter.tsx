import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import React, { useState } from "react";

export default function CustomerFilter() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex">
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
