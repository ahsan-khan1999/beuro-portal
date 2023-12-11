import { deleteOffer, readOfferDetails, setOfferDetails, updateOfferStatus, updatePaymentStatus } from '@/api/slices/offer/offerSlice';
import DeleteConfirmation_1 from '@/base-components/ui/modals1/DeleteConfirmation_1';
import DeleteConfirmation_2 from '@/base-components/ui/modals1/DeleteConfirmation_2';
import { ModalConfigType, ModalType } from '@/enums/ui';
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../useRedux';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { CustomerPromiseActionType } from '@/types/customer';
import { updateModalType } from '@/api/slices/globalSlice/global';
import { readNotes } from '@/api/slices/noteSlice/noteSlice';
import ExistingNotes from '@/base-components/ui/modals1/ExistingNotes';
import AddNewNote from '@/base-components/ui/modals1/AddNewNote';
import ImagesUpload from '@/base-components/ui/modals1/ImagesUpload';
import ImageSlider from '@/base-components/ui/modals1/ImageSlider';
import { staticEnums } from '@/utils/static';
import CreationCreated from '@/base-components/ui/modals1/CreationCreated';
import { readImage } from '@/api/slices/imageSlice/image';
import ImagesUploadOffer from '@/base-components/ui/modals1/ImageUploadOffer';

export default function useOfferDetails() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const { offerDetails, loading, offer } = useAppSelector((state) => state.offer);
  const { images } = useAppSelector((state) => state.image);

  const { t: translate } = useTranslation()
  const router = useRouter();
  const id = router.query.offer;


  useEffect(() => {
    if (id) {
      dispatch(readOfferDetails({ params: { filter: id } })).then((res: CustomerPromiseActionType) => {
        dispatch(setOfferDetails(res.payload))
      })
    }
  }, [id]);
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const offerDeleteHandler = () => {
    dispatch(updateModalType({ type: ModalType.CONFIRM_DELETION, data: { refId: offerDetails?.offerNumber } }));
  };

  const handleDelete = () => {
    dispatch(updateModalType({ type: ModalType.INFO_DELETED }));
  };

  const routeHandler = () => {
    dispatch(deleteOffer({ offerDetails, router, translate }))
  };
  const handleNotes = (
    item: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    if (e) {
      e.stopPropagation();
    }
    const filteredLead = offer?.filter((item_) => item_.id === item)
    if (filteredLead?.length === 1) {
      dispatch(setOfferDetails(filteredLead[0]));
      dispatch(readNotes({ params: { type: "offer", id: filteredLead[0]?.id } }));
      dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));

    } else {
      dispatch(readNotes({ params: { type: "offer", id: item } }));
      dispatch(updateModalType({ type: ModalType.EXISTING_NOTES }));
    }
  };

  // function for hnadling the add note
  const handleAddNote = (id: string) => {
    dispatch(updateModalType({ type: ModalType.ADD_NOTE, data: id }));
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
    const filteredLead = offer?.find((item_) => item_.id === item)
    if (filteredLead) {
      dispatch(setOfferDetails(filteredLead));
      dispatch(readImage({ params: { type: "offerID", id: filteredLead?.id } }));
      dispatch(updateModalType({ type: ModalType.UPLOAD_OFFER_IMAGE }));
    }
  };



  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading="Please confirm Offer ID"
        subHeading="Enter Offer ID"
      />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading="Are you sure you want to delete this Offer?"
        routeHandler={routeHandler}
        loading={loading}
      />
    ),
    [ModalType.EXISTING_NOTES]: (
      <ExistingNotes handleAddNote={handleAddNote} onClose={onClose} leadDetails={offerDetails} />
    ),
    [ModalType.ADD_NOTE]: (
      <AddNewNote onClose={onClose} handleNotes={handleNotes} />
    ),
    [ModalType.UPLOAD_OFFER_IMAGE]: (
      <ImagesUploadOffer onClose={onClose} handleImageSlider={handleImageSlider} type={"Offer"} />

    ),
    [ModalType.IMAGE_SLIDER]: <ImageSlider onClose={onClose} details={images} />,
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Status Update Successful "
        subHeading="Thanks for updating offer we are happy to have you. "
        route={onClose}
      />
    ),
  };
  const offerCreatedHandler = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handlePaymentStatusUpdate = async (paymentType: string) => {
    const res = await dispatch(updatePaymentStatus({ data: { id: offerDetails?.id, paymentType: staticEnums["PaymentType"][paymentType] } }))
    if (res?.payload) offerCreatedHandler()
  }
  const handleStatusUpdate = async (offerStatus: string) => {
    const res = await dispatch(updateOfferStatus({ data: { id: offerDetails?.id, offerStatus: staticEnums["OfferStatus"][offerStatus] } }))
    if (res?.payload) offerCreatedHandler()

  }
  return {
    offerDetails,
    renderModal,
    offerDeleteHandler,
    handleNotes,
    handleImageUpload,
    handlePaymentStatusUpdate,
    handleStatusUpdate

  }
}
