import React from "react";
import LeadsFilter from "./leads-filter";
import { AppointmentTableFunction } from "@/types";
import TabletLeadsFilter from "./tablet-leads-filter";
import MobileLeadsFilters from "@/components/agent/leads/mobile/mobile-leads-filter";

export const LeadsTableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
  isAgent,
  currentDate,
  onDateChange,
}: AppointmentTableFunction) => {
  return (
    <div
      className={`flex flex-col ${
        !isAgent &&
        "xMaxProLarge:flex-row justify-between xMaxProLarge:items-center"
      } gap-y-3 mb-4`}
    >
      <h1
        className={`text-2xl font-medium text-[#222B45] ${
          !isAgent ? "block" : "hidden"
        }`}
      >
        Leads
      </h1>

      {isAgent ? (
        <>
          {isAgent && (
            <div className="hidden xMini:block">
              <TabletLeadsFilter
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
              <LeadsFilter
                filter={filter}
                setFilter={setFilter}
                handleFilterChange={handleFilterChange}
                isAgent={isAgent}
              />
            </div>
          )}

          <div className="block xMini:hidden">
            <MobileLeadsFilters
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
        <LeadsFilter
          filter={filter}
          setFilter={setFilter}
          handleFilterChange={handleFilterChange}
          isAgent={isAgent}
        />
      )}
    </div>
  );
};
