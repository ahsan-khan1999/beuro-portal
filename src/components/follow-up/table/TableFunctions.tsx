import React, { SetStateAction } from "react";
import FollowUpFilter from "./follow-up-filter";
import { FilterType } from "@/types";

export interface FollowUpProps {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (text: FilterType) => void;
}

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: FollowUpProps) => {
  return (
    <div className="flex items-center mb-5 space-x-10">
      <h1 className="text-xl font-medium text-[#222B45]">
        {translate("follow_up.all_follow_ups.heading")}
      </h1>

      <FollowUpFilter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
