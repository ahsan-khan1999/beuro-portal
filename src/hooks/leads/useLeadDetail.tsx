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
import { readImage } from "@/api/slices/imageSlice/image";
import { readContent } from "@/api/slices/content/contentSlice";
import { staticEnums } from "@/utils/static";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import ImagesUploadOffer from "@/base-components/ui/modals1/ImageUploadOffer";
import { ShareImages } from "@/base-components/ui/modals1/ShareImages";
import { ScheduleAppointments } from "@/base-components/ui/modals1/ScheduleAppointments";
import reschudleIcon from "@/assets/pngs/reschdule-icon.png";

export default function useLeadDetail() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const { leadDetails, loading, loadingDetails } = useAppSelector(
    (state) => state.lead
  );

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

  // const handleImageUpload = (
  //   id: string,
  //   refID?: string,
  //   name?: string,
  //   heading?: string,
  //   e?: React.MouseEvent<HTMLSpanElement>
  // ) => {
  //   e?.stopPropagation();
  //   dispatch(readImage({ params: { type: "leadID", id: leadDetails?.id } }));
  //   dispatch(
  //     updateModalType({
  //       type: ModalType.UPLOAD_OFFER_IMAGE,
  //       data: {
  //         refID: refID,
  //         name: name,
  //         heading: heading,
  //       },
  //     })
  //   );
  // };

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

  const handleScheduleAppointments = () => {
    dispatch(
      updateModalType({
        type: ModalType.SCHEDULE_APPOINTMENTS,
        data: {
          id: leadDetails?.id,
          leadId: leadDetails?.id,
          refID: leadDetails?.refID,
        },
      })
    );
  };

  const handleAppointmentsSuccess = () => {
    dispatch(updateModalType({ type: ModalType.APPOINTMENT_SUCCESS }));
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
        subHeading={translate("common.modals.update_success")}
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
    [ModalType.SCHEDULE_APPOINTMENTS]: (
      <ScheduleAppointments
        onClose={onClose}
        heading={translate("appointments.schedule_appointment")}
        onSuccess={handleAppointmentsSuccess}
      />
    ),
    [ModalType.APPOINTMENT_SUCCESS]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("appointments.successs_modal.heading")}
        subHeading={translate("appointments.successs_modal.sub_heading")}
        route={onClose}
        imgSrc={reschudleIcon}
      />
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
    handleScheduleAppointments,
  };
}
