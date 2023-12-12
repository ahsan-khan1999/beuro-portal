import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import React, { useState } from "react";

export default function EmailTrackerFilters() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex">
      <div className="flex items-center space-x-4">
        <InputField handleChange={(value) => console.log(value)} value="" />
        <SelectField
          handleChange={(value) => console.log(value)}
          value=""
          dropDownIconClassName=""
          isOpen={isOpen}
          setIsOpen={toggleHandler}
          options={["1", "2", "2", "2", "2"]}
          label="Sort By"
        />
      </div>
    </div>
  );
}
