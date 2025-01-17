import { Customers } from "@/types/customer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  readCustomer,
  setCustomerDetails,
} from "@/api/slices/customer/customerSlice";
import { FilterType } from "@/types";
import { FiltersDefaultValues } from "@/enums/static";
import { useRouter } from "next/router";
import localStoreUtil from "@/utils/localstore.util";
import { DEFAULT_CUSTOMER } from "@/utils/static";

export default function useCustomer() {
  const { customer, lastPage, totalCount, loading, isLoading } = useAppSelector(
    (state) => state.customer
  );

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
  });

  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const [currentPageRows, setCurrentPageRows] = useState<Customers[]>(customer);

  useEffect(() => {
    localStoreUtil.remove_data("customers");
    dispatch(setCustomerDetails(DEFAULT_CUSTOMER));
  }, []);

  useEffect(() => {
    const parsedPage = parseInt(query.page as string, 10);
    let resetPage = null;

    if (!isNaN(parsedPage) && parsedPage !== undefined) {
      setCurrentPage(parsedPage);
    } else {
      resetPage = 1;
      setCurrentPage(1);
    }

    const searchQuery = query?.text as string;
    const sortedValue = query?.sort as string;
    const queryParams = searchQuery || sortedValue;

    let updatedFilter: {
      text?: string;
      sort?: string;
    } = {
      text: searchQuery || "",
    };

    if (searchQuery || sortedValue) {
      updatedFilter.text = searchQuery;
      updatedFilter.sort = sortedValue;
    }

    setFilter(updatedFilter);

    if (parsedPage !== undefined) {
      dispatch(
        readCustomer({
          params: {
            filter: queryParams ? updatedFilter : {},
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 15,
          },
        })
      ).then((response: any) => {
        if (response?.payload) {
          setCurrentPageRows(response?.payload?.Customer);
        }
      });
    }
  }, [query]);

  const dispatch = useAppDispatch();
  const totalItems = totalCount;
  const itemsPerPage = 15;

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

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
    isLoading,
    currentPage,
    totalCount,
  };
}
