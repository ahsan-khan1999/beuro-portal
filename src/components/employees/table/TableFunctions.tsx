import React from "react";
import { useRouter } from "next/router";
import EmployeesFilters from "./employees-filters";
import { FilterType } from '../../../types/types';
import { SetStateAction } from 'react';
import { useTranslation } from "next-i18next";

const TableFunctions = ({ filter, setFilter, handleFilterChange }: { filter: FilterType, setFilter: SetStateAction<any>, handleFilterChange: (value: FilterType) => void }) => {
  const router = useRouter();
  const { t: translate } = useTranslation()
  function onInputChange(text: string) { }

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center ">
        <div className="flex items-center space-x-4">
          <EmployeesFilters filter={filter} setFilter={setFilter} />
        </div>
        <button
          onClick={() => handleFilterChange(filter)}
          className="py-2  px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-5 whitespace-nowrap"
        >

          Apply
        </button>
        <button
          onClick={() => router.push("employees/add")}
          className="py-2 pl-2 pr-[10px] px-[8px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md ml-2 whitespace-nowrap"
        >
          <svg
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
          >
            <path
              d="M13.2526 7.94451H8.52654V12.6706C8.52654 13.1904 8.1012 13.6158 7.58133 13.6158C7.06146 13.6158 6.63612 13.1904 6.63612 12.6706V7.94451H1.91006C1.39019 7.94451 0.964844 7.51917 0.964844 6.9993C0.964844 6.47943 1.39019 6.05409 1.91006 6.05409H6.63612V1.32802C6.63612 0.808158 7.06146 0.382812 7.58133 0.382812C8.1012 0.382812 8.52654 0.808158 8.52654 1.32802V6.05409H13.2526C13.7725 6.05409 14.1978 6.47943 14.1978 6.9993C14.1978 7.51917 13.7725 7.94451 13.2526 7.94451Z"
              fill="white"
            />
          </svg>
          {translate("employees.add_button")}
        </button>
      </div>
    </div>
  );
};
export default TableFunctions