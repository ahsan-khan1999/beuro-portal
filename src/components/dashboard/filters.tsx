import SelectField from "@/base-components/filter/fields/select-field";
import React, { useState } from "react";

export default function DashboardFilters() {
  const [isOpen, setIsOpen] = useState("");
  return (
    <div className="flex space-x-4">
      <SelectField
        handleChange={(value) => console.log(value)}
        value=""
        dropDownIconClassName=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={["1", "2", "2", "2", "2"]}
        label="Monthly"
      />
      <SelectField
        handleChange={(value) => console.log(value)}
        value=""
        dropDownIconClassName=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={["1", "2", "2", "2", "2"]}
        label="February"
      />
    </div>
  );
}
