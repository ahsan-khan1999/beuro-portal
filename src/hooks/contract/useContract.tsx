import { contractTableTypes } from "@/types/contract";
import { contractData } from "@/utils/static";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import ImagesUpload from "@/base-components/ui/modals1/ImagesUpload";
import ImageSlider from "@/base-components/ui/modals1/ImageSlider";

const useContract = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<contractTableTypes[]>(
    []
  );
  const totalItems = contractData.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      contractData.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  // Function for close the modal
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  // Function for handling the modal for exiting notes
  const handleNotes = (
    item: contractTableTypes,
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.EXISTING_NOTES));
  };

  // function for hnadling the add note
  const handleAddNote = () => {
    dispatch(updateModalType(ModalType.ADD_NOTE));
  };

  // function for hnadling the add note
  const handleImageSlider = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.IMAGE_SLIDER));
  };

  const handleImageUpload = (
    item: contractTableTypes,
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    e.stopPropagation();
    dispatch(updateModalType(ModalType.NONE));

    dispatch(updateModalType(ModalType.UPLOAD_IMAGE));
  };

  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes handleAddNote={handleAddNote} onClose={onClose} />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote onClose={onClose} handleNotes={handleNotes} />
    ),
    [ModalType.UPLOAD_IMAGE]: (
      <ImagesUpload onClose={onClose} handleImageSlider={handleImageSlider} />
    ),
    [ModalType.IMAGE_SLIDER]: <ImageSlider onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    handleImageUpload,
    handleNotes,
    renderModal,
  };
};

export default useContract;
