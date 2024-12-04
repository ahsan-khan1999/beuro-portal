import {
  deleteOffer,
  readOfferActivity,
  readOfferDetails,
  sendOfferByPost,
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
import { useRouter } from "next/router";
import { CustomerPromiseActionType } from "@/types/customer";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { deleteNotes, readNotes } from "@/api/slices/noteSlice/noteSlice";
import ExistingNotes from "@/base-components/ui/modals1/ExistingNotes";
import AddNewNote from "@/base-components/ui/modals1/AddNewNote";
import { staticEnums } from "@/utils/static";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { readImage } from "@/api/slices/imageSlice/image";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import localStoreUtil from "@/utils/localstore.util";
import { readContent } from "@/api/slices/content/contentSlice";
import { OfferAccepted } from "@/base-components/ui/modals1/offerAccepted";
import { UploadFile } from "@/base-components/ui/modals1/uploadFile";
import { ConfirmDeleteNote } from "@/base-components/ui/modals1/ConfirmDeleteNote";
import { ShareImages } from "@/base-components/ui/modals1/ShareImages";
import { updateQuery } from "@/utils/update-query";
import { UpdateNote } from "@/base-components/ui/modals1/UpdateNote";
import { MailSendLoadingGif } from "@/base-components/ui/modals1/MailLoadingGif";

export default function useOfferDetails() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const { offerDetails, loading, offerActivity } = useAppSelector(
    (state) => state.offer
  );
  const router = useRouter();
  const { systemSettings } = useAppSelector((state) => state.settings);
  const isMail = Boolean(router.query?.isMail);
  const [isSendEmail, setIsSendEmail] = useState(isMail || false);
  const id = router.query.offer;

  useEffect(() => {
    if (offerDetails?.id)
      dispatch(
        readImage({ params: { type: "offerID", id: offerDetails?.id } })
      );
  }, [offerDetails?.id]);

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

  const handleUploadFile = (id: string) => {
    dispatch(
      updateModalType({
        type: ModalType.UPLOAD_FILE,
        data: id,
      })
    );
  };

  const handleDelete = () => {
    dispatch(updateModalType({ type: ModalType.INFO_DELETED }));
  };

  const routeHandler = async () => {
    const res = await dispatch(
      deleteOffer({ offerDetails, router, translate })
    );
    if (!res?.payload) {
      dispatch(
        updateModalType({
          type: ModalType.NONE,
        })
      );
    }
  };

  const handleNotes = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    e?.stopPropagation();

    dispatch(readNotes({ params: { type: "offer", id: offerDetails?.id } }));
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

  const handleDeleteNote = async (id: string) => {
    if (!id) return;
    const response = await dispatch(deleteNotes({ data: { id: id } }));
    if (response?.payload)
      dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleImageSlider = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleImageUpload = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    e?.stopPropagation();
    dispatch(readImage({ params: { type: "offerID", id: offerDetails?.id } }));
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

  const handleSendEmail = async () => {
    setIsSendEmail(!isSendEmail);
  };

  const onSuccess = () => {
    router.pathname = "/offers";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
    dispatch(updateModalType({ type: ModalType.NONE }));
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
  };

  const defaultOfferCreatedHandler = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleConfirmDeleteNote = (id: string) => {
    dispatch(
      updateModalType({ type: ModalType.CONFIRM_DELETE_NOTE, data: id })
    );
  };

  const shareImgModal = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string
  ) => {
    dispatch(
      updateModalType({
        type: ModalType.SHARE_IMAGES,
        data: {
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
  };

  const handleUploadImages = (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    dispatch(updateModalType({ type: ModalType.UPLOAD_OFFER_IMAGE }));
  };

  const handleCancelNote = () => {
    dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
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
    if (res?.payload) defaultOfferCreatedHandler();
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
    if (res?.payload)
      offerCreatedHandler(
        staticEnums["OfferStatus"][offerStatus],
        offerDetails?.id
      );
  };

  // const onNextHandle = () => {
  //   router.pathname = "/offers/pdf-preview";
  // };

  const handleSendByPost = async () => {
    const apiData = {
      emailStatus: 2,
      id: offerDetails?.id,
    };
    const response = await dispatch(sendOfferByPost({ data: apiData }));
    if (response?.payload) defaultOfferCreatedHandler();
  };

  const handleUpdateDiscount = async (discount: number) => {
    if (discount < 0)
      showError("Negative values are not applicable for discounts");
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

  const handleUpdateAdditionalDetailsModal = () => {
    dispatch(updateModalType({ type: ModalType.UPDATE_ADDITIONAL_DETAILS }));
  };

  const handleLeadDetailUpdate = (id?: string) => {
    dispatch(readOfferDetails({ params: { filter: id } })).then(
      (res: CustomerPromiseActionType) => {
        dispatch(setOfferDetails(res?.payload));
      }
    );
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
        mainHeading={translate("common.add_note")}
      />
    ),
    [ModalType.UPLOAD_OFFER_IMAGE]: (
      <ImagesUploadOffer
        onClose={onClose}
        handleImageSlider={handleImageSlider}
        type={"Offer"}
        onUpdateDetails={handleLeadDetailUpdate}
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
    [ModalType.EMAIL_CONFIRMATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_email_sent")}
        subHeading={translate("common.modals.email_sent_des")}
        route={onSuccess}
      />
    ),
    [ModalType.LOADING_MAIL_GIF]: <MailSendLoadingGif onClose={onClose} />,
    [ModalType.SHARE_IMAGES]: (
      <ShareImages onClose={onClose} type="offerID" id={offerDetails?.id} />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
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
    // onNextHandle,
    offerActivity,
    loading,
    handleSendByPost,
    handleUpdateDiscount,
    systemSettings,
    handleUpdateAdditionalDetailsModal,
    shareImgModal,
    handleUploadImages,
    handleImageSlider,
    handleUploadFile,
  };
}
