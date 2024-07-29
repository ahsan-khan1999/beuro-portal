import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { AgentAppointmentsDetailCard } from "./agent-detail-card";
import { useAgentAppointmentsDetails } from "@/hooks/agent/appointments/useAgentAppointmentsDetails";

export const AppointmentsDetails = () => {
  const {
    translate,
    handleStatusChange,
    handleScheduleAppointments,
    renderModal,
    handleCreateReport,
  } = useAgentAppointmentsDetails();

  return (
    <>
      <AgentAppointmentsDetailCard
        onStatusChange={handleStatusChange}
        onScheduleAppointments={handleScheduleAppointments}
      />
      <div className="bg-white flex items-center justify-center mt-6">
        <NoDataEmptyState
          heading={translate("appointments.detail_data.no_data_found")}
          isButton={true}
          onButtonClick={handleCreateReport}
        />
      </div>
      {renderModal()}
    </>
  );
};
