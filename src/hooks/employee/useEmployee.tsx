import { FilterType } from "@/types";
import { Employee } from "@/types/employee";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  readEmployee,
  setEmployeeDetails,
} from "@/api/slices/employee/emplyeeSlice";
import { DEFAULT_EMPLOYEE } from "@/utils/static";
import { areFiltersEmpty } from "@/utils/utility";
import { FiltersDefaultValues } from "@/enums/static";

const useEmployee = () => {
  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    date: {
      $gte: FiltersDefaultValues.$gte,
      $lte: FiltersDefaultValues.$lte,
    },
  });
  const { employee, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.employee
  );
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<Employee[]>([]);
  const totalItems = totalCount;
  const itemsPerPage = 10;
  const { t: translate } = useTranslation();

  useEffect(() => {
    dispatch(setEmployeeDetails(DEFAULT_EMPLOYEE))
    dispatch(
      readEmployee({ params: { filter: filter, page: currentPage, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Employee);
      }
    });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = (query: FilterType) => {
    dispatch(
      readEmployee({ params: { filter: query, page: currentPage, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Employee);
      }
    });
  };

  return {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    filter,
    setFilter,
    handleFilterChange,
    translate,
    loading,
  };
};

export default useEmployee;
