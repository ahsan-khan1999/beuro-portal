import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { Lead } from "@/types/leads";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import { DEFAULT_CUSTOMER, DEFAULT_LEAD, staticEnums } from "@/utils/static";
import ImagesUpload from "@/base-components/ui/modals1/ImagesUpload";
import { FilterType } from "@/types";
import {
  readLead,
  setLeadDetails,
  updateLeadStatus,
} from "@/api/slices/lead/leadSlice";
import localStoreUtil from "@/utils/localstore.util";
import { useRouter } from "next/router";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import { readImage, setImages } from "@/api/slices/imageSlice/image";
import { setCustomerDetails } from "@/api/slices/customer/customerSlice";
import { FiltersDefaultValues } from "@/enums/static";
import { useTranslation } from "next-i18next";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";
import { UpdateNote } from "@/base-components/ui/modals1/UpdateNote";
import { Appointments } from "@/types/appointments";
import { ScheduleAppointments } from "@/base-components/ui/modals1/ScheduleAppointments";
import reschudleIcon from "@/assets/pngs/reschdule-icon.png";

export const useAppointments = () => {
  const { lastPage, lead, loading, isLoading, totalCount, leadDetails } =
    useAppSelector((state) => state.lead);

  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const [currentPageRows, setCurrentPageRows] = useState<Appointments[]>([]);
  const { t: translate } = useTranslation();

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
    localStoreUtil.remove_data("lead");
    dispatch(setLeadDetails(DEFAULT_LEAD));
    dispatch(setCustomerDetails(DEFAULT_CUSTOMER));
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
        readLead({
          params: {
            filter: updatedFilter,
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 15,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Lead);
      });
    }
  }, [query]);

  const totalItems = totalCount;
  const itemsPerPage = 15;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  // const handleNotes = (
  //   id: string,
  //   refID?: string,
  //   name?: string,
  //   heading?: string,
  //   e?: React.MouseEvent<HTMLSpanElement>
  // ) => {
  //   e?.stopPropagation();

  //   const filteredLead = lead?.filter((item_) => item_.id === id);
  //   if (filteredLead?.length === 1) {
  //     dispatch(setLeadDetails(filteredLead[0]));
  //     dispatch(
  //       readNotes({ params: { type: "lead", id: filteredLead[0]?.id } })
  //     ).then((res: any) => {
  //       if (res.payload.Note?.length > 0) {
  //         setCurrentPageRows((prev) => {
  //           const updatedLeads = prev.map((item) => {
  //             if (item.id === filteredLead[0]?.id) {
  //               const lead: Appointments = {
  //                 ...item,
  //                 isNoteCreated: true,
  //               };
  //               return lead;
  //             }
  //             return item;
  //           });
  //           return updatedLeads;
  //         });
  //       }
  //     });
  //     dispatch(
  //       updateModalType({
  //         type: ModalType.EXISTING_NOTES,
  //         data: {
  //           refID: refID,
  //           name: name,
  //           heading: heading,
  //         },
  //       })
  //     );
  //   } else {
  //     dispatch(updateModalType({ type: ModalType.CREATION }));
  //   }
  // };

  const handleAddNote = (
    id: string,
    refID: string,
    name: string,
    heading: string
  ) => {
    dispatch(
      updateModalType({
        type: ModalType.ADD_NOTE,
        data: {
          id: id,
          type: "lead",
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
  };

  const handleDeleteNote = async (id: string) => {
    if (!id) return;
    const response = await dispatch(deleteNotes({ data: { id: id } }));
    if (response?.payload)
      dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleEditNote = (
    id: string,
    note: string,
    refID: string,
    name: string,
    heading: string
  ) => {
    dispatch(
      updateModalType({
        type: ModalType.EDIT_NOTE,
        data: {
          id: id,
          type: "lead",
          data: note,
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
  };

  const defaultUpdateModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleImageUpload = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    e?.stopPropagation();
    dispatch(setImages([]));
    const filteredLead = lead.find((item_) => item_.id === id);

    if (filteredLead) {
      dispatch(setLeadDetails(filteredLead));
      dispatch(
        readImage({ params: { type: "leadID", id: filteredLead?.id } })
      ).then((res: any) => {
        if (
          res.payload?.images.length > 0 ||
          res.payload?.attachments.length > 0 ||
          res.payload?.videos.length > 0 ||
          res.payload?.links.length > 0
        ) {
          setCurrentPageRows((prev) =>
            prev.map((lead) => {
              return lead.id === filteredLead?.id
                ? { ...lead, isImageAdded: true }
                : lead;
            })
          );
        }
      });
      dispatch(
        updateModalType({
          type: ModalType.UPLOAD_IMAGE,
          data: {
            refID: refID,
            name: name,
            heading: heading,
          },
        })
      );
    }
  };

  const handleConfirmDeleteNote = (id: string) => {
    dispatch(
      updateModalType({ type: ModalType.CONFIRM_DELETE_NOTE, data: id })
    );
  };

  const handleCancelNote = () => {
    dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
  };

  const handleScheduleAppointments = () => {
    dispatch(updateModalType({ type: ModalType.SCHEDULE_APPOINTMENTS }));
  };

  const handleAppointmentsSuccess = () => {
    dispatch(updateModalType({ type: ModalType.APPOINTMENT_SUCCESS }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes
        handleAddNote={handleAddNote}
        onClose={onClose}
        leadDetails={leadDetails}
        onEditNote={handleEditNote}
        onConfrimDeleteNote={handleConfirmDeleteNote}
      />
    ),
    // [ModalType.EDIT_NOTE]: (
    //   <UpdateNote
    //     onClose={onClose}
    //     handleNotes={handleNotes}
    //     handleFilterChange={handleFilterChange}
    //     filter={filter}
    //     mainHeading={translate("common.update_note")}
    //   />
    // ),
    // [ModalType.ADD_NOTE]: (
    //   <AddNewNote
    //     onClose={onClose}
    //     handleNotes={handleNotes}
    //     handleFilterChange={handleFilterChange}
    //     filter={filter}
    //     mainHeading={translate("common.add_note")}
    //   />
    // ),
    [ModalType.CONFIRM_DELETE_NOTE]: (
      <ConfirmDeleteNote
        onClose={onClose}
        modelHeading={translate("common.modals.delete_note")}
        onDeleteNote={handleDeleteNote}
        loading={loading}
        onCancel={handleCancelNote}
      />
    ),
    [ModalType.UPLOAD_IMAGE]: (
      <ImagesUpload onClose={onClose} handleImageSlider={defaultUpdateModal} />
    ),
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
        heading={translate("appointments.schedule_appointment")}
        onSuccess={handleAppointmentsSuccess}
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
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const handleLeadStatusUpdate = async (
  //   id: string,
  //   status: string,
  //   type: string
  // ) => {
  //   if (type === "lead") {
  //     const currentItem = currentPageRows.find((item) => item.id === id);
  //     if (!currentItem || currentItem.leadStatus !== status) {
  //       const res = await dispatch(
  //         updateLeadStatus({
  //           data: {
  //             id: id,
  //             leadStatus: staticEnums["LeadStatus"][status],
  //           },
  //         })
  //       );

  //       if (res?.payload) {
  //         let index = currentPageRows.findIndex(
  //           (item) => item.id === res.payload?.id
  //         );

  //         if (index !== -1) {
  //           let prevPageRows = [...currentPageRows];
  //           prevPageRows.splice(index, 1, res.payload);
  //           setCurrentPageRows(prevPageRows);
  //           defaultUpdateModal();
  //         }
  //       }
  //     }
  //   }
  // };

  const handleAppointmentStatusUpdate = () => {
    console.log("handleAppointmentStatusUpdate");
  };

  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    // handleNotes,
    handleDeleteNote,
    handleImageUpload,
    renderModal,
    handleFilterChange,
    filter,
    setFilter,
    loading,
    isLoading,
    currentPage,
    handleAppointmentStatusUpdate,
    totalCount,
    handleScheduleAppointments,
  };
};
