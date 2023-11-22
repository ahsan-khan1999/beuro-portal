import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { Lead } from "@/types/leads";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import { leads } from "@/utils/static";
import ImagesUpload from "@/base-components/ui/modals1/ImagesUpload";
import ImageSlider from "@/base-components/ui/modals1/ImageSlider";
import { FilterType } from "@/types";
import { readLead } from "@/api/slices/lead/leadSlice";

const useLeads = () => {
  const { lastPage, lead, loading, totalCount } = useAppSelector(state => state.lead)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<Lead[]>(
    []
  );
  const [filter, setFilter] = useState<FilterType>({
    location: "",
    sortBy: "",
    text: "",
    type: ""
  });
  useEffect(() => {
    dispatch(readLead({ params: { filter: filter, page: 1, size: 10 } })).then((res: any) => {

      if (res?.payload) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentPageRows(res?.payload?.Lead?.slice(startIndex, startIndex + itemsPerPage));
      }
    })
  }, [])

  const totalItems = totalCount;
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const handleFilterChange = (filter: FilterType) => {
    dispatch(readLead({ params: { filter: filter, page: 1, size: 10 } }))
  };

  // Function for close the modal
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  // Function for handling the modal for exiting notes
  const handleNotes = (
    item: Lead,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(updateModalType({type:ModalType.EXISTING_NOTES}));
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
    item: Lead,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();

    dispatch(updateModalType({type:ModalType.UPLOAD_IMAGE}));
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

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(lead?.slice(startIndex, startIndex + itemsPerPage));
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
    handleImageUpload,
    renderModal,
    handleFilterChange,
  };
};

export default useLeads;
