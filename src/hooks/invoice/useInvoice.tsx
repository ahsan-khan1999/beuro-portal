import { InvoiceTableRowTypes } from "@/types/invoice";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import { useRouter } from "next/router";
import { FilterType } from "@/types";
import { readInvoice, setInvoiceDetails } from "@/api/slices/invoice/invoiceSlice";
import { readNotes } from "@/api/slices/noteSlice/noteSlice";

const useInvoice = () => {
  const { lastPage, invoice, loading, totalCount, invoiceDetails } = useAppSelector(state => state.invoice)

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<InvoiceTableRowTypes[]>(
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
  const totalItems = totalCount;

  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);
  useMemo(() => {
    setFilter({
      ...filter, status: query?.filter as string
    })
  }, [query?.filter])

  useEffect(() => {


    dispatch(readInvoice({ params: { filter: filter, page: 1, size: 10 } })).then((res: any) => {

      if (res?.payload) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setCurrentPageRows(res?.payload?.Invoice?.slice(startIndex, startIndex + itemsPerPage));
      }
    })
  }, [])
  const handleFilterChange = (filter: FilterType) => {
    dispatch(readInvoice({ params: { filter: filter, page: 1, size: 10 } }))
  };
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };
  const handleNotes = (
    item: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    if (e) {
      e.stopPropagation();
    }
    const filteredLead = invoice?.filter((item_) => item_.id === item)
    
    if (filteredLead?.length === 1) {
      dispatch(setInvoiceDetails(filteredLead[0]));
      dispatch(readNotes({ params: { type: "invoice", id: filteredLead[0]?.id } }));
      dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));

    }
  };

  // function for hnadling the add note
  const handleAddNote = (id: string) => {
    dispatch(updateModalType({ type: ModalType.ADD_NOTE, data: { id: id, type: "invoice" } }));
  };

  // function for hnadling the add note
  // const handleImageSlider = () => {
  //   dispatch(updateModalType({ type: ModalType.NONE }));
  //   dispatch(updateModalType({ type: ModalType.IMAGE_SLIDER }));
  // };

  // const handleImageUpload = (
  //   item: string,
  //   e: React.MouseEvent<HTMLSpanElement>
  // ) => {
  //   e.stopPropagation();
  //   const filteredLead = invoice?.filter((item_) => item_.id === item)
  //   if (filteredLead?.length === 1) dispatch(setInvoiceDetails(filteredLead[0]));
  //   dispatch(updateModalType({ type: ModalType.UPLOAD_OFFER_IMAGE }));
  // };


  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes handleAddNote={handleAddNote} onClose={onClose} leadDetails={invoiceDetails} />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote onClose={onClose} handleNotes={handleNotes} />
    ),
    // [ModalType.UPLOAD_OFFER_IMAGE]: (
    //   <ImagesUploadOffer onClose={onClose} handleImageSlider={handleImageSlider} type={"Contract"}/>
    // ),
    // [ModalType.IMAGE_SLIDER]: <ImageSliderContract onClose={onClose} details={contractDetails}/>,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(invoice?.slice(startIndex, startIndex + itemsPerPage));
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
    // handleImageUpload,
    handleFilterChange,
    filter,
    setFilter,
    loading,
  };
};

export default useInvoice;
