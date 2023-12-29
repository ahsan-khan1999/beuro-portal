import { Customers } from "@/types/customer";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  readCustomer,
  setCustomerDetails,
} from "@/api/slices/customer/customerSlice";
import { FilterType } from "@/types";
import { DEFAULT_CUSTOMER } from "@/utils/static";
import { areFiltersEmpty } from "@/utils/utility";

export default function useCustomer() {
  const { customer, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.customer
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<FilterType>({
    // location: "",
    sort: "",
    text: "",
    type: "",
  });

  const [currentPageRows, setCurrentPageRows] = useState<Customers[]>(customer);
  const dispatch = useAppDispatch();

  const totalItems = totalCount;
  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(setCustomerDetails(DEFAULT_CUSTOMER));
    // const queryParams = areFiltersEmpty(filter)
    //   ? { filter: null, page: 1, size: 10 }
    //   : { filter: filter, page: 1, size: 10 };

    // dispatch(readCustomer({ params: queryParams })).then((res: any) => {
    //   if (res?.payload) {
    //     setCurrentPageRows(res?.payload?.Customer);
    //   }
    // });
  }, []);

  useEffect(() => {
    const queryParams = areFiltersEmpty(filter)
      ? { filter: null, page: currentPage, size: 10 }
      : { filter: filter, page: currentPage, size: 10 };

    dispatch(readCustomer({ params: queryParams })).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Customer);
      }
    });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFilterChange = (query: FilterType) => {
    dispatch(
      readCustomer({ params: { filter: query, page: currentPage, size: 10 } })
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
}
