import {  Customers } from "@/types/customer";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  readCustomer,
} from "@/api/slices/customer/customerSlice";
import { FilterType } from "@/types";

export default function useCustomer() {
  const { customer, lastPage, totalCount } = useAppSelector(state => state.customer)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<FilterType>({
    location: "",
    sortBy: "",
    text: "",
    type: ""
  });

  const [currentPageRows, setCurrentPageRows] =
    useState<Customers[]>(customer);
  const dispatch = useAppDispatch();


  const totalItems = totalCount;
  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(readCustomer({ params: { filter: filter, page: 1, size: 10 } })).then((res: any) => {

      if (res?.payload) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentPageRows(res?.payload?.Customer?.slice(startIndex, startIndex + itemsPerPage));
      }
    })
  }, [dispatch])

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(customer?.slice(startIndex, startIndex + itemsPerPage));

  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = (filter: FilterType) => {
    dispatch(readCustomer({ params: { filter: filter, page: 1, size: 10 } }))
  };
  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    filter, setFilter,
    handleFilterChange
  };
}
