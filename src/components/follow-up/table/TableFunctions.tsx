import React, { SetStateAction } from "react";
import FollowUpFilter from "./follow-up-filter";
import { FilterType } from "@/types";
import { useTranslation } from "next-i18next";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: () => void;
}) => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex items-center mb-5 space-x-10">
      <h1 className="text-xl text-[#222B45] font-normal">
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
