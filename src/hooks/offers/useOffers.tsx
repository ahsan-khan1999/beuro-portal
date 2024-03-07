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
  const { lastPage, offer, loading, totalCount, offerDetails } = useAppSelector(
    (state) => state.offer
  );

  const { query } = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (query && query.page) {
      const parsedPage = parseInt(query.page as string, 10);
      if (!isNaN(parsedPage)) {
        setCurrentPage(parsedPage);
      }
    }
  }, [query]);

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
    dispatch(
      readOffer({ params: { filter: query, page: currentPage, size: 10 } })
    ).then((res: any) => {
      if (res?.payload) {
        setCurrentPageRows(res?.payload?.Offer);
      }
    });
  };

  useEffect(() => {
    localStoreUtil.remove_data("offer");
    dispatch(setOfferDetails(DEFAULT_OFFER));
    dispatch(setCustomerDetails(DEFAULT_CUSTOMER));
    dispatch(setLeadDetails(DEFAULT_LEAD));

    // const queryParams = areFiltersEmpty(filter)
    //   ? { filter: {}, page: 1, size: 10 }
    //   : { filter: filter, page: 1, size: 10 };
    // dispatch(readOffer({ params: queryParams })).then((res: any) => {
    //   if (res?.payload) {
    //     setCurrentPageRows(res?.payload?.Offer);
    //   }
    // });
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

      setFilter({
        ...filter,
        status: filteredStatus,
        text: searchQuery,
      });

      dispatch(
        readOffer({
          params: {
            filter: {
              ...filter,
              status: filteredStatus,
              text: searchQuery,
            },
            page: currentPage,
            size: 10,
          },
        })
      ).then((response: any) => {
        if (response?.payload) setCurrentPageRows(response?.payload?.Offer);
      });
    }
  }, [currentPage, query]);

  // useEffect(() => {
  //   const queryStatus = query?.status;
  //   if (queryStatus) {
  //     const filteredStatus =
  //       query?.status === "None"
  //         ? "None"
  //         : queryStatus
  //             .toString()
  //             .split(",")
  //             .filter((item) => item !== "None");
  //     setFilter({
  //       ...filter,
  //       status: filteredStatus,
  //     });

  //     dispatch(
  //       readOffer({
  //         params: {
  //           filter: {
  //             ...filter,
  //             status: filteredStatus,
  //           },
  //           page: currentPage,
  //           size: 10,
  //         },
  //       })
  //     ).then((response: any) => {
  //       if (response?.payload) setCurrentPageRows(response?.payload?.Offer);
  //     });
  //     return;
  //   }
  // }, [currentPage, query]);

  // useEffect(() => {
  //   if (query?.filter || query?.status) {
  //     const queryStatus = query?.status;
  //     console.log(queryStatus?.toString().split(","));

  //     if (queryStatus) {
  //       setFilter({
  //         ...filter,
  //         status: queryStatus.toString().split(","),
  //       });

  //       dispatch(
  //         readOffer({
  //           params: {
  //             filter: {
  //               ...filter,
  //               status: queryStatus.toString().split(","),
  //             },
  //             page: currentPage,
  //             size: 10,
  //           },
  //         })
  //       ).then((response: any) => {
  //         if (response?.payload) setCurrentPageRows(response?.payload?.Offer);
  //       });
  //       return;
  //     }

  //     const statusValue = staticEnums["OfferStatus"][query?.filter as string];
  //     setFilter({
  //       ...filter,
  //       status: [statusValue?.toString()],
  //     });

  //     dispatch(
  //       readOffer({
  //         params: {
  //           filter: {
  //             ...filter,
  //             status: [staticEnums["OfferStatus"][query?.filter as string]],
  //           },
  //           page: currentPage,
  //           size: 10,
  //         },
  //       })
  //     ).then((response: any) => {
  //       if (response?.payload) setCurrentPageRows(response?.payload?.Offer);
  //     });
  //   } else {
  //     setFilter({
  //       ...filter,
  //       status: "None",
  //     });
  //     dispatch(
  //       readOffer({
  //         params: {
  //           filter: { ...filter, status: "None" },
  //           page: currentPage,
  //           size: 10,
  //         },
  //       })
  //     ).then((response: any) => {
  //       if (response?.payload) setCurrentPageRows(response?.payload?.Offer);
  //     });
  //   }
  // }, [currentPage, query?.filter, query?.status]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOfferStatusUpdate = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (type === "offer") {
      const res = await dispatch(
        updateOfferStatus({
          data: {
            id: id,
            offerStatus: staticEnums["OfferStatus"][status],
          },
        })
      );
      if (res?.payload)
        offerCreatedHandler(staticEnums["OfferStatus"][status], id);
    }
  };

  const handlePaymentStatusUpdate = async (
    id: string,
    status: string,
    type: string
  ) => {
    if (type === "offer") {
      const res = await dispatch(
        updatePaymentStatus({
          data: { id: id, paymentType: staticEnums["PaymentType"][status] },
        })
      );
      if (res?.payload) defaultOfferCreatedHandler();
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
    handleOfferStatusUpdate,
    handlePaymentStatusUpdate,
    currentPage,
  };
};

export default useOffers;
