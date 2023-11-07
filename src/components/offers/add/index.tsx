import { Layout } from "@/layout";
import React from "react";
import AddOffersDetailsData from "./AddOffersDetailsData";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import ShareImages from "@/base-components/ui/modals1/ShareImages";
import AreYouSureOffer from "@/base-components/ui/modals1/AreYouSureOffer";
import OfferCreated from "@/base-components/ui/modals1/OfferCreated";

const OfferAddDetails = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const shareImgModal = () => {
    dispatch(updateModalType(ModalType.SHARE_IMAGES));
  };

  // const areYouSureModal = () => {
  //   dispatch(updateModalType(ModalType.SHARE_IMAGES));
  // };

  const handleOfferCreated = () => {
    dispatch(updateModalType(ModalType.OFFER_CREATED));
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.SHARE_IMAGES]: <ShareImages onClose={onClose} />,
    [ModalType.ARE_YOU_SURE]: <AreYouSureOffer onClose={onClose} />,
    [ModalType.OFFER_CREATED]: <OfferCreated onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <Layout>
        <AddOffersDetailsData handleOfferCreated={handleOfferCreated} />
      </Layout>

      {renderModal()}
    </>
  );
};

export default OfferAddDetails;
