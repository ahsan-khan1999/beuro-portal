import { Layout } from "@/layout";
import React from "react";
import EditOffersDetailsData from "./EditOffersDetailsData";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ShareImages from "@/base-components/ui/modals1/ShareImages";
import { OffersTableRowTypes } from "@/types/offers";
import ImagesUpload from "@/base-components/ui/modals1/ImagesUpload";
import ImageSlider from "@/base-components/ui/modals1/ImageSlider";

const EditOffersDetails = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const shareImgModal = () => {
    dispatch(updateModalType(ModalType.SHARE_IMAGES));
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleImagesUpload = (item: OffersTableRowTypes) => {
    dispatch(updateModalType(ModalType.UPLOAD_IMAGE));
  };

  const handleImageSlider = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.IMAGE_SLIDER));
    console.log("clicked!");
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.SHARE_IMAGES]: <ShareImages onClose={onClose} />,
    [ModalType.UPLOAD_IMAGE]: (
      <ImagesUpload onClose={onClose} handleImageSlider={handleImageSlider} />
    ),
    [ModalType.IMAGE_SLIDER]: <ImageSlider onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <Layout>
        <EditOffersDetailsData
          shareImgModal={shareImgModal}
          handleImagesUpload={handleImagesUpload}
        />
      </Layout>

      {renderModal()}
    </>
  );
};

export default EditOffersDetails;
