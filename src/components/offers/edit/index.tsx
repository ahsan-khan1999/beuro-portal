import { Layout } from "@/layout";
import React, { useEffect } from "react";
import EditOffersDetailsData from "./EditOffersDetailsData";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ShareImages from "@/base-components/ui/modals1/ShareImages";
import useOffers from "@/hooks/offers/useOffers";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import ImageSlider from "@/base-components/ui/modals1/ImageSlider";
import { readImage } from "@/api/slices/imageSlice/image";

const EditOffersDetails = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const { offerDetails } = useAppSelector((state) => state.offer);
  const { images } = useAppSelector((state) => state.image);

  const shareImgModal = () => {
    dispatch(updateModalType({ type: ModalType.SHARE_IMAGES }));
  };

  useEffect(() => {
    if (offerDetails?.id) dispatch(readImage({ params: { type: "offerID", id: offerDetails?.id } }));

  }, [offerDetails?.id])
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };
  const handleImageSlider = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
    dispatch(updateModalType({ type: ModalType.IMAGE_SLIDER }));
  };

  const handleImageUpload = (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    dispatch(updateModalType({ type: ModalType.UPLOAD_OFFER_IMAGE }));
  };
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.SHARE_IMAGES]: <ShareImages onClose={onClose} />,

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

  // const { handleImagesUpload } = useOffers();
  // const handleImagesUpload = () => {};

  return (
    <>
      <Layout>
        <EditOffersDetailsData
          shareImgModal={shareImgModal}
          handleImagesUpload={handleImageUpload}
          handleImageSlider={handleImageSlider}
        />
      </Layout>

      {renderModal()}
    </>
  );
};

export default EditOffersDetails;
