import {
  DEFAULT_CUSTOMER,
  DEFAULT_LEAD,
  DEFAULT_OFFER,
  staticEnums,
} from "@/utils/static";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import { OffersTableRowTypes } from "@/types/offers";
import { useRouter } from "next/router";
import { FilterType } from "@/types";
import localStoreUtil from "@/utils/localstore.util";
import {
  readOffer,
  setOfferDetails,
  updateOfferStatus,
  updatePaymentStatus,
} from "@/api/slices/offer/offerSlice";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import { setCustomerDetails } from "@/api/slices/customer/customerSlice";
import { setLeadDetails } from "@/api/slices/lead/leadSlice";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import { readImage, setImages } from "@/api/slices/imageSlice/image";
import { FiltersDefaultValues } from "@/enums/static";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { useTranslation } from "next-i18next";
import { OfferAccepted } from "@/base-components/ui/modals1/offerAccepted";
import { UploadFile } from "@/base-components/ui/modals1/uploadFile";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";

const useOffers = () => {
  const { lastPage, offer, loading, isLoading, totalCount, offerDetails } =
    useAppSelector((state) => state.offer);

  const { query } = useRouter();

  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const [currentPageRows, setCurrentPageRows] = useState<OffersTableRowTypes[]>(
    []
  );

  const { t: translate } = useTranslation();

  const [filter, setFilter] = useState<FilterType>({
    text: FiltersDefaultValues.None,
    sort: FiltersDefaultValues.None,
    date: {
      $gte: FiltersDefaultValues.$gte,
      $lte: FiltersDefaultValues.$lte,
    },
    status: FiltersDefaultValues.None,
    leadSource: FiltersDefaultValues.None,
  });

  const totalItems = totalCount;
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleFilterChange = (query: FilterType) => {
    setCurrentPage(1);
    // dispatch(
    //   readOffer({ params: { filter: query, page: 1, size: 10 } })
    // ).then((res: any) => {
    //   if (res?.payload) {
    //     setCurrentPageRows(res?.payload?.Offer);
    //   }
    // });
  };

  useEffect(() => {
    localStoreUtil.remove_data("offer");
    dispatch(setOfferDetails(DEFAULT_OFFER));
    dispatch(setCustomerDetails(DEFAULT_CUSTOMER));
    dispatch(setLeadDetails(DEFAULT_LEAD));
  }, []);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleNotes = (item: string, e?: React.MouseEvent<HTMLSpanElement>) => {
    if (e) {
      e.stopPropagation();
    }

    const filteredLead = offer?.filter((item_) => item_.id === item);
    if (filteredLead?.length === 1) {
      dispatch(setOfferDetails(filteredLead[0]));
      dispatch(
        readNotes({ params: { type: "offer", id: filteredLead[0]?.id } })
      );
      dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
    }
  };

  const handleAddNote = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.ADD_NOTE,
        data: { id: id, type: "offer" },
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
        data: { id: id, type: "offer", data: note },
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
    const filteredLead = offer?.find((item_) => item_.id === item);
    if (filteredLead) {
      dispatch(setOfferDetails(filteredLead));
      dispatch(
        readImage({ params: { type: "offerID", id: filteredLead?.id } })
      );
      dispatch(updateModalType({ type: ModalType.UPLOAD_OFFER_IMAGE }));
    }
  };

  const offerCreatedHandler = (offerStatus: any, id: string) => {
    switch (offerStatus) {
      case staticEnums["OfferStatus"]["Open"]:
        dispatch(updateModalType({ type: ModalType.CREATION }));
        break;
      case staticEnums["OfferStatus"]["Accepted"]:
        dispatch(updateModalType({ type: ModalType.OFFER_ACCEPTED, data: id }));
        break;
      case staticEnums["OfferStatus"]["Expired"]:
        dispatch(updateModalType({ type: ModalType.CREATION }));
        break;
      case staticEnums["OfferStatus"]["Rejected"]:
        dispatch(updateModalType({ type: ModalType.OFFER_REJECTED }));
        break;

      default:
        break;
    }
    handleFilterChange(filter);
  };

  const defaultOfferCreatedHandler = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleUploadFile = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.UPLOAD_FILE,
        data: id,
      })
    );
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
        leadDetails={offerDetails}
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
    [ModalType.CONFIRM_DELETE_NOTE]: (
      <ConfirmDeleteNote
        onClose={onClose}
        modelHeading={translate("common.modals.delete_note")}
        onDeleteNote={handleDeleteNote}
        loading={loading}
        onCancel={handleCancelNote}
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
        type={"Offer"}
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
    [ModalType.OFFER_REJECTED]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.offer_rejected_des")}
        route={onClose}
      />
    ),
    [ModalType.OFFER_ACCEPTED]: (
      <OfferAccepted
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.offer_created_des")}
        route={onClose}
        onFileUpload={handleUploadFile}
      />
    ),
    [ModalType.UPLOAD_FILE]: (
      <UploadFile
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        onFileUploadSuccess={defaultOfferCreatedHandler}
      />
    ),
    // [ModalType.IMAGE_SLIDER]: (
    //   <ImageSlider onClose={onClose} details={images} />
    // ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
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
    const searchDate = query?.date as string;
    const searchLeadSource = query?.leadSource;

    const queryParams =
      queryStatus ||
      searchQuery ||
      sortedValue ||
      searchDate ||
      searchLeadSource;

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
        date?: {
          $gte?: string;
          $lte?: string;
        };
        leadSource?: string | string[];
      } = {
        status: filteredStatus,
        // date: searchDate as {
        //   $gte?: string;
        //   $lte?: string;
        // },
      };

      if (searchQuery || sortedValue || searchDate || searchLeadSource) {
        updatedFilter.text = searchQuery;
        updatedFilter.sort = sortedValue;
        updatedFilter.date = searchDate && JSON.parse(searchDate);
        updatedFilter.leadSource = query?.leadSource;
      }

      setFilter(updatedFilter);

      dispatch(
        readOffer({
          params: {
            filter: queryParams ? updatedFilter : {},
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Offer);
      });
    }
  }, [query]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOfferStatusUpdate = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (type === "offer") {
      const currentItem = currentPageRows.find((item) => item.id === id);
      if (!currentItem || currentItem.offerStatus !== status) {
        const res = await dispatch(
          updateOfferStatus({
            data: {
              id: id,
              offerStatus: staticEnums["OfferStatus"][status],
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
            offerCreatedHandler(staticEnums["OfferStatus"][status], id);
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
    if (type === "offer") {
      const currentItem = currentPageRows.find((item) => item.id === id);
      if (!currentItem || currentItem.paymentType !== status) {
        const res = await dispatch(
          updatePaymentStatus({
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
            defaultOfferCreatedHandler();
          }
        }
      }
    }
  };

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
    handleOfferStatusUpdate,
    handlePaymentStatusUpdate,
    currentPage,
  };
};

export default useOffers;
