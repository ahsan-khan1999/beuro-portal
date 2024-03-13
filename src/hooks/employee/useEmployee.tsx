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
  const [currentPageRows, setCurrentPageRows] = useState<Employee[]>([]);
  const totalItems = totalCount;
  const itemsPerPage = 10;
  const { t: translate } = useTranslation();

  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (query: FilterType) => {
    setCurrentPage(1);
    // dispatch(
    //   readEmployee({ params: { filter: query, page: currentPage, size: 10 } })
    // ).then((res: any) => {
    //   if (res?.payload) {
    //     setCurrentPageRows(res?.payload?.Employee);
    //   }
    // });
  };

  useEffect(() => {
    const parsedPage = parseInt(query.page as string, 10);
    let resetPage = null;
    if (!isNaN(parsedPage)) {
      setCurrentPage(parsedPage);
    } else {
      resetPage = 1;
      setCurrentPage(1);
    }

    const searchQuery = query?.text as string;
    const sortedValue = query?.sort as string;

    const queryParams = searchQuery || sortedValue;

    let updatedFilter = {
      text: "",
      sort: "",
    };

    if (searchQuery || sortedValue) {
      updatedFilter.text = searchQuery;
      updatedFilter.sort = sortedValue;
    }

    setFilter(updatedFilter);

    if (parsedPage) {
      dispatch(
        readEmployee({
          params: {
            filter: queryParams ? updatedFilter : {},
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Employee);
      });
    }
  }, [query]);

  // useEffect(() => {
  //   const parsedPage = parseInt(query.page as string, 10);
  //   if (!isNaN(parsedPage)) {
  //     setCurrentPage(parsedPage);
  //   }
  //   const searchQuery = query?.text as string;

  //   const queryParams = searchQuery;

  //   let updatedFilter = {
  //     text: "",
  //   };

  //   if (searchQuery) {
  //     updatedFilter.text = searchQuery;
  //   }

  //   setFilter(updatedFilter);
  //   console.log(parsedPage, "parsedPage");
  //   if (parsedPage) {
  //     dispatch(
  //       readEmployee({
  //         params: {
  //           filter: queryParams ? updatedFilter : {},
  //           page: Number(parsedPage) || currentPage,
  //           size: 10,
  //         },
  //       })
  //     ).then((response: any) => {
  //       if (response?.payload) setCurrentPageRows(response?.payload?.Employee);
  //     });
  //   }
  // }, [query]);

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
  };
};

export default useEmployee;
