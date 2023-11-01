import { offersData } from "@/utils/static";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import { OffersTableRowTypes } from "@/types/offers";

const useOffers = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<OffersTableRowTypes[]>(
    []
  );

  const totalItems = offersData.length;
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleAddNote = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.ADD_NOTE));
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes handleAddNote={handleAddNote} onClose={onClose} />
    ),
    [ModalType.ADD_NOTE]: <AddNewNote onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleNotes = (item: OffersTableRowTypes) => {
    dispatch(updateModalType(ModalType.EXISTING_NOTES));
  };

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(offersData.slice(startIndex, startIndex + itemsPerPage));
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

export default useOffers;
