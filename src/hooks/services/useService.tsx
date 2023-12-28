import { useEffect, useState } from "react";
import { Service } from "@/types/service";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import { readService, setServiceDetails } from "@/api/slices/service/serviceSlice";
import { useTranslation } from "next-i18next";
import { DEFAULT_SERVICE } from "@/utils/static";

const useService = () => {
  const { service, lastPage, totalCount, loading } = useAppSelector(state => state.service)
  const [filter, setFilter] = useState<FilterType>({
    sortBy: "",
    text: "",
  });
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<Service[]>([]);
  const { t: translate } = useTranslation();

  const totalItems = lastPage;
  const itemsPerPage = 10;
  useEffect(() => {

    dispatch(readService({ params: { filter: {} } })).then((res: any) => {

      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Service);
      }
    })
  }, [dispatch])

  useEffect(() => {
    // Update rows for the current page
    dispatch(readService({ params: { filter: {} } })).then((res: any) => {
      setCurrentPageRows(res?.payload?.Service)
    })
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = () => {
    dispatch(readService({ params: { filter: {} } }))
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
    loading
  };
};

export default useService;
