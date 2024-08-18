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
              containerClassName="py-4 xMini:py-[153px]"
              imgClassName="w-14 h-14 xMini:w-fit xMini:h-fit"
              textClassName="text-lg xMini:text-2xl"
              className="py-5 px-3 xMini:py-10 xMini:px-6"
            />
          </div>
        )
      )}

      {renderModal()}
    </>
  );
};
