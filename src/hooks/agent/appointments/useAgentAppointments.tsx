import {
  readAppointments,
  setAppointmentDetails,
} from "@/api/slices/appointment/appointmentSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { FiltersDefaultValues } from "@/enums/static";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FilterType } from "@/types";
import localStoreUtil from "@/utils/localstore.util";
import { DEFAULT_APPOINTMETNS } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useAgentAppointments = () => {
  const { loading, isLoading, totalCount, appointment } = useAppSelector(
    (state) => state.appointment
  );

  const { t: translate } = useTranslation();
  const router = useRouter();
  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const itemsPerPage = 15;
  const totalItems = totalCount;
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);

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

  useEffect(() => {
    localStoreUtil.remove_data("appointment");
    dispatch(setAppointmentDetails(DEFAULT_APPOINTMETNS));
  }, []);

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
    const searchQuery = query?.text as string;
    const sortedValue = query?.sort as string;
    const searchedDate = query?.date as string;
    const searchNoteType = query?.noteType as string;

    const queryParams =
      queryStatus ||
      searchQuery ||
      sortedValue ||
      searchedDate ||
      searchNoteType;

    if (queryParams !== undefined) {
      const filteredStatus =
        query?.status === "None"
          ? "None"
          : queryParams
              .toString()
              .split(",")
              .filter((item) => item !== "None");

      let updatedFilter: {
        status: string | string[];
        text?: string;
        sort?: string;
        noteType?: string;
        date?: {
          $gte?: string;
          $lte?: string;
        };
      } = {
        status: filteredStatus,
      };

      if (searchQuery || sortedValue || searchedDate || searchNoteType) {
        updatedFilter.text = searchQuery;
        updatedFilter.sort = sortedValue;
        updatedFilter.noteType = searchNoteType;
        updatedFilter.date = searchedDate && JSON.parse(searchedDate);
      }

      setFilter(updatedFilter);

      dispatch(
        readAppointments({
          params: {
            filter: updatedFilter,
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 15,
          },
        })
      );
    }
  }, [query]);

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
    appointment,
    handleViewReports,
    handleSubmitReports,
    handlePageChange,
    handleStatusChange,
    handleFilterChange,
  };
};
