import React from "react";
import { FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import AppointmentsFilter from "./appointments-filter";

const TableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex flex-col xMaxProLarge:flex-row justify-between xMaxProLarge:items-center gap-y-3 mb-4">
      <h1 className="text-2xl font-medium text-[#222B45]">
        {translate("sidebar.customer.appointments.appointment")}
      </h1>
      <AppointmentsFilter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TableFunctions;
