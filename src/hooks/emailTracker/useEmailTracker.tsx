import { TableRowEmailTracker } from "@/types/emailTracker";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import { readEmail } from "@/api/slices/emailTracker/email";
import { areFiltersEmpty } from "@/utils/utility";

const useEmailTracker = () => {
  const { email, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.emailSlice
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<FilterType>({
    sort: "",
    text: "",
  });

  const [currentPageRows, setCurrentPageRows] =
    useState<TableRowEmailTracker[]>(email);
  const dispatch = useAppDispatch();

  const totalItems = totalCount;
  const itemsPerPage = 10;
  useEffect(() => {
    const queryParams = areFiltersEmpty(filter)
      ? { filter: {}, page: 1, size: 10 }
      : { filter: filter, page: 1, size: 10 };
    dispatch(readEmail({ params: queryParams })).then((res: any) => {
      if (res?.payload) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentPageRows(res?.payload?.MailTracker);
      }
    });
  }, []);

  useEffect(() => {
    const queryParams = areFiltersEmpty(filter)
      ? { filter: {}, page: 1, size: 10 }
      : { filter: filter, page: 1, size: 10 };
    dispatch(readEmail({ params: queryParams })).then((response: any) => {
      if (response?.payload) {
        setCurrentPageRows(response?.payload?.MailTracker);
      }
    });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = (filter: FilterType) => {
    dispatch(
      readEmail({ params: { filter: filter, page: currentPage, size: 10 } })
    );
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
  };
};

export default useEmailTracker;
