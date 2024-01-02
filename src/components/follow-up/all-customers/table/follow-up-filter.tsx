import InputField from "@/base-components/filter/fields/input-field";
import useFilter from "@/hooks/filter/hook";
import { FilterType } from "@/types";
import React, { SetStateAction } from "react";

export default function AllCustomersFilter({ filter, setFilter }: { filter: FilterType, setFilter: SetStateAction<any> }) {
  //@ts-expect-error
  const { } = useFilter(filter, setFilter);
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
