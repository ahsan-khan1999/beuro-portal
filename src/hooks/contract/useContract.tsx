import { contractTableTypes } from "@/types/contract";
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
  readContract,
  setContractDetails,
  updateContractPaymentStatus,
  updateContractStatus,
} from "@/api/slices/contract/contractSlice";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import { readImage, setImages } from "@/api/slices/imageSlice/image";
import { FiltersDefaultValues } from "@/enums/static";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";

const useContract = () => {
  const {
    lastPage,
    contract,
    loading,
    isLoading,
    totalCount,
    contractDetails,
  } = useAppSelector((state) => state.contract);

  const { t: translate } = useTranslation();
  const [currentPageRows, setCurrentPageRows] = useState<contractTableTypes[]>(
    []
  );

  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const [filter, setFilter] = useState<FilterType>({
    sort: FiltersDefaultValues.None,
    text: FiltersDefaultValues.None,
    // date: {
    //   $gte: FiltersDefaultValues.None,
    //   $lte: FiltersDefaultValues.None,
    // },
    status: FiltersDefaultValues.None,
    leadSource: FiltersDefaultValues.None,
  });

  const totalItems = totalCount;
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleFilterChange = (filter: FilterType) => {
    setCurrentPage(1);
    // dispatch(
    //   readContract({ params: { filter: filter, page: currentPage, size: 10 } })
    // ).then((res: any) => {
    //   if (res?.payload) {
    //     setCurrentPageRows(res?.payload?.Contract);
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

    const filteredLead = contract?.filter((item_) => item_.id === item);

    if (filteredLead?.length === 1) {
      dispatch(setContractDetails(filteredLead[0]));
      dispatch(
        readNotes({ params: { type: "contract", id: filteredLead[0]?.id } })
      );
      dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
    }
  };

  const handleAddNote = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.ADD_NOTE,
        data: { id: id, type: "contract" },
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
        data: { id: id, type: "contract", data: note },
      })
    );
  };

  const handleImageSlider = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleImageUpload = (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    dispatch(setImages([]));

    const filteredLead = contract?.find((item_) => item_.id === item);
    if (filteredLead) {
      dispatch(setContractDetails(filteredLead));
      dispatch(
        readImage({ params: { type: "contractID", id: filteredLead?.id } })
      );
      dispatch(updateModalType({ type: ModalType.UPLOAD_OFFER_IMAGE }));
    }
  };

  const contractHandler = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
    handleFilterChange(filter);
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
        leadDetails={contractDetails}
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
    [ModalType.EDIT_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        handleFilterChange={handleFilterChange}
        filter={filter}
        heading={translate("common.add_note")}
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
    [ModalType.UPLOAD_OFFER_IMAGE]: (
      <ImagesUploadOffer
        onClose={onClose}
        handleImageSlider={handleImageSlider}
        type={"Contract"}
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
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleContractStatusUpdate = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (type === "contracts") {
      const currentItem = currentPageRows.find((item) => item.id === id);
      if (!currentItem || currentItem.contractStatus !== status) {
        const res = await dispatch(
          updateContractStatus({
            data: {
              id: id,
              contractStatus: staticEnums["ContractStatus"][status],
            },
          })
        );
        if (res?.payload) {
          let index = currentPageRows.findIndex(
            (item) => item.id === res.payload?.id
          );

          if (index !== -1) {
            let prevPageRows = [...currentPageRows];
            prevPageRows.splice(index, 1, res.payload);
            setCurrentPageRows(prevPageRows);
            contractHandler();
          }
        }
      }
    }
  };

  const handlePaymentStatusUpdate = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (type === "contracts") {
      const currentItem = currentPageRows.find((item) => item.id === id);
      if (!currentItem || currentItem.paymentType !== status) {
        const res = await dispatch(
          updateContractPaymentStatus({
            data: { id: id, paymentType: staticEnums["PaymentType"][status] },
          })
        );

        if (res?.payload) {
          let index = currentPageRows.findIndex(
            (item) => item.id === res.payload?.id
          );

          if (index !== -1) {
            let prevPageRows = [...currentPageRows];
            prevPageRows.splice(index, 1, res.payload);
            setCurrentPageRows(prevPageRows);
            contractHandler();
          }
        }
      }
    }
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
    const sortedValue = query?.sort as string;

    const queryParams = queryStatus || searchQuery || sortedValue;

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
      } = {
        status: filteredStatus,
      };

      if (searchQuery || sortedValue) {
        updatedFilter.text = searchQuery;
        updatedFilter.sort = sortedValue;
      }

      setFilter(updatedFilter);

      dispatch(
        readContract({
          params: {
            filter: updatedFilter,
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Contract);
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
    handleImageUpload,
    handleFilterChange,
    filter,
    setFilter,
    loading,
    isLoading,
    handleContractStatusUpdate,
    handlePaymentStatusUpdate,
    currentPage,
  };
};

export default useContract;
