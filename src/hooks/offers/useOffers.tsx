import { DEFAULT_CUSTOMER, DEFAULT_LEAD, DEFAULT_OFFER } from "@/utils/static";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import { OffersTableRowTypes } from "@/types/offers";
import ImagesUpload from "@/base-components/ui/modals1/ImagesUpload";
import ImageSlider from "@/base-components/ui/modals1/ImageSlider";
import { useRouter } from "next/router";
import { FilterType } from "@/types";
import localStoreUtil from "@/utils/localstore.util";
import { readOffer, setOfferDetails } from "@/api/slices/offer/offerSlice";
import { readNotes } from "@/api/slices/noteSlice/noteSlice";
import { setCustomerDetails } from "@/api/slices/customer/customerSlice";
import { setLeadDetails } from "@/api/slices/lead/leadSlice";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import { readImage, setImages } from "@/api/slices/imageSlice/image";
import { areFiltersEmpty } from "@/utils/utility";

const useOffers = () => {
  const { lastPage, offer, loading, totalCount, offerDetails } = useAppSelector(
    (state) => state.offer
  );
  const { images } = useAppSelector((state) => state.image);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRows, setCurrentPageRows] = useState<OffersTableRowTypes[]>(
    []
  );

  const { query } = useRouter();

  const [filter, setFilter] = useState<FilterType>({
    // location: "",
    sort: "",
    text: "",
    date: {
      $gte: "",
      $lte: "",
    },
    // email: [],
    // payment: "",
    // price: [],
    status: undefined,
  });
  const totalItems = totalCount;

  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);
  // useMemo(() => {
  //   setFilter({
  //     ...filter,
  //     status: query?.filter as string,
  //   });
  // }, [query?.filter]);
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
  const handleFilterChange = (query: FilterType) => {
    dispatch(
      readOffer({ params: { filter: query, page: currentPage, size: 10 } })
    );
  };
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

  // function for hnadling the add note
  const handleAddNote = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.ADD_NOTE,
        data: { id: id, type: "offer" },
      })
    );
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

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes
        handleAddNote={handleAddNote}
        onClose={onClose}
        leadDetails={offerDetails}
      />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote onClose={onClose} handleNotes={handleNotes} />
    ),
    [ModalType.UPLOAD_OFFER_IMAGE]: (
      <ImagesUploadOffer
        onClose={onClose}
        handleImageSlider={handleImageSlider}
        type={"Offer"}
      />
    ),
    [ModalType.IMAGE_SLIDER]: (
      <ImageSlider onClose={onClose} details={images} />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  useEffect(() => {
    const queryParams = areFiltersEmpty(filter)
      ? { filter: {}, page: 1, size: 10 }
      : { filter: filter, page: 1, size: 10 };
    dispatch(readOffer({ params: queryParams })).then((response: any) => {
      setCurrentPageRows(response?.payload?.Offer);
    });
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
    handleImageUpload,
    handleFilterChange,
    filter,
    setFilter,
    loading,
  };
};

export default useOffers;
