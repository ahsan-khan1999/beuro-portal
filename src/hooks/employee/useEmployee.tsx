import { FilterType } from "@/types";
import { Employee } from "@/types/employee";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { readEmployee } from "@/api/slices/employee/emplyeeSlice";
import { FiltersDefaultValues } from "@/enums/static";
import { useRouter } from "next/router";

const useEmployee = () => {
  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    date: {
      $gte: FiltersDefaultValues.$gte,
      $lte: FiltersDefaultValues.$lte,
    },
  });

  const { employee, lastPage, totalCount, loading, isLoading } = useAppSelector(
    (state) => state.employee
  );

  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const [currentPageRows, setCurrentPageRows] = useState<Employee[]>([]);
  const totalItems = totalCount;
  const itemsPerPage = 15;
  const { t: translate } = useTranslation();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  useEffect(() => {
    const parsedPage = parseInt(query.page as string, 15);
    let resetPage = null;

    if (!isNaN(parsedPage)) {
      setCurrentPage(parsedPage);
    } else {
      resetPage = 1;
      setCurrentPage(1);
    }

    const searchQuery = query?.text as string;
    const sortedValue = query?.sort as string;
    const searchDate = query?.date as string;

    const queryParams = searchQuery || sortedValue || searchDate;

    let updatedFilter: {
      text?: string;
      sort?: string;
      date?: {
        $gte?: string;
        $lte?: string;
      };
    } = {
      text: searchQuery || "",
    };

    if (searchQuery || sortedValue || searchDate) {
      updatedFilter.text = searchQuery;
      updatedFilter.sort = sortedValue;
      updatedFilter.date = searchDate ? JSON.parse(searchDate) : undefined;
    }

    setFilter(updatedFilter);

    if (parsedPage !== undefined) {
      dispatch(
        readEmployee({
          params: {
            filter: queryParams ? updatedFilter : {},
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 15,
          },
        })
      ).then((response: any) => {
        if (response?.payload) {
          setCurrentPageRows(response?.payload?.Employee);
        }
      });
    }
  }, [query]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (query: FilterType) => {
    setCurrentPage(1);
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
    isLoading,
    currentPage,
    totalCount,
  };
};

export default useEmployee;
