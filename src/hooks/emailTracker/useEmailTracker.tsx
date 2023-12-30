import { TableRowEmailTracker } from "@/types/emailTracker";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import { readEmail } from "@/api/slices/emailTracker/email";
import { areFiltersEmpty } from "@/utils/utility";
import { FiltersDefaultValues } from "@/enums/static";

const useEmailTracker = () => {
  const { email, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.emailSlice
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
  });

  const [currentPageRows, setCurrentPageRows] =
    useState<TableRowEmailTracker[]>(email);
  const dispatch = useAppDispatch();

  const totalItems = totalCount;
  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(readEmail({ params: { filter: filter, page: currentPage, size: 10 } })).then(
      (res: any) => {
        if (res?.payload) {
          setCurrentPageRows(res?.payload?.MailTracker);
        }
      }
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = (query: FilterType) => {
    dispatch(readEmail({ params: { filter: filter, page: currentPage, size: 10 } })).then(
      (res: any) => {
        if (res?.payload) {
          setCurrentPageRows(res?.payload?.MailTracker);
        }
      }
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
