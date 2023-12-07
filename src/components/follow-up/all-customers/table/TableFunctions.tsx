import React, { SetStateAction } from "react";
import AllCustomersFilter from "./follow-up-filter";
import { FilterType } from "@/types";
import { useTranslation } from "next-i18next";

const TableFunctions = ({ filter, setFilter }: { filter: FilterType, setFilter: SetStateAction<any> }) => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex  items-center mb-5 space-x-10">
      <h1 className="text-xl text-[#222B45] font-normal">{translate("follow_up.all_customer_details.heading")}</h1>

      <AllCustomersFilter filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default TableFunctions;
