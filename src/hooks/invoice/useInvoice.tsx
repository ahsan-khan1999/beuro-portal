import { InvoiceTableRowTypes } from "@/types/invoice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import { useRouter } from "next/router";
import { FilterType } from "@/types";
import {
  readInvoice,
  sendOfferByPost,
  setInvoiceDetails,
} from "@/api/slices/invoice/invoiceSlice";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import { FiltersDefaultValues } from "@/enums/static";
import { useTranslation } from "next-i18next";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";

const useInvoice = () => {
  const { lastPage, invoice, loading, totalCount, invoiceDetails, invoiceSum } =
    useAppSelector((state) => state.invoice);
  const { t: translate } = useTranslation();

  const [currentPageRows, setCurrentPageRows] = useState<
    InvoiceTableRowTypes[]
  >([]);

  const { query } = useRouter();

  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    email: FiltersDefaultValues.None,
    status: FiltersDefaultValues.None,
  });

  const totalItems = totalCount;
  const itemsPerPage = 10;

  const [isSendEmail, setIsSendEmail] = useState(false);
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleFilterChange = (query: FilterType) => {
    setCurrentPage(1);
    // dispatch(
    //   readInvoice({ params: { filter: query, page: currentPage, size: 10 } })
    // ).then((res: any) => {
    //   if (res?.payload) setCurrentPageRows(res?.payload?.Invoice);
    // });
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleNotes = (item: string, e?: React.MouseEvent<HTMLSpanElement>) => {
    if (e) {
      e.stopPropagation();
    }
    const filteredLead = invoice?.filter((item_) => item_.id === item);

    if (filteredLead?.length === 1) {
      dispatch(setInvoiceDetails(filteredLead[0]));
      dispatch(
        readNotes({ params: { type: "invoice", id: filteredLead[0]?.id } })
      );
      dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
    }
  };

  const handleAddNote = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.ADD_NOTE,
        data: { id: id, type: "invoice" },
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
        data: { id: id, type: "invoice", data: note },
      })
    );
  };

  const invoiceCreatedHandler = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
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
        leadDetails={invoiceDetails}
        onEditNote={handleEditNote}
        onConfrimDeleteNote={handleConfirmDeleteNote}
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

    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.offer_created_des")}
        route={onClose}
      />
    ),

    [ModalType.EDIT_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
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
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSendEmail = async () => {
    setIsSendEmail(!isSendEmail);
  };

  const handleSendByPost = async () => {
    const apiData = {
      emailStatus: 2,
      id: invoiceDetails?.id,
    };
    const response = await dispatch(sendOfferByPost({ data: apiData }));
    if (response?.payload) invoiceCreatedHandler();
  };

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

    const queryParams = queryStatus || searchQuery;

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
      } = {
        status: filteredStatus,
      };

      if (searchQuery) {
        updatedFilter.text = searchQuery;
      }

      setFilter(updatedFilter);

      dispatch(
        readInvoice({
          params: {
            filter: updatedFilter,
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Invoice);
      });
    }
  }, [query]);

  return {
    currentPageRows,
    totalItems,
    handlePageChange,
    itemsPerPage,
    handleNotes,
    renderModal,
    handleFilterChange,
    filter,
    setFilter,
    loading,
    isSendEmail,
    handleSendEmail,
    handleSendByPost,
    invoiceDetails,
    currentPage,
    invoiceSum,
  };
};

export default useInvoice;
