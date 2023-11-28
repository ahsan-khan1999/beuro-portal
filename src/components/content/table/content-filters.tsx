import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FilterType } from "@/types";
import React, { SetStateAction, useState } from "react";

export default function ContentFilters({ filter, setFilter }: { filter: FilterType, setFilter: SetStateAction<any> }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <div className="flex items-center space-x-4">
        <InputField handleChange={(value) => setFilter({ ...filter, text: value })} value={filter?.text} />
        <SelectField
          handleChange={(value) => setFilter({ ...filter, sortBy: value })}
          value={filter?.sortBy || ""}
          dropDownIconClassName=""
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          options={["Date", "Latest", "Oldest", "A - Z", "Expiring Soon"]}
          label="Sort By"
        />
      </div>
    </div>
  );
}
