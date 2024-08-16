import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { FilterType } from "@/types";
import { useRouter } from "next/router";
import { FiltersDefaultValues } from "@/enums/static";
import { useTranslation } from "next-i18next";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import reschudleIcon from "@/assets/pngs/reschdule-icon.png";
import {
  readAppointments,
  setAppointmentDetails,
  updateAppointmentStatus,
} from "@/api/slices/appointment/appointmentSlice";
import localStoreUtil from "@/utils/localstore.util";
import { DEFAULT_APPOINTMETNS, staticEnums } from "@/utils/static";
import { CreateReportModal } from "@/base-components/ui/modals1/CreateReportModal";
import { Appointments } from "@/types/appointments";
import { ScheduleAppointments } from "@/base-components/ui/modals1/ScheduleAppointments";

export const useAppointments = () => {
  const { loading, isLoading, totalCount, lastPage } = useAppSelector(
    (state) => state.appointment
  );

  const router = useRouter();
  const { t: translate } = useTranslation();
  const page = router.query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const [currentPageRows, setCurrentPageRows] = useState<Appointments[]>([]);

  const path = router.asPath;
  const isAgentRoute = path.startsWith("/agent");

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
    const parsedPage = parseInt(router.query.page as string, 10);
    let resetPage = null;
    if (!isNaN(parsedPage)) {
      setCurrentPage(parsedPage);
    } else {
      resetPage = 1;
      setCurrentPage(1);
    }

    const queryStatus = router.query?.status;
    const searchQuery = router.query?.text as string;
    const sortedValue = router.query?.sort as string;
    const searchedDate = router.query?.date as string;
    const searchNoteType = router.query?.noteType as string;

    const queryParams =
      queryStatus ||
      searchQuery ||
      sortedValue ||
      searchedDate ||
      searchNoteType;

    if (queryParams !== undefined) {
      const filteredStatus =
        router.query?.status === "None"
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
        today?: boolean;
      } = {
        status: filteredStatus,
      };

      if (searchQuery || sortedValue || searchedDate || searchNoteType) {
        updatedFilter.text = searchQuery;
        updatedFilter.sort = sortedValue;
        updatedFilter.noteType = searchNoteType;
        updatedFilter.date = searchedDate && JSON.parse(searchedDate);
      }

      // if (isAgentRoute) {
      //   updatedFilter.today = true;
      // }

      setFilter(updatedFilter);

      dispatch(
        readAppointments({
          params: {
            filter: updatedFilter,
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 15,
          },
        })
      ).then((response: any) => {
        if (response?.payload) {
          setCurrentPageRows(response?.payload?.Appointment);
        }
      });
    }
  }, [router.query]);

  const totalItems = totalCount;
  const itemsPerPage = 15;
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const updateSuccessModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleAppointmentCreate = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.APPOINTMENT_CREATE,
        data: {
          id: id,
        },
      })
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusUpdate = async (
    id: string,
    appointmentStatus: string,
    type: string
  ) => {
    if (type === "appointment") {
      const currentItem = currentPageRows.find((item) => item.id === id);

      if (!currentItem || currentItem.appointmentStatus !== appointmentStatus) {
        const res = await dispatch(
          updateAppointmentStatus({
            data: {
              id: id,
              appointmentStatus:
                staticEnums["AppointmentStatus"][appointmentStatus],
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
            updateSuccessModal();
          }
        }
      }
    }
  };

  const handleScheduleAppointments = (
    id: string,
    leadId: string,
    refID: string,
    date: string,
    startTime: string,
    endTime: string,
    agent: {
      id: string;
      picture: string;
      fullName: string;
    }
  ) => {
    dispatch(
      updateModalType({
        type: ModalType.SCHEDULE_APPOINTMENTS,
        data: {
          id: id,
          leadId: leadId,
          refID: refID,
          date: date,
          startTime: startTime,
          endTime: endTime,
          agent: agent,
        },
      })
    );
  };

  const handleAppointmentsSuccess = () => {
    dispatch(updateModalType({ type: ModalType.APPOINTMENT_SUCCESS }));
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
    [ModalType.SCHEDULE_APPOINTMENTS]: (
      <ScheduleAppointments
        onClose={onClose}
        heading={translate("appointments.reschedule_appointment")}
        onSuccess={handleAppointmentsSuccess}
        onUpdateSuccess={updateSuccessModal}
        isUpdate={true}
        currentPageRows={currentPageRows}
        setCurrentPageRows={setCurrentPageRows}
      />
    ),
    [ModalType.APPOINTMENT_SUCCESS]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("appointments.successs_modal.heading")}
        subHeading={translate("appointments.successs_modal.sub_heading")}
        route={onClose}
        imgSrc={reschudleIcon}
      />
    ),
    [ModalType.APPOINTMENT_CREATE]: <CreateReportModal onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    totalItems,
    handlePageChange,
    itemsPerPage,
    currentPageRows,
    renderModal,
    handleFilterChange,
    filter,
    setFilter,
    loading,
    isLoading,
    currentPage,
    totalCount,
    handleStatusUpdate,
    handleAppointmentCreate,
    handleScheduleAppointments,
    lastPage,
    
  };
};
