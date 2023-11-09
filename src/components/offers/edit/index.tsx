import { Layout } from "@/layout";
import React from "react";
import EditOffersDetailsData from "./EditOffersDetailsData";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ShareImages from "@/base-components/ui/modals1/ShareImages";
import useOffers from "@/hooks/offers/useOffers";

const EditOffersDetails = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const shareImgModal = () => {
    dispatch(updateModalType(ModalType.SHARE_IMAGES));
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.SHARE_IMAGES]: <ShareImages onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const { handleImagesUpload } = useOffers();

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
