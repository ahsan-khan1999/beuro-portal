import React, { useEffect, useMemo, useState } from "react";
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
import { readLead, setLeadDetails } from "@/api/slices/lead/leadSlice";
import localStoreUtil from "@/utils/localstore.util";
import { useRouter } from "next/router";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import { readImage, setImages } from "@/api/slices/imageSlice/image";
import { setCustomerDetails } from "@/api/slices/customer/customerSlice";
import { FiltersDefaultValues } from "@/enums/static";
import { useTranslation } from "next-i18next";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";

const useLeads = () => {
  const { lastPage, lead, loading, totalCount, leadDetails } = useAppSelector(
    (state) => state.lead
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<Lead[]>([]);
  const { query } = useRouter();
  const { t: translate } = useTranslation();

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
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

  const totalItems = totalCount;
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleFilterChange = (query: FilterType) => {
    // dispatch(
    //   readLead({ params: { filter: query, page: currentPage, size: 10 } })
    // ).then((res: any) => {
    //   if (res?.payload) {
    //     setCurrentPageRows(res?.payload?.Lead);
    //   }
    // });
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleNotes = (item: string, e?: React.MouseEvent<HTMLSpanElement>) => {
    if (e) {
      e.stopPropagation();
    }

    const filteredLead = lead?.filter((item_) => item_.id === item);

    if (filteredLead?.length === 1) {
      dispatch(setLeadDetails(filteredLead[0]));
      dispatch(
        readNotes({ params: { type: "lead", id: filteredLead[0]?.id } })
      );

      dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
    } else {
      dispatch(updateModalType({ type: ModalType.CREATION }));
    }
  };

  const handleAddNote = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.ADD_NOTE,
        data: { id: id, type: "lead" },
      })
    );
  };

  const handleDeleteNote = async (id: string) => {
    if (!id) return;
    const response = await dispatch(deleteNotes({ data: { id: id } }));
    if (response?.payload)
      dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleEditNote = (id: string, note: string) => {
    dispatch(
      updateModalType({
        type: ModalType.EDIT_NOTE,
        data: { id: id, type: "lead", data: note },
      })
    );
  };

  const defaultUpdateModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleImageUpload = (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    dispatch(setImages([]));
    const filteredLead = lead.find((item_) => item_.id === item);
    if (filteredLead) {
      dispatch(setLeadDetails(filteredLead));
      dispatch(readImage({ params: { type: "leadID", id: filteredLead?.id } }));
      dispatch(updateModalType({ type: ModalType.UPLOAD_IMAGE }));
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
    [ModalType.EDIT_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        handleFilterChange={handleFilterChange}
        filter={filter}
        heading={translate("common.update_note")}
      />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        handleFilterChange={handleFilterChange}
        filter={filter}
        heading={translate("common.add_note")}
      />
    ),
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
        subHeading={translate("common.modals.offer_created_des")}
        route={onClose}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  useEffect(() => {
    // setTimeout(() => {
      const queryStatus = query?.status;
      
      console.log(query, "status");
    if (queryStatus) {
      const filteredStatus =query?.status === "None" ? "None": queryStatus.toString().split(",").filter((item) => item !== "None")
      setFilter({
        ...filter,
        status:  filteredStatus,
      });

      dispatch(
        readLead({
          params: {
            filter: {
              ...filter,
              status: filteredStatus,
            },
            page: currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Lead);
      });
      return;
    }

    // const statusValue = staticEnums["LeadStatus"][query?.filter as string];
    // setFilter({
    //   ...filter,
    //   status: [statusValue?.toString()],
    // });

    // dispatch(
    //   readLead({
    //     params: {
    //       filter: {
    //         ...filter,
    //         status: [staticEnums["LeadStatus"][query?.filter as string]],
    //       },
    //       page: currentPage,
    //       size: 10,
    //     },
    //   })
    // ).then((response: any) => {
    //   if (response?.payload) setCurrentPageRows(response?.payload?.Lead);
    // });
    // } else {
    //   setFilter({
    //     ...filter,
    //     status: "None",
    //   });
    //   dispatch(
    //     readLead({
    //       params: {
    //         filter: { ...filter, status: "None" },
    //         page: currentPage,
    //         size: 10,
    //       },
    //     })
    //   ).then((response: any) => {
    //     if (response?.payload) setCurrentPageRows(response?.payload?.Lead);
    //   });
    // }
    // }, 2000);
  }, [currentPage, query]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    handleNotes,
    handleDeleteNote,
    handleImageUpload,
    renderModal,
    handleFilterChange,
    filter,
    setFilter,
    loading,
    currentPage,
  };
};

export default useLeads;
