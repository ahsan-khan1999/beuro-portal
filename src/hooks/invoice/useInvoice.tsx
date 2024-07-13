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
  downloadInvoiceReports,
  invoiceCalculation,
  readInvoice,
  sendOfferByPost,
  setInvoiceDetails,
} from "@/api/slices/invoice/invoiceSlice";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import { FiltersDefaultValues } from "@/enums/static";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";
import { UpdateNote } from "@/base-components/ui/modals1/UpdateNote";
import localStoreUtil from "@/utils/localstore.util";
import { DEFAULT_INVOICE } from "@/utils/static";
import { downloadFile } from "@/utils/utility";

const useInvoice = () => {
  const {
    lastPage,
    invoice,
    loading,
    isLoading,
    totalCount,
    invoiceDetails,
    invoiceSum,
  } = useAppSelector((state) => state.invoice);

  const router = useRouter();

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
    const searchNoteType = router.query?.noteType as string;
    const searchDate = router.query?.date as string;
    const searchPayment = router.query?.paymentType;

    const queryParams =
      queryStatus ||
      searchQuery ||
      sortedValue ||
      searchNoteType ||
      searchDate ||
      searchPayment;

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
        paymentType?: string | string[];
      } = {
        status: filteredStatus,
      };

      if (
        searchQuery ||
        sortedValue ||
        searchNoteType ||
        searchDate ||
        searchPayment
      ) {
        updatedFilter.text = searchQuery;
        updatedFilter.sort = sortedValue;
        updatedFilter.noteType = searchNoteType;
        updatedFilter.date = searchDate && JSON.parse(searchDate);
        updatedFilter.paymentType = searchPayment;
      }

      setFilter(updatedFilter);

      dispatch(
        readInvoice({
          params: {
            filter: updatedFilter,
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 15,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Invoice);
      });

      let calculationFilter: {
        date?: {
          $gte?: string;
          $lte?: string;
        };
        paymentType?: string | string[];
      } = {
        date: updatedFilter.date,
        paymentType: updatedFilter.paymentType,
      };

      if (updatedFilter.date || updatedFilter.paymentType) {
        calculationFilter.date = updatedFilter.date;
        calculationFilter.paymentType = updatedFilter.paymentType;
      }

      dispatch(
        invoiceCalculation({
          params: {
            filter: calculationFilter,
          },
        })
      );
    }
  }, [router.query]);

  const [currentPageRows, setCurrentPageRows] = useState<
    InvoiceTableRowTypes[]
  >([]);

  const page = router.query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    noteType: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    date: {
      $gte: FiltersDefaultValues.None,
      $lte: FiltersDefaultValues.None,
    },
    status: FiltersDefaultValues.None,
    sending: FiltersDefaultValues.None,
    paymentType: "0",
  });

  const totalItems = totalCount;
  const itemsPerPage = 15;

  const [isSendEmail, setIsSendEmail] = useState(false);
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleFilterChange = (query: FilterType) => {
    setCurrentPage(1);
  };

  useEffect(() => {
    localStoreUtil.remove_data("invoice");
    dispatch(setInvoiceDetails(DEFAULT_INVOICE));
  }, []);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleNotes = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    e?.stopPropagation();

    const filteredLead = invoice?.filter((item_) => item_.id === id);

    if (filteredLead?.length === 1) {
      dispatch(setInvoiceDetails(filteredLead[0]));
      dispatch(
        readNotes({ params: { type: "invoice", id: filteredLead[0]?.id } })
      ).then((res: any) => {
        if (res.payload.Note?.length > 0) {
          setCurrentPageRows((prev) => {
            const updatedInvoices = prev.map((item) => {
              if (item.id === filteredLead[0]?.id) {
                const invoice: InvoiceTableRowTypes = {
                  ...item,
                  isNoteCreated: true,
                };
                return invoice;
              }
              return item;
            });
            return updatedInvoices;
          });
        }
      });
      dispatch(
        updateModalType({
          type: ModalType.EXISTING_NOTES,
          data: {
            refID: refID,
            name: name,
            heading: heading,
          },
        })
      );
    }
  };

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
          type: "invoice",
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
          type: "invoice",
          data: note,
          refID: refID,
          name: name,
          heading: heading,
        },
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
        subHeading={translate("common.modals.update_success")}
        route={onClose}
      />
    ),

    [ModalType.EDIT_NOTE]: (
      <UpdateNote
        onClose={onClose}
        handleNotes={handleNotes}
        mainHeading={translate("common.update_note")}
      />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        handleFilterChange={handleFilterChange}
        filter={filter}
        mainHeading={translate("common.add_note")}
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

  const handleDownloadInvoiceReport = async () => {
    const response = await dispatch(
      downloadInvoiceReports({
        params: {
          filter: { date: filter["date"], paymentType: filter["paymentType"] },
        },
      })
    );
    if (response.payload) {
      downloadFile(response.payload?.excelFile);
    }
  };

  // const handleCalculateInvoice = async () => {
  //   const response = await dispatch(
  //     invoiceCalculation({
  //       params: {
  //         filter: { status: filter["status"] },
  //       },
  //     })
  //   );
  //   if (response.payload) {
  //     downloadFile(response.payload?.excelFile);
  //   }
  // };

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
    isLoading,
    isSendEmail,
    handleSendEmail,
    handleSendByPost,
    invoiceDetails,
    currentPage,
    invoiceSum,
    translate,
    handleDownloadInvoiceReport,
    totalCount,
    router,
  };
};

export default useInvoice;
