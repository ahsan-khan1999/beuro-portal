import React from "react";
import LeadsFilter from "./leads-filter";
import { FiltersComponentProps } from "@/types";
import TabletLeadsFilter from "./tablet-leads-filter";
import MobileLeadsFilters from "@/components/agent/leads/mobile/mobile-leads-filter";

export const LeadsTableFunctions = ({
  filter,
  setFilter,
  handleFilterChange,
  isAgent,
}: FiltersComponentProps) => {
  return (
    <div className="flex flex-col xMaxProLarge:flex-row justify-between xMaxProLarge:items-center gap-y-3 mb-4">
      <h1
        className={`text-2xl font-medium text-[#222B45] ${
          isAgent ? "hidden mlg:block" : "block"
        }`}
      >
        Leads
      </h1>

      {isAgent ? (
        <>
          <div className="hidden xMini:block mlg:hidden">
            <TabletLeadsFilter
              filter={filter}
              setFilter={setFilter}
              handleFilterChange={handleFilterChange}
              isAgent={isAgent}
            />
          </div>

          <div className="hidden mlg:block">
            <LeadsFilter
              filter={filter}
              setFilter={setFilter}
              handleFilterChange={handleFilterChange}
              isAgent={isAgent}
            />
          </div>

          <div className="block xMini:hidden">
            <MobileLeadsFilters
              filter={filter}
              setFilter={setFilter}
              handleFilterChange={handleFilterChange}
              isAgent={isAgent}
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
