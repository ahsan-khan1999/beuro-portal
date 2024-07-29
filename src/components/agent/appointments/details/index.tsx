import { useAppointmentsDetails } from "@/hooks/appointments/useAppointmentsDetails";
import { AppointmentsDetailCard } from "./detail-card";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

export const AgentAppointmentsDetails = () => {
  const {
    translate,
    loading,
    handleStatusUpdate,
    handleCreateReport,
    renderModal,
    appointmentDetails,
  } = useAppointmentsDetails();

  return (
    <>
      <AppointmentsDetailCard
        onStatusChange={handleStatusUpdate}
        appointmentDetails={appointmentDetails}
      />

      {loading ? (
        <CustomLoader />
      ) : (
        !appointmentDetails?.leadID?.isAppointmentCreated && (
          <div className="bg-white flex items-center justify-center mt-6">
            <NoDataEmptyState
              heading={translate("appointments.detail_data.no_data_found")}
              isButton={true}
              onButtonClick={handleCreateReport}
              buttonHeading={translate("common.create_report_btn")}
            />
          </div>
        )
      )}

      {renderModal()}
    </>
  );
};
