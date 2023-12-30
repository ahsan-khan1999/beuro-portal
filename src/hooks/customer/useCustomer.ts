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
import { FiltersDefaultValues } from "@/enums/static";

export default function useCustomer() {
  const { customer, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.customer
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    // type: FiltersDefaultValues.None,
  });

  const [currentPageRows, setCurrentPageRows] = useState<Customers[]>(customer);
  const dispatch = useAppDispatch();

  const totalItems = totalCount;
  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(setCustomerDetails(DEFAULT_CUSTOMER));
  }, []);

  // useEffect(() => {
  //   console.log("render");
  //   dispatch(
  //     readCustomer({
  //       params: {
  //         filter: filter,
  //         page: currentPage,
  //         size: 10,
  //       },
  //     })
  //   ).then((res: any) => {
  //     if (res?.payload) {
  //       setCurrentPageRows(res?.payload?.Customer);
  //     }
  //   });
  // }, [filter, currentPage]);

  useEffect(() => {
    dispatch(
      readCustomer({
        params: {
          filter: filter,
          page: currentPage,
          size: 10,
        },
      })
    ).then((res: any) => {
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
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Customer);
      }
    });
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
