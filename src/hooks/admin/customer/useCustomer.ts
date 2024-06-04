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
import { useQueryParams } from "@/utils/hooks";
import { DEFAULT_CUSTOMER, staticEnums } from "@/utils/static";
import { useEffect, useState } from "react";

export default function useCustomer() {
  const { company, lastPage, totalCount, loading, companyDetails } =
    useAppSelector((state) => state.company);

  const params = useQueryParams();
  const page = params?.page as unknown as number;

  const [currentPage, setCurrentPage] = useState<number>(page || 1);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleDefaultModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleStatusChange = async (
    id: string,
    companyStatus: string,
    type: string
  ) => {
    if (type === "customer") {
      const currentItem = currentPageRows.find((item) => item.id === id);
      if (!currentItem || currentItem.status !== companyStatus) {
        const res = await dispatch(
          updateCompanyStatus({
            data: {
              id: id,
              status: staticEnums["User"]["accountStatus"][companyStatus],
            },
          })
        );

        if (res?.payload) {
          let index = currentPageRows.findIndex(
            (item) => item.id === res.payload?.id
          );

          if (index !== -1) {
            let prevPageRows = [...currentPageRows];
            prevPageRows.splice(index, 1, res.payload);
            setCurrentPageRows(prevPageRows);
            handleDefaultModal();
          }
        }
      }
    }
  };

  useEffect(() => {
    dispatch(setCompanyDetails(DEFAULT_CUSTOMER));
  }, []);

  useEffect(() => {
    const updatedStatus =
      params.status === "None" ? "None" : params.status?.split(",");

    const parsedPage = parseInt(params.page as string, 10);
    let resetPage = null;

    if (!isNaN(parsedPage) && parsedPage !== undefined) {
      setCurrentPage(parsedPage);
    } else {
      resetPage = 1;
      setCurrentPage(1);
    }

    const { page, ...restParams } = params;

    setFilter({ ...filter, ...restParams, status: updatedStatus });
    dispatch(setCompanyDetails(DEFAULT_CUSTOMER));
    dispatch(
      readCompany({
        params: {
          filter: { ...restParams, role: "1", status: updatedStatus },
          page: (Number(parsedPage) || resetPage) ?? currentPage,
          size: 10,
        },
      })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.User);
      }
    });
  }, [params]);

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
    totalCount,
    handleStatusChange,
  };
}
