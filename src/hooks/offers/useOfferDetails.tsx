import {
  deleteOffer,
  readOfferActivity,
  readOfferDetails,
  sendOfferByPost,
  sendOfferEmail,
  setOfferDetails,
  updateOfferDiscount,
  updateOfferStatus,
  updatePaymentStatus,
} from "@/api/slices/offer/offerSlice";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import { ModalConfigType, ModalType } from "@/enums/ui";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { CustomerPromiseActionType } from "@/types/customer";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { readNotes } from "@/api/slices/noteSlice/noteSlice";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import ImagesUpload from "@/base-components/ui/modals1/ImagesUpload";
import ImageSlider from "@/base-components/ui/modals1/ImageSlider";
import { staticEnums } from "@/utils/static";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { readImage } from "@/api/slices/imageSlice/image";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import { updateQuery } from "@/utils/update-query";
import localStoreUtil from "@/utils/localstore.util";
import toast from "react-hot-toast";
import { readContent } from "@/api/slices/content/contentSlice";

export default function useOfferDetails() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const { offerDetails, loading, offerActivity } = useAppSelector(
    (state) => state.offer
  );
  const router = useRouter();

  const { systemSettings } = useAppSelector((state) => state.settings);
  const isMail = Boolean(router.query?.isMail);

  const { images } = useAppSelector((state) => state.image);
  const [isSendEmail, setIsSendEmail] = useState(isMail || false);
  const { t: translate } = useTranslation();
  const id = router.query.offer;

  useEffect(() => {
    localStoreUtil.remove_data("contractComposeEmail");

    if (id) {
      dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
      dispatch(readOfferDetails({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setOfferDetails(res.payload));
        }
      );

      dispatch(readOfferActivity({ params: { filter: id } }));
    }
  }, [id]);
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const offerDeleteHandler = () => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: offerDetails?.offerNumber },
      })
    );
  };

  const handleDelete = () => {
    dispatch(updateModalType({ type: ModalType.INFO_DELETED }));
  };

  const routeHandler = () => {
    dispatch(deleteOffer({ offerDetails, router, translate }));
  };
  const handleNotes = (item: string, e?: React.MouseEvent<HTMLSpanElement>) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(readNotes({ params: { type: "offer", id: offerDetails?.id } }));
    dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
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

  const handleEditNote = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.EDIT_NOTE,
        data: { id: id, type: "offer" },
      })
    );
  };

  // function for hnadling the add note
  const handleImageSlider = () => {
    // dispatch(updateModalType({ type: ModalType.NONE }));
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleImageUpload = (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();

    dispatch(readImage({ params: { type: "offerID", id: offerDetails?.id } }));
    dispatch(updateModalType({ type: ModalType.UPLOAD_OFFER_IMAGE }));
  };

  const handleSendEmail = async () => {
    setIsSendEmail(!isSendEmail);
  };

  const onSuccess = () => {
    router.push("/offers");
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading={translate("common.modals.offer_delete")}
        subHeading={translate("common.modals.offer_ID")}
      />
    ),

    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("common.modals.are_you_delete")}
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes
        handleAddNote={handleAddNote}
        onClose={onClose}
        leadDetails={offerDetails}
        onEditNote={handleEditNote}
        onDeleteNote={handleEditNote}
      />
    ),

    [ModalType.EDIT_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
        heading={translate("common.add_note")}
      />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote
        onClose={onClose}
        handleNotes={handleNotes}
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
    // [ModalType.IMAGE_SLIDER]: (
    //   <ImageSlider onClose={onClose} details={images} />
    // ),
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.offer_created_des")}
        route={onClose}
      />
    ),
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_email_sent")}
        subHeading={translate("common.modals.email_sent_des")}
        route={onSuccess}
      />
    ),
  };

  const offerCreatedHandler = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleUpdateAdditionalDetailsModal = () => {
    dispatch(updateModalType({ type: ModalType.UPDATE_ADDITIONAL_DETAILS }));
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handlePaymentStatusUpdate = async (paymentType: string) => {
    const res = await dispatch(
      updatePaymentStatus({
        data: {
          id: offerDetails?.id,
          paymentType: staticEnums["PaymentType"][paymentType],
        },
      })
    );
    if (res?.payload) offerCreatedHandler();
  };

  const handleStatusUpdate = async (offerStatus: string) => {
    const res = await dispatch(
      updateOfferStatus({
        data: {
          id: offerDetails?.id,
          offerStatus: staticEnums["OfferStatus"][offerStatus],
        },
      })
    );
    if (res?.payload) offerCreatedHandler();
  };

  const onNextHandle = () => {
    router.pathname = "/offers/pdf-preview";
  };

  const handleSendByPost = async () => {
    const apiData = {
      emailStatus: 2,
      id: offerDetails?.id,
    };
    const response = await dispatch(sendOfferByPost({ data: apiData }));
    if (response?.payload) offerCreatedHandler();
  };

  const handleUpdateDiscount = async (discount: number) => {
    if (discount < 0)
      toast.error("Negative values are not applicable for discounts");
    else {
      const response = await dispatch(
        updateOfferDiscount({
          params: { discountAmount: Number(discount), id: offerDetails?.id },
        })
      );
      if (response?.payload)
        dispatch(updateModalType({ type: ModalType.CREATION }));
      dispatch(readOfferActivity({ params: { filter: offerDetails?.id } }));
    }
  };

  return {
    offerDetails,
    renderModal,
    offerDeleteHandler,
    handleNotes,
    handleImageUpload,
    handlePaymentStatusUpdate,
    handleStatusUpdate,
    handleSendEmail,
    setIsSendEmail,
    isSendEmail,
    onNextHandle,
    offerActivity,
    loading,
    handleSendByPost,
    handleUpdateDiscount,
    systemSettings,
    handleUpdateAdditionalDetailsModal,
  };
}
