import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { Lead } from "@/types/leads";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import { DEFAULT_LEAD, leads } from "@/utils/static";
import ImagesUpload from "@/base-components/ui/modals1/ImagesUpload";
import ImageSlider from "@/base-components/ui/modals1/ImageSlider";
import { FilterType } from "@/types";
import { readLead, setLeadDetails } from "@/api/slices/lead/leadSlice";
import localStoreUtil from "@/utils/localstore.util";
import { useRouter } from "next/router";
import { readNotes } from "@/api/slices/noteSlice/noteSlice";
import { readImage } from "@/api/slices/imageSlice/image";

const useLeads = () => {
  const { lastPage, lead, loading, totalCount, leadDetails } = useAppSelector(state => state.lead)
  const { images } = useAppSelector(state => state.image)

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<Lead[]>(
    []
  );
  const { query } = useRouter()

  const [filter, setFilter] = useState<FilterType>({
    location: "",
    sortBy: "",
    text: "",
    type: "",
    status: query?.filter as string

  });

  useMemo(() => {
    setFilter({
      ...filter, status: query?.filter as string
    })
  }, [query?.filter])
  useEffect(() => {
    localStoreUtil.remove_data("lead")
    dispatch(setLeadDetails(DEFAULT_LEAD))
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
    item: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    if (e) {
      e.stopPropagation();
    }
    const filteredLead = lead?.filter((item_) => item_.id === item)
    if (filteredLead?.length === 1) {
      dispatch(setLeadDetails(filteredLead[0]));
      dispatch(readNotes({ params: { type: "lead", id: filteredLead[0]?.id } }));
      dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));

    }
  };

  // function for hnadling the add note
  const handleAddNote = (id: string) => {
    dispatch(updateModalType({ type: ModalType.ADD_NOTE, data: { id: id, type: "lead" } }));
  };

  // function for hnadling the add note
  const handleImageSlider = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
    dispatch(updateModalType({ type: ModalType.IMAGE_SLIDER }));
  };

  const handleImageUpload = (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    const filteredLead = lead.find((item_) => item_.id === item)
    if (filteredLead) {
      dispatch(setLeadDetails(filteredLead));
      dispatch(readImage({ params: { type: "leadID", id: filteredLead?.id } }));
      dispatch(updateModalType({ type: ModalType.UPLOAD_IMAGE }));
    }
  };

  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes handleAddNote={handleAddNote} onClose={onClose} leadDetails={leadDetails} />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote onClose={onClose} handleNotes={handleNotes} />
    ),
    [ModalType.UPLOAD_IMAGE]: (
      <ImagesUpload onClose={onClose} handleImageSlider={handleImageSlider} />
    ),
    [ModalType.IMAGE_SLIDER]: <ImageSlider onClose={onClose} details={images} />,
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
    filter,
    setFilter,
  };
};

export default useLeads;
