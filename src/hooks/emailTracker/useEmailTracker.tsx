import { TableRowEmailTracker } from "@/types/emailTracker";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import { readEmail } from "@/api/slices/emailTracker/email";

const useEmailTracker = () => {
  const { email, lastPage, totalCount } = useAppSelector(state => state.emailSlice)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<FilterType>({
    location: "",
    sortBy: "",
    text: "",
    type: ""
  });

  const [currentPageRows, setCurrentPageRows] =
    useState<TableRowEmailTracker[]>(email);
  const dispatch = useAppDispatch();


  const totalItems = totalCount;
  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(readEmail({ params: { filter: filter, page: 1, size: 10 } })).then((res: any) => {

      if (res?.payload) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentPageRows(res?.payload?.MailTracker);
      }
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(readEmail({ params: { filter: filter, page: currentPage, size: 10 } })).then((response: any) => {
      if (response?.payload) {
        setCurrentPageRows(response?.payload?.MailTracker);
      }
    })
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = (filter: FilterType) => {
    dispatch(readEmail({ params: { filter: filter, page: 1, size: 10 } }))
  };

  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    filter, setFilter,
    handleFilterChange
  };
};

export default useEmailTracker;
