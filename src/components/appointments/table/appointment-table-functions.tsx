import React from "react";
import { AppointmentTableFunction, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import AppointmentsFilter from "./appointments-filter";

export const AppointmentTableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
  onDateChange,
}: AppointmentTableFunction) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex flex-col maxLarge:flex-row justify-between maxLarge:items-center gap-y-3 mb-4">
      <h1 className="text-2xl font-medium text-[#222B45]">
        {translate("sidebar.customer.appointments.appointment")}
      </h1>
      <AppointmentsFilter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
        onDateChange={onDateChange}
      />
    </div>
  );
};
