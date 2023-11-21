import InputField from "@/base-components/filter/fields/input-field";
import { Button } from "@/base-components/ui/button/button";
import useFilter from "@/hooks/filter/hook";
import { FilterType } from "@/types";
import React, { SetStateAction } from "react";

export default function FollowUpFilter({ filter, setFilter }: { filter: FilterType, setFilter: SetStateAction<any> }) {
  //@ts-expect-error
  const { handleFilterChange } = useFilter(filter, setFilter);
  return (
    <div className="flex">
      <InputField
        handleChange={(value) => setFilter({ ...filter, ["text"]: value })}
        value={filter.text}
        iconDisplay={true}
        bgColor={true}
      />
      <Button
        text="Apply"
        id="Apply"
        inputType="submit"
        onClick={() => handleFilterChange(filter)}
        className="!h-[36px]  px-5 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
      />

    </div>
  );
}
