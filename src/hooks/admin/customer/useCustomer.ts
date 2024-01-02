import {
  readCompany,
  setCompanyDetails,
} from "@/api/slices/company/companySlice";
import {
  readCustomer,
  setCustomerDetails,
} from "@/api/slices/customer/customerSlice";
import { FiltersDefaultValues } from "@/enums/static";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FilterType } from "@/types";
import { CustomersAdmin } from "@/types/admin/customer";
import { Company } from "@/types/company";
import { Customers } from "@/types/customer";
import { DEFAULT_CUSTOMER } from "@/utils/static";
import { useEffect, useState } from "react";

export default function useCustomer() {
  const { company, lastPage, totalCount, loading } = useAppSelector(
    (state) => state.company
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    status: FiltersDefaultValues.None,
  });

  const [currentPageRows, setCurrentPageRows] =
    useState<CustomersAdmin[]>(company);
  const dispatch = useAppDispatch();

  const totalItems = totalCount;
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(setCompanyDetails(DEFAULT_CUSTOMER));
    dispatch(
      readCompany({ params: { filter: filter, page: 1, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.User);
      }
    });
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(
      readCompany({ params: { filter: filter, page: page, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.User);
      }
    });
  };
  const handleFilterChange = (query: FilterType) => {
    console.log(query);
    dispatch(
      readCompany({ params: { filter: query, page: 1, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.User);
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
