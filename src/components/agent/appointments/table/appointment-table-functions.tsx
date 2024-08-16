import React from "react";
import { FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import AppointmentsFilter from "./appointments-filter";
import AppointmentsTabletFilters from "./tablet-filters";

export const AppointmentTableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
  isAgent,
}: FiltersComponentProps) => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex flex-col xMaxProLarge:flex-row justify-between xMaxProLarge:items-center gap-y-3 mb-4">
      <h1
        className={`text-2xl font-medium text-[#222B45] ${
          isAgent ? "hidden mlg:block" : "block"
        }`}
      >
        {translate("sidebar.customer.appointments.appointment")}
      </h1>

      {isAgent ? (
        <>
          <div className="block mlg:hidden">
            <AppointmentsTabletFilters
              filter={filter}
              setFilter={setFilter}
              handleFilterChange={handleFilterChange}
              isAgent={isAgent}
            />
          </div>

          <div className="hidden mlg:block">
            <AppointmentsFilter
              filter={filter}
              setFilter={setFilter}
              handleFilterChange={handleFilterChange}
              isAgent={isAgent}
            />
          </div>
        </>
      ) : (
        <AppointmentsFilter
          filter={filter}
          setFilter={setFilter}
          handleFilterChange={handleFilterChange}
          isAgent={isAgent}
        />
      )}
    </div>
  );
};