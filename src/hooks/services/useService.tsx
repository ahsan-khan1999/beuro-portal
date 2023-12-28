import { useEffect, useState } from "react";
import { Service } from "@/types/service";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import {
  readService,
  setServiceDetails,
} from "@/api/slices/service/serviceSlice";
import { useTranslation } from "next-i18next";
import { DEFAULT_SERVICE } from "@/utils/static";
import { areFiltersEmpty } from "@/utils/utility";

const useService = () => {
  const { service, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.service
  );
  const [filter, setFilter] = useState<FilterType>({
    sort: "",
    text: "",
    date: {
      $gte: "",
      $lte: "",
    },
    price: [],
  });
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<Service[]>([]);
  const { t: translate } = useTranslation();

  const totalItems = lastPage;
  const itemsPerPage = 10;

  useEffect(() => {
    const queryParams = areFiltersEmpty(filter)
      ? { filter: {}, page: 1, size: 10 }
      : { filter: filter, page: 1, size: 10 };

    dispatch(readService({ params: queryParams })).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Service);
      }
    });
  }, []);

  useEffect(() => {
    // Update rows for the current page
    const queryParams = areFiltersEmpty(filter)
      ? { filter: {}, page: 1, size: 10 }
      : { filter: filter, page: 1, size: 10 };

    dispatch(readService({ params: queryParams })).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Service);
      }
    });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = (query: FilterType) => {
    dispatch(
      readService({ params: { filter: query, page: currentPage, size: 10 } })
    );
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
  };
};

export default useService;
