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
  setAppointmentDetails,
  updateAppointmentStatus,
} from "@/api/slices/appointment/appointmentSlice";
import { CustomerPromiseActionType } from "@/types/company";
import { staticEnums } from "@/utils/static";

export const useAppointmentsDetails = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const { loading, appointmentDetails } = useAppSelector(
    (state) => state.appointment
  );

  const id = router.query.appointment;

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
          id: appointmentDetails?.id,
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

  const handleCreateReport = () => {
    router.push({
      pathname: `/agent/appointments/create-report`,
      query: appointmentDetails?.id,
    });
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
    appointmentDetails,
    handleStatusUpdate,
    handleCreateReport,
    handleScheduleAppointments,
  };
};
