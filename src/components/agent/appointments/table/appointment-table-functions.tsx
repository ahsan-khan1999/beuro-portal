import React from "react";
import { FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import AppointmentsFilter from "./appointments-filters";
import AppointmentsTabletFilters from "./appointment-tablet-filters";
import AppointmentsMobileFilters from "../mobile/appointment-mobile-filters";

export const AppointmentTableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
  isAgent,
}: FiltersComponentProps) => {
  const { t: translate } = useTranslation();

  return (
    <div
      className={`flex flex-col ${
        !isAgent &&
        "xMaxProLarge:flex-row justify-between xMaxProLarge:items-center"
      }  gap-y-3 mb-4`}
    >
      <h1
        className={`text-2xl font-medium text-[#222B45] ${
          !isAgent ? "block" : "hidden"
        }`}
      >
        {translate("sidebar.customer.appointments.appointment")}
      </h1>

      {isAgent ? (
        <>
          {isAgent && (
            <div className="hidden xMini:block">
              <AppointmentsTabletFilters
                filter={filter}
                setFilter={setFilter}
                handleFilterChange={handleFilterChange}
                isAgent={isAgent}
              />
            </div>
          )}
          {!isAgent && (
            <div className="hidden mlg:block">
              <AppointmentsFilter
                filter={filter}
                setFilter={setFilter}
                handleFilterChange={handleFilterChange}
                isAgent={isAgent}
              />
            </div>
          )}

          <div className="block xMini:hidden">
            <AppointmentsMobileFilters
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
