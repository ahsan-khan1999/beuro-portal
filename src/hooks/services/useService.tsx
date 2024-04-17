import { useEffect, useState } from "react";
import { Service } from "@/types/service";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import { readService } from "@/api/slices/service/serviceSlice";
import { useTranslation } from "next-i18next";
import { FiltersDefaultValues } from "@/enums/static";
import { useRouter } from "next/router";

const useService = () => {
  const { service, lastPage, totalCount, loading, isLoading } = useAppSelector(
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
      updatedFilter.date = searchDate && JSON.parse(searchDate);
    }

    setFilter(updatedFilter);

    if (parsedPage !== undefined) {
      dispatch(
        readService({
          params: {
            filter: queryParams ? updatedFilter : {},
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) {
          setCurrentPageRows(response?.payload?.Service);
        }
      });
    }
  }, [query]);

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
    isLoading,
    currentPage,
  };
};

export default useService;
