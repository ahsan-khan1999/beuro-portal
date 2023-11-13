import InputField from "@/base-components/filter/fields/input-field";
import useFilter from "@/hooks/filter/hook";
import React from "react";

export default function AllLeadsFilter() {
  const { filter, setFilter } = useFilter();
  return (
    <div className="flex">
      <InputField
        handleChange={(value) => setFilter({ ...filter, ["text"]: value })}
        value={filter.text}
        iconDisplay={true}
        bgColor={true}
      />
    </div>
  );
}
