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
        options={["Weekly", "Monthly", "Yearly"]}
        label="Monthly"
        containerClassName="bg-white w-[105px] h-8 rounded-[7px] border border-[#8F8F8F80]"
      />
      <SelectField
        handleChange={(value) => console.log(value)}
        value=""
        dropDownIconClassName=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]}
        label="February"
        containerClassName="bg-white w-[105px] h-8 rounded-[7px] border border-[#8F8F8F80]"
      />
    </div>
  );
}
