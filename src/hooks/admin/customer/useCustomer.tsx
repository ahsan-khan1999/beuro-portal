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
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { AreYouSureMakeAccountFree } from "@/base-components/ui/modals1/SureAccountFree";

export default function useCustomer() {
  const { company, totalCount, loading } = useAppSelector(
    (state) => state.company
  );

  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const { modal } = useAppSelector((state) => state.global);
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const [subHeading, setSubHeading] = useState(
    translate("common.modals.block_user")
  );
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

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const handleStatusChange = async (id: string, status: string) => {
    if (!id || !status) {
      console.error("ID or status is missing.");
      return;
    }

    const newStatus = status === "Active" ? "Block" : "Active";

    const res = await dispatch(
      updateCompanyStatus({
        data: {
          id: id,
          status: staticEnums["User"]["status"][newStatus],
        },
      })
    );

    if (res?.payload?.success) {
      setCurrentPageRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, status: newStatus } : row
        )
      );

      dispatch(updateModalType({ type: ModalType.CREATION }));
    }
  };

  const handleUserBlock = (id: string, status: string) => {
    const heading =
      status === "Block"
        ? translate("common.modals.un_block_user")
        : translate("common.modals.block_user");

    setSubHeading(heading);

    dispatch(
      updateModalType({
        type: ModalType.ARE_YOU_BLOCK,
        data: {
          id,
          status,
        },
      })
    );
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
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("calendar.delete_appointment_des")}
        routeHandler={handleStatusChange}
        loading={loading}
      />
    ),
    [ModalType.ARE_YOU_BLOCK]: (
      <AreYouSureMakeAccountFree
        onClose={onClose}
        onBlockUser={handleStatusChange}
        heading={translate("common.are_you_sure_modal.title")}
        sub_heading={subHeading}
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
    handleUserBlock,
  };
}
