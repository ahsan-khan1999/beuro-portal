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

  const { employee, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.employee
  );

  const dispatch = useAppDispatch();
  const [currentPageRows, setCurrentPageRows] = useState<Employee[]>([]);
  const totalItems = totalCount;
  const itemsPerPage = 10;
  const { t: translate } = useTranslation();

  const { query } = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (query && query.page) {
      const parsedPage = parseInt(query.page as string, 10);
      if (!isNaN(parsedPage)) {
        setCurrentPage(parsedPage);
      }
    }
  }, [query]);

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
    const queryStatus = query?.status;
    const searchQuery = query?.text as string;

    const queryParams = queryStatus || searchQuery;

    if (queryParams !== undefined) {
      const filteredStatus =
        query?.status === "None"
          ? "None"
          : queryParams
              .toString()
              .split(",")
              .filter((item) => item !== "None");

      let updatedFilter: {
        status: string | string[];
        text?: string;
      } = {
        status: filteredStatus,
      };

      if (searchQuery) {
        updatedFilter.text = searchQuery;
      }

      setFilter(updatedFilter);

      dispatch(
        readEmployee({
          params: {
            filter: updatedFilter,
            page: currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Employee);
      });
    }
  }, [query]);

  // useEffect(() => {
  //   const queryStatus = query?.status;
  //   const searchQuery = query?.text as string;

  //   const queryParams = queryStatus || searchQuery;

  //   if (queryParams !== undefined) {
  //     setFilter({
  //       ...filter,
  //       status: queryStatus,
  //       text: searchQuery,
  //     });

  //     dispatch(
  //       readEmployee({
  //         params: {
  //           filter: {
  //             ...filter,
  //             status: queryStatus,
  //             text: searchQuery,
  //           },
  //           page: currentPage,
  //           size: 10,
  //         },
  //       })
  //     ).then((res: any) => {
  //       if (res?.payload) {
  //         setCurrentPageRows(res?.payload?.Employee);
  //       }
  //     });
  //   }
  // }, [currentPage, query]);

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
    currentPage,
  };
};

export default useEmployee;
