import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { FiltersDefaultValues } from "@/enums/static";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FilterType } from "@/types";
import { Appointments } from "@/types/appointments";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";

export const useAgentAppointments = () => {
  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    noteType: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    date: {
      $gte: FiltersDefaultValues.$gte,
      $lte: FiltersDefaultValues.$lte,
    },
    status: FiltersDefaultValues.None,
  });

  const { t: translate } = useTranslation();
  const router = useRouter();
  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const [currentPageRows, setCurrentPageRows] = useState<Appointments[]>([]);

  const isLoading = true;
  const totalCount = 20;
  const itemsPerPage = 15;
  const totalItems = totalCount;
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewReports = () => {
    console.log("view reports");
  };

  const handleSubmitReports = () => {
    router.push({
      pathname: "/agent/appointments",
    });
  };

  const handleStatusChange = () => {
    console.log("status change");
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.update_success")}
        route={onClose}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    router,
    translate,
    renderModal,
    currentPage,
    filter,
    isLoading,
    setFilter,
    itemsPerPage,
    totalItems,
    totalCount,
    currentPageRows,
    handleViewReports,
    handleSubmitReports,
    handlePageChange,
    handleStatusChange,
    handleFilterChange,
  };
};
