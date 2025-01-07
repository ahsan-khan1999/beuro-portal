import {
  readCompany,
  setCompanyDetails,
  updateCompanyStatus,
} from "@/api/slices/company/companySlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { FiltersDefaultValues } from "@/enums/static";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FilterType } from "@/types";
import { CustomersAdmin } from "@/types/admin/customer";
import { DEFAULT_CUSTOMER, staticEnums } from "@/utils/static";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useCustomer() {
  const { company, totalCount, loading } = useAppSelector(
    (state) => state.company
  );

  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const { modal } = useAppSelector((state) => state.global);
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const [currentPageRows, setCurrentPageRows] =
    useState<CustomersAdmin[]>(company);

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    status: FiltersDefaultValues.None,
  });

  const dispatch = useAppDispatch();
  const totalItems = totalCount;
  const itemsPerPage = 15;

  useEffect(() => {
    const parsedPage = parseInt(query.page as string, 10);
    let resetPage = null;
    if (!isNaN(parsedPage)) {
      setCurrentPage(parsedPage);
    } else {
      resetPage = 1;
      setCurrentPage(1);
    }

    const queryStatus = query?.status;
    const queryText = query?.text as string;
    const querySort = query?.sort as string;

    const queryParams = queryStatus || queryText || querySort;

    const filteredStatus =
      query?.status === "None"
        ? "None"
        : queryParams
            ?.toString()
            ?.split(",")
            ?.filter((item) => item !== "None");

    let updatedFilter: {
      status: string | string[];
      text?: string;
      sort?: string;
      role: string;
    } = {
      status: filteredStatus,
      role: "1",
    };

    if (queryText || querySort) {
      updatedFilter.text = queryText;
      updatedFilter.sort = querySort;
    }

    setFilter(updatedFilter);
    dispatch(setCompanyDetails(DEFAULT_CUSTOMER));
    dispatch(
      readCompany({
        params: {
          filter: updatedFilter,
          page: (Number(parsedPage) || resetPage) ?? currentPage,
          size: 15,
        },
      })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.User);
      }
    });
  }, [query]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleDefaultModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const handleStatusChange = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (type === "admin_customer") {
      const currentItem = currentPageRows.find((item) => item.id === id);

      if (!currentItem || currentItem.status !== status) {
        const res = await dispatch(
          updateCompanyStatus({
            data: {
              id: id,
              status: staticEnums["User"]["accountStatus"][status],
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

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.record_update_des")}
        onClose={onClose}
        route={onClose}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
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
    totalCount,
    handleStatusChange,
    renderModal,
  };
}
