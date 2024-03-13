import { TableRowEmailTracker } from "@/types/emailTracker";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import { readEmail } from "@/api/slices/emailTracker/email";
import { FiltersDefaultValues } from "@/enums/static";
import { useRouter } from "next/router";

const useEmailTracker = () => {
  const { email, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.emailSlice
  );

  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
  });

  const [currentPageRows, setCurrentPageRows] =
    useState<TableRowEmailTracker[]>(email);
  const dispatch = useAppDispatch();

  const totalItems = totalCount;
  const itemsPerPage = 10;

  const handleFilterChange = (query: FilterType) => {
    setCurrentPage(1);
    // dispatch(
    //   readEmail({ params: { filter: filter, page: currentPage, size: 10 } })
    // ).then((res: any) => {
    //   if (res?.payload) {
    //     setCurrentPageRows(res?.payload?.MailTracker);
    //   }
    // });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const parsedPage = parseInt(query.page as string, 10);
    if (!isNaN(parsedPage)) {
      setCurrentPage(parsedPage);
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
        readEmail({
          params: {
            filter: queryParams ? updatedFilter : {},
            page: Number(parsedPage) || currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload)
          setCurrentPageRows(response?.payload?.MailTracker);
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
  //       readEmail({
  //         params: {
  //           filter: queryParams ? updatedFilter : {},
  //           page: Number(parsedPage) || currentPage,
  //           size: 10,
  //         },
  //       })
  //     ).then((response: any) => {
  //       if (response?.payload)
  //         setCurrentPageRows(response?.payload?.MailTracker);
  //     });
  //   }
  // }, [query]);

  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    filter,
    setFilter,
    handleFilterChange,
    loading,
    currentPage,
  };
};

export default useEmailTracker;
