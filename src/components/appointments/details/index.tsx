import { useAppointmentsDetails } from "@/hooks/appointments/useAppointmentsDetails";
import { AppointmentsDetailCard } from "./detail-card";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

export const AppointmentsDetails = () => {
  const {
    translate,
    handleStatusChange,
    handleScheduleAppointments,
    renderModal,
  } = useAppointmentsDetails();

  return (
    <>
      <AppointmentsDetailCard onStatusChange={handleStatusChange} onScheduleAppointments={handleScheduleAppointments}/>
      <div className="bg-white flex items-center justify-center mt-6">
        <NoDataEmptyState
          heading={translate("appointments.detail_data.no_data_found")}
        />
      </div>
      {renderModal()}
    </>
  );
};
