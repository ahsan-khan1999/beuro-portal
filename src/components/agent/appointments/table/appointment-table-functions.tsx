import React, { ChangeEvent, SetStateAction } from "react";
import { FilterType } from "@/types";
import { useTranslation } from "next-i18next";
import AppointmentsFilter from "./appointments-filters";
import AppointmentsTabletFilters from "./appointment-tablet-filters";
import AppointmentsMobileFilters from "../mobile/appointment-mobile-filters";

export interface AppointmentTableFunction {
  onDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  currentDate: string;
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (filter: FilterType) => void;
  isAgent?: boolean;
}

export const AppointmentTableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
  isAgent,
  currentDate,
  onDateChange,
}: AppointmentTableFunction) => {
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
                onDateChange={onDateChange}
                currentDate={currentDate}
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
              onDateChange={onDateChange}
              currentDate={currentDate}
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
