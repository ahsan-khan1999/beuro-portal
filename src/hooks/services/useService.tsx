import { useEffect, useState } from "react";
import { Service } from "@/types/service";
import { servicesData } from "@/utils/static";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { FilterType } from "@/types";
import { readService } from "@/api/slices/service/serviceSlice";

const useService = () => {
  const { service, lastPage, totalCount } = useAppSelector(state => state.service)
  const [filter, setFilter] = useState<FilterType>({
    sortBy: "",
    text: "",
  });
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<Service[]>([]);

  const totalItems = lastPage;
  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(readService({ params: { filter: filter, page: 1, size: 10 } })).then((res: any) => {

      if (res?.payload) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentPageRows(res?.payload?.Service?.slice(startIndex, startIndex + itemsPerPage));
      }
    })
  }, [dispatch])

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      service.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = (filter: FilterType) => {
    dispatch(readService({ params: { filter: filter, page: 1, size: 10 } }))
  };
  return {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleFilterChange,
    filter,
    setFilter
  };
};

export default useService;
