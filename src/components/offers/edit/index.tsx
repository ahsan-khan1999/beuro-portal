import { Layout } from "@/layout";
import React, { useEffect } from "react";
import EditOffersDetailsData, {
  EditComponentsType,
} from "./EditOffersDetailsData";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import { readImage } from "@/api/slices/imageSlice/image";
import { useRouter } from "next/router";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { useTranslation } from "next-i18next";
import { ShareImages } from "@/base-components/ui/modals1/ShareImages";

const EditOffersDetails = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const { offerDetails } = useAppSelector((state) => state.offer);
  const { images } = useAppSelector((state) => state.image);
  const { t: translate } = useTranslation();
  const shareImgModal = () => {
    dispatch(updateModalType({ type: ModalType.SHARE_IMAGES }));
  };

  useEffect(() => {
    if (offerDetails?.id)
      dispatch(
        readImage({ params: { type: "offerID", id: offerDetails?.id } })
      );
  }, [offerDetails?.id]);

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const handleImageSlider = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleImageUpload = (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    dispatch(updateModalType({ type: ModalType.UPLOAD_OFFER_IMAGE }));
  };
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.SHARE_IMAGES]: (
      <ShareImages
        onClose={onClose}
        handleImageSlider={handleImageSlider}
        offerId={offerDetails?.id}
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
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  // const { handleImagesUpload } = useOffers();
  // const handleImagesUpload = () => {};
  const router = useRouter();
  let tab: EditComponentsType | undefined;

  if (router.query?.tab) {
    tab = +router.query?.tab;
  }

  return (
    <>
      <Layout>
        <EditOffersDetailsData
          shareImgModal={shareImgModal}
          handleImagesUpload={handleImageUpload}
          handleImageSlider={handleImageSlider}
          tab={tab}
        />
      </Layout>

      {renderModal()}
    </>
  );
};

export default EditOffersDetails;
