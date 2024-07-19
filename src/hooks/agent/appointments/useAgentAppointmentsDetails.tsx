import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { ScheduleAppointments } from "@/base-components/ui/modals1/ScheduleAppointments";
import reschudleIcon from "@/assets/pngs/reschdule-icon.png";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { useAppSelector } from "@/hooks/useRedux";
import { useRouter } from "next/router";

export const useAgentAppointmentsDetails = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const handleStatusChange = (id: number, status: string, type: string) => {
    console.log("status change");
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
      pathname: "/agent/appointments/create-report",
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
    translate,
    renderModal,
    handleStatusChange,
    handleCreateReport,
    handleScheduleAppointments,
  };
};
