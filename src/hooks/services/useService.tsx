import { useEffect, useState } from "react";
import { Service } from "@/types/service";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import { readService } from "@/api/slices/service/serviceSlice";
import { useTranslation } from "next-i18next";
import { FiltersDefaultValues } from "@/enums/static";
import { useRouter } from "next/router";

const useService = () => {
  const { service, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.service
  );

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    date: {
      $gte: FiltersDefaultValues.$gte,
      $lte: FiltersDefaultValues.$lte,
    },
  });

  const handleFilterChange = (query: FilterType) => {
    setCurrentPage(1);
    // dispatch(
    //   readService({ params: { filter: query, page: currentPage, size: 10 } })
    // ).then((res: any) => {
    //   if (res?.payload) {
    //     setCurrentPageRows(res?.payload?.Service);
    //   }
    // });
  };

  const dispatch = useAppDispatch();
  const [currentPageRows, setCurrentPageRows] = useState<Service[]>([]);
  const { t: translate } = useTranslation();
  const { query } = useRouter();

  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const totalItems = totalCount;
  const itemsPerPage = 10;

  useEffect(() => {
    const parsedPage = parseInt(query.page as string, 10);
    if (!isNaN(parsedPage)) {
      setCurrentPage(parsedPage);
    }
    const searchQuery = query?.text as string;

    const queryParams = searchQuery;

    let updatedFilter = {
      text: "",
    };

    if (searchQuery) {
      updatedFilter.text = searchQuery;
    }

    setFilter(updatedFilter);
    console.log(parsedPage, "parsedPage");
    if (parsedPage) {
      dispatch(
        readService({
          params: {
            filter: queryParams ? updatedFilter : {},
            page: Number(parsedPage) || currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Service);
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
  //       readService({
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
  //         setCurrentPageRows(res?.payload?.Service);
  //       }
  //     });
  //   }
  // }, [currentPage, query]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleFilterChange,
    filter,
    setFilter,
    translate,
    loading,
    currentPage,
  };
};

export default useService;
