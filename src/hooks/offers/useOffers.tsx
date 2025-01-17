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
import { OfferAccepted } from "@/base-components/ui/modals1/offerAccepted";
import { UploadFile } from "@/base-components/ui/modals1/uploadFile";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";
import { UpdateNote } from "@/base-components/ui/modals1/UpdateNote";

const initialNotes = {
  id: "",
  refID: "",
  name: "",
  heading: "",
};
const initialImages = {
  id: "",
  refID: "",
  name: "",
  heading: "",
  tab: "",
};

const useOffers = () => {
  const { offer, loading, isLoading, totalCount, offerDetails } =
    useAppSelector((state) => state.offer);

  const { query } = useRouter();
  const page = query?.page as unknown as number;
  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const [currentPageRows, setCurrentPageRows] = useState<OffersTableRowTypes[]>(
    []
  );

  const [noteInfo, setNoteInfo] = useState(initialNotes);
  const [imagesInfo, setImagesInfo] = useState(initialImages);

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
    const searchEmailStatus = query?.emailStatus as string;
    const searchNoteType = query?.noteType as string;

    const queryParams =
      queryStatus ||
      searchQuery ||
      sortedValue ||
      searchDate ||
      searchLeadSource ||
      searchEmailStatus ||
      searchNoteType;

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
        noteType?: string;
        date?: {
          $gte?: string;
          $lte?: string;
        };
        leadSource?: string | string[];
        emailStatus?: string;
      } = {
        status: filteredStatus,
      };

      if (
        searchQuery ||
        sortedValue ||
        searchDate ||
        searchLeadSource ||
        searchEmailStatus ||
        searchNoteType
      ) {
        updatedFilter.text = searchQuery;
        updatedFilter.sort = sortedValue;
        updatedFilter.date = searchDate && JSON.parse(searchDate);
        updatedFilter.leadSource = searchLeadSource;
        updatedFilter.emailStatus = searchEmailStatus;
        updatedFilter.noteType = searchNoteType;
      }

      setFilter(updatedFilter);

      dispatch(
        readOffer({
          params: {
            filter: queryParams ? updatedFilter : {},
            page: (Number(parsedPage) || resetPage) ?? currentPage,
            size: 15,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Offer);
      });
    }
  }, [query]);

  useEffect(() => {
    localStoreUtil.remove_data("offer");
    dispatch(setOfferDetails(DEFAULT_OFFER));
    dispatch(setCustomerDetails(DEFAULT_CUSTOMER));
    dispatch(setLeadDetails(DEFAULT_LEAD));
  }, []);

  const [filter, setFilter] = useState<FilterType>({
    text: FiltersDefaultValues.None,
    sort: FiltersDefaultValues.None,
    noteType: FiltersDefaultValues.None,
    date: {
      $gte: FiltersDefaultValues.$gte,
      $lte: FiltersDefaultValues.$lte,
    },
    status: FiltersDefaultValues.None,
    leadSource: FiltersDefaultValues.None,
    emailStatus: FiltersDefaultValues.None,
  });

  const totalItems = totalCount;
  const itemsPerPage = 15;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const handleFilterChange = (query: FilterType) => {
    setCurrentPage(1);
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));

    if (noteInfo.id) {
      setNoteInfo(initialNotes);
    }
    if (imagesInfo.id) {
      setImagesInfo(initialImages);
    }
  };

  const handleBackToNotes = () => {
    if (noteInfo.id)
      handleNotes(
        noteInfo.id,
        noteInfo.refID,
        noteInfo.name,
        noteInfo.heading,
        undefined
      );
  };

  const handleNotes = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    console.log("id:", id);
    if (e) {
      e?.stopPropagation();
    }

    setNoteInfo({
      id: id,
      refID: refID || "",
      name: name || "",
      heading: heading || "",
    });

    dispatch(readNotes({ params: { type: "offer", id: id } }));
    dispatch(
      updateModalType({
        type: ModalType.EXISTING_NOTES,
        data: {
          id: id,
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
  };

  const handleNotesAdded = () => {
    dispatch(updateModalType({ type: ModalType.NOTE_UPDATED_SUCCESS }));
    let found = currentPageRows.find((i) => i.id === noteInfo.id);
    if (!found?.isNoteCreated) {
      setCurrentPageRows((prev) =>
        prev.map((item) =>
          item.id === noteInfo.id ? { ...item, isNoteCreated: true } : item
        )
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
          type: "offer",
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

    if (response?.payload) {
      dispatch(updateModalType({ type: ModalType.NOTE_UPDATED_SUCCESS }));

      dispatch(readNotes({ params: { type: "offer", id: noteInfo.id } })).then(
        (res: any) => {
          if (!res?.payload?.Note?.length) {
            setCurrentPageRows((prev) =>
              prev.map((item) =>
                item.id === noteInfo.id
                  ? { ...item, isNoteCreated: false }
                  : item
              )
            );
          }
        }
      );
    }
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
          type: "offer",
          data: note,
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
  };

  const handleImageUpload = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    console.log("id:", id);
    if (e) {
      e?.stopPropagation();
    }
    if (imagesInfo.tab) {
      setImagesInfo((prev) => ({
        ...prev,
        id: id,
        refID: refID || "",
        name: name || "",
        heading: heading || "",
      }));
    } else {
      setImagesInfo({
        id: id,
        refID: refID || "",
        name: name || "",
        heading: heading || "",
        tab: "",
      });
    }
    dispatch(setImages([]));

    dispatch(readImage({ params: { type: "offerID", id: id } }));

    dispatch(
      updateModalType({
        type: ModalType.UPLOAD_OFFER_IMAGE,
        data: {
          id: id,
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
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

  const defaultSuccessModal = () => {
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
  const handleNotesUpdated = () => {
    dispatch(updateModalType({ type: ModalType.NOTE_UPDATED_SUCCESS }));
  };

  const handleConfirmDeleteNote = (id: string) => {
    dispatch(
      updateModalType({ type: ModalType.CONFIRM_DELETE_NOTE, data: id })
    );
  };

  const handleCancelNote = () => {
    dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
  };

  const handleBackToImages = () => {
    console.log("imagesInfo:", imagesInfo);
    if (imagesInfo.id)
      handleImageUpload(
        imagesInfo.id,
        imagesInfo.refID,
        imagesInfo.name,
        imagesInfo.heading,
        undefined
      );
  };

  const updateSuccessModal = (tab?: string) => {
    dispatch(updateModalType({ type: ModalType.UPLOAD_SUCCESS }));
    if (tab) {
      setImagesInfo((prev) => ({ ...prev, tab }));
    }
  };

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
            defaultSuccessModal();
          }
        }
      }
    }
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
    [ModalType.NOTE_UPDATED_SUCCESS]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.update_success")}
        route={handleBackToNotes}
      />
    ),
    [ModalType.EDIT_NOTE]: (
      <UpdateNote
        onClose={handleBackToNotes}
        handleNotes={handleNotesUpdated}
        handleFilterChange={handleFilterChange}
        filter={filter}
        mainHeading={translate("common.update_note")}
      />
    ),
    [ModalType.CONFIRM_DELETE_NOTE]: (
      <ConfirmDeleteNote
        onClose={handleBackToNotes}
        modelHeading={translate("common.modals.delete_note")}
        onDeleteNote={handleDeleteNote}
        loading={loading}
        onCancel={handleCancelNote}
      />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote
        onClose={handleBackToNotes}
        handleNotes={handleNotesAdded}
        handleFilterChange={handleFilterChange}
        filter={filter}
        mainHeading={translate("common.add_note")}
      />
    ),
    [ModalType.UPLOAD_OFFER_IMAGE]: (
      <ImagesUploadOffer
        onClose={onClose}
        type={"Offer"}
        onUpdateDetails={() => {}}
        handleImageSlider={updateSuccessModal}
        tab={imagesInfo.tab}
      />
    ),
    [ModalType.UPLOAD_SUCCESS]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.offer_created_des")}
        route={handleBackToImages}
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
        onFileUploadSuccess={defaultSuccessModal}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
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
    totalCount,
  };
};

export default useOffers;
