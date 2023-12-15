import InputField from "@/base-components/filter/fields/input-field";
import { Button } from "@/base-components/ui/button/button";
import useFilter from "@/hooks/filter/hook";
import { FilterType } from "@/types";
import React, { SetStateAction } from "react";

export default function FollowUpFilter({ filter, setFilter, handleFilterChange }: { filter: FilterType, setFilter: SetStateAction<any>, handleFilterChange: () => void }) {
  //@ts-expect-error
  const { handleFilterReset } = useFilter(filter, setFilter);
  return (
    <div className="flex">
      <InputField
        handleChange={(value) => setFilter({ ...filter, ["text"]: value })}
        value={filter.text}
        iconDisplay={false}
        bgColor={true}
      />
      <Button
        text="Apply"
        id="Apply"
        inputType="submit"
        onClick={handleFilterChange}
        className="!h-[36px]  px-5 flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
      />

    </div>
  );
}
