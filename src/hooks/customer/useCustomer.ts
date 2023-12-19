import { Customers } from "@/types/customer";
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
        setCurrentPageRows(res?.payload?.Customer);
      }
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(readCustomer({ params: { filter: filter, page: currentPage, size: 10 } })).then((res: any) => {

      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Customer);
      }
    })

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
