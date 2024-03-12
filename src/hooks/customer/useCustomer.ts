import { Customers } from "@/types/customer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  readCustomer,
  setCustomerDetails,
} from "@/api/slices/customer/customerSlice";
import { FilterType } from "@/types";
import { DEFAULT_CUSTOMER } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";
import { useRouter } from "next/router";

export default function useCustomer() {
  const { customer, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.customer
  );

  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
  });

  const [currentPageRows, setCurrentPageRows] = useState<Customers[]>(customer);
  const dispatch = useAppDispatch();

  const totalItems = totalCount;
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(setCustomerDetails(DEFAULT_CUSTOMER));
  }, []);

  const handleFilterChange = (query: FilterType) => {
    setCurrentPage(1);
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
        readCustomer({
          params: {
            filter: queryParams ? updatedFilter : {},
            page: Number(parsedPage) || currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Customer);
      });
    }
  }, [query]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
    currentPage,
  };
}
