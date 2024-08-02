import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { ScheduleAppointments } from "@/base-components/ui/modals1/ScheduleAppointments";
import reschudleIcon from "@/assets/pngs/reschdule-icon.png";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  readAppointmentDetails,
  readReportdetails,
  setAppointmentDetails,
  setReportDetails,
  updateAppointmentStatus,
} from "@/api/slices/appointment/appointmentSlice";
import { CustomerPromiseActionType } from "@/types/company";
import { staticEnums } from "@/utils/static";
import {
  readOfferActivity,
  updateOfferDiscount,
} from "@/api/slices/offer/offerSlice";
import { readImage } from "@/api/slices/imageSlice/image";

export const useReportDetails = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const { loading, reportDetails, appointmentDetails } = useAppSelector(
    (state) => state.appointment
  );

  const { systemSettings } = useAppSelector((state) => state.settings);

  const id = router.query.report;

  useEffect(() => {
    if (id) {
      dispatch(readReportdetails({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setReportDetails(res.payload));
        }
      );
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(readAppointmentDetails({ params: { filter: id } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setAppointmentDetails(res.payload));
        }
      );
    }
  }, [id]);

  const defaultUpdateModal = () => {
    dispatch(updateModalType({ type: ModalType.CREATION }));
  };

  const handleStatusUpdate = async (appointmentStatus: string) => {
    const res = await dispatch(
      updateAppointmentStatus({
        data: {
          id: reportDetails?.appointmentID?.id,
          appointmentStatus:
            staticEnums["AppointmentStatus"][appointmentStatus],
        },
      })
    );
    if (res?.payload) defaultUpdateModal();
  };

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleScheduleAppointments = () => {
    dispatch(updateModalType({ type: ModalType.SCHEDULE_APPOINTMENTS }));
  };

  const handleAppointmentsSuccess = () => {
    dispatch(updateModalType({ type: ModalType.APPOINTMENT_SUCCESS }));
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

  const handleImageUpload = (
    id: string,
    refID?: string,
    name?: string,
    heading?: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => {
    e?.stopPropagation();
    dispatch(readImage({ params: { type: "offerID", id: reportDetails?.id } }));
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

  const handleUpdateDiscount = async (discount: number) => {
    if (discount < 0)
      showError("Negative values are not applicable for discounts");
    else {
      const response = await dispatch(
        updateOfferDiscount({
          params: { discountAmount: Number(discount), id: reportDetails?.id },
        })
      );
      if (response?.payload)
        dispatch(updateModalType({ type: ModalType.CREATION }));
      dispatch(readOfferActivity({ params: { filter: reportDetails?.id } }));
    }
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.offer_created")}
        subHeading={translate("common.modals.update_success")}
        route={onClose}
      />
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
    router,
    loading,
    translate,
    renderModal,
    reportDetails,
    handleStatusUpdate,
    handleScheduleAppointments,
    appointmentDetails,
    handleImageUpload,
    shareImgModal,
    handleUpdateDiscount,
    systemSettings,
    defaultUpdateModal,
  };
};
