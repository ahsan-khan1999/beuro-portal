import {
  readCompany,
  setCompanyDetails,
  updateCompanyStatus,
} from "@/api/slices/company/companySlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { FiltersDefaultValues } from "@/enums/static";
import { ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FilterType } from "@/types";
import { CustomersAdmin } from "@/types/admin/customer";
import { DEFAULT_CUSTOMER, staticEnums } from "@/utils/static";
import { useEffect, useState } from "react";

export default function useCustomer() {
  const { company, lastPage, totalCount, loading, companyDetails } =
    useAppSelector((state) => state.company);
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
      readCompany({
        params: { filter: { ...filter, role: "1" }, page: 1, size: 10 },
      })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.User);
      }
    });
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(
      readCompany({
        params: { filter: { ...filter, role: "1" }, page: page, size: 10 },
      })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.User);
      }
    });
  };
  const handleFilterChange = (query: FilterType) => {
    dispatch(
      readCompany({
        params: { filter: { ...query, role: "1" }, page: 1, size: 10 },
      })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.User);
      }
    });
  };

  const handleStatusChange = async (value: string) => {
    const res = await dispatch(
      updateCompanyStatus({
        data: {
          id: companyDetails?.id,
          status: staticEnums["User"]["accountStatus"][value],
        },
      })
    );
    if (res?.payload) dispatch(updateModalType({ type: ModalType.CREATION }));
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
    handleStatusChange,
  };
}
