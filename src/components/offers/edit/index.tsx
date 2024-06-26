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
import { ShareImages } from "@/base-components/ui/modals1/ShareImages";
import { useTranslation } from "next-i18next";

const EditOffersDetails = () => {
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { modal } = useAppSelector((state) => state.global);
  const { offerDetails } = useAppSelector((state) => state.offer);

  const shareImgModal = (
    id: string,
    refID: string,
    name: string,
    heading: string
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
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    e?.stopPropagation();
    dispatch(
      updateModalType({
        type: ModalType.UPLOAD_OFFER_IMAGE,
        data: {
          refID: refID,
          name: name,
          heading: heading,
        },
      })
    );
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.SHARE_IMAGES]: (
      <ShareImages onClose={onClose} offerId={offerDetails?.id} />
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

  const router = useRouter();
  let tab: EditComponentsType | undefined;

  if (router.query?.tab) {
    tab = +router.query?.tab;
  }

  return (
    <Layout>
      <EditOffersDetailsData
        shareImgModal={shareImgModal}
        handleImagesUpload={handleImageUpload}
        handleImageSlider={handleImageSlider}
        tab={tab}
      />
      {renderModal()}
    </Layout>
  );
};

export default EditOffersDetails;
