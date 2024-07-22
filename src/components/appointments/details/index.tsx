import { useAppointmentsDetails } from "@/hooks/appointments/useAppointmentsDetails";
import { AppointmentsDetailCard } from "./detail-card";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

export const AppointmentsDetails = () => {
  const {
    router,
    translate,
    handleStatusChange,
    handleScheduleAppointments,
    renderModal,
  } = useAppointmentsDetails();

  const handleCreateReport = () => {
    router.push({
      pathname: "/agent/appointments/create-report",
    });
  };

  return (
    <>
      <AppointmentsDetailCard
        onStatusChange={handleStatusChange}
        onScheduleAppointments={handleScheduleAppointments}
      />
      <div className="bg-white flex items-center justify-center mt-6">
        <NoDataEmptyState
          heading={translate("appointments.detail_data.no_data_found")}
          isButton={true}
          onButtonClick={handleCreateReport}
          buttonHeading={translate("common.create_report_btn")}
        />
      </div>
      {renderModal()}
    </>
  );
};
