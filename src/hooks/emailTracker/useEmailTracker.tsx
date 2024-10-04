import { TableRowEmailTracker } from "@/types/emailTracker";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import { readEmail } from "@/api/slices/emailTracker/email";
import { FiltersDefaultValues } from "@/enums/static";
import { useRouter } from "next/router";

const useEmailTracker = () => {
  const { email, totalCount, loading, isLoading } = useAppSelector(
    (state) => state.emailSlice
  );

  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const [filter, setFilter] = useState<FilterType>({
    emailStatus: FiltersDefaultValues.None,
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
  });

  const [currentPageRows, setCurrentPageRows] =
    useState<TableRowEmailTracker[]>(email);

  const dispatch = useAppDispatch();
  const totalItems = totalCount;
  const itemsPerPage = 15;

  useEffect(() => {
    const parsedPage = parseInt(query.page as string, 10);
    let resetPage = null;

    if (!isNaN(parsedPage)) {
      setCurrentPage(parsedPage);
    } else {
      resetPage = 1;
      setCurrentPage(1);
    }

    const queryMailStatus = query?.mailStatus;
    const searchQuery = query?.text as string;
    const sortedValue = query?.sort as string;
    const queryParams = queryMailStatus || searchQuery || sortedValue;

    if (queryParams !== undefined) {
      const filteredStatus =
        query?.mailStatus === "None"
          ? "None"
          : queryParams
              ?.toString()
              ?.split(",")
              .filter((item) => item !== "None");

      let updatedFilter: {
        mailStatus?: string | string[];
        text?: string;
        sort?: string;
      } = {
        mailStatus: filteredStatus,
      };

      if (searchQuery || sortedValue) {
        updatedFilter.text = searchQuery;
        updatedFilter.sort = sortedValue;
      }

      setFilter(updatedFilter);

      if (parsedPage !== undefined) {
        dispatch(
          readEmail({
            params: {
              filter: queryParams ? updatedFilter : {},
              page: (Number(parsedPage) || resetPage) ?? currentPage,
              size: 15,
            },
          })
        ).then((response: any) => {
          if (response?.payload) {
            setCurrentPageRows(response?.payload?.MailTracker);
          }
        });
      }
    }
  }, [query]);

  const handleFilterChange = (query: FilterType) => {
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    filter,
    setFilter,
    handleFilterChange,
    loading,
    isLoading,
    currentPage,
    totalCount,
  };
};

export default useEmailTracker;
