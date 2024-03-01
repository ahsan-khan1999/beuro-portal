import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useRouter } from "next/router";
import DeleteConfirmation_1 from "@/base-components/ui/modals1/DeleteConfirmation_1";
import DeleteConfirmation_2 from "@/base-components/ui/modals1/DeleteConfirmation_2";
import {
  deleteLead,
  readLeadDetails,
  setLeadDetails,
  updateLeadStatus,
} from "@/api/slices/lead/leadSlice";
import { CustomerPromiseActionType } from "@/types/customer";
import { useTranslation } from "next-i18next";
import { readService } from "@/api/slices/service/serviceSlice";
import { readImage } from "@/api/slices/imageSlice/image";
import { readContent } from "@/api/slices/content/contentSlice";
import { staticEnums } from "@/utils/static";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import { ShareImages } from "@/base-components/ui/modals1/ShareImages";

export default function useLeadDetail() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const { leadDetails, loading, loadingDetails } = useAppSelector(
    (state) => state.lead
  );

  const { t: translate } = useTranslation();
  const router = useRouter();
  const id = router.query.lead;

  useEffect(() => {
    if (leadDetails?.id)
      dispatch(readImage({ params: { type: "leadID", id: leadDetails?.id } }));
  }, [leadDetails?.id]);

  useEffect(() => {
    dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(readLeadDetails({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setLeadDetails(res.payload));
          dispatch(
            readImage({ params: { type: "leadID", id: res.payload?.id } })
          );
        }
      );
    }
  }, [id]);

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const leadDeleteHandler = () => {
    dispatch(
      updateModalType({
        type: ModalType.CONFIRM_DELETION,
        data: { refId: leadDetails?.refID },
      })
    );
  };

  const handleDelete = () => {
    dispatch(updateModalType({ type: ModalType.INFO_DELETED }));
  };

  const routeHandler = () => {
    dispatch(deleteLead({ leadDetails, router, translate }));
  };

  const defaultUpdateModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleStatusUpdate = async (leadStatus: string) => {
    const res = await dispatch(
      updateLeadStatus({
        data: {
          id: leadDetails?.id,
          leadStatus: staticEnums["LeadStatus"][leadStatus],
        },
      })
    );
    if (res?.payload) defaultUpdateModal();
  };

  const handleUploadImages = (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    dispatch(updateModalType({ type: ModalType.UPLOAD_OFFER_IMAGE }));
  };

  const shareImgModal = () => {
    dispatch(updateModalType({ type: ModalType.SHARE_IMAGES }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CONFIRM_DELETION]: (
      <DeleteConfirmation_1
        onClose={onClose}
        handleDelete={handleDelete}
        modelHeading={translate("common.modals.lead_confirm")}
        subHeading={translate("common.modals.lead_ID")}
      />
    ),
    [ModalType.INFO_DELETED]: (
      <DeleteConfirmation_2
        onClose={onClose}
        modelHeading={translate("common.modals.delete_lead")}
        routeHandler={routeHandler}
        loading={loading}
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

    [ModalType.UPLOAD_OFFER_IMAGE]: (
      <ImagesUploadOffer
        onClose={onClose}
        handleImageSlider={defaultUpdateModal}
        type={"Lead"}
      />
    ),

    [ModalType.SHARE_IMAGES]: (
      <ShareImages onClose={onClose} offerId={leadDetails?.id} />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return {
    renderModal,
    leadDeleteHandler,
    leadDetails,
    loading,
    loadingDetails,
    handleStatusUpdate,
    handleUploadImages,
    shareImgModal,
    defaultUpdateModal,
  };
}
