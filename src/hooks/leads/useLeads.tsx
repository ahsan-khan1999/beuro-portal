import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { LeadsTableRowTypes } from "@/types/leads";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import { leads } from "@/utils/static";

const useLeads = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<LeadsTableRowTypes[]>(
    []
  );
  const totalItems = leads.length;
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  // Function for close the modal
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  // Function for handling the modal for exiting notes
  const handleNotes = (item: LeadsTableRowTypes) => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.EXISTING_NOTES));
  };

  // function for hnadling the add note
  const handleAddNote = () => {
    dispatch(updateModalType(ModalType.ADD_NOTE));
  };

  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes handleAddNote={handleAddNote} onClose={onClose} />
    ),
    [ModalType.ADD_NOTE]: <AddNewNote onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(leads.slice(startIndex, startIndex + itemsPerPage));
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    handleNotes,
    renderModal,
  };
};

export default useLeads;
