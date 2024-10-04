import { AppointmentsDetailCard } from "../agent-details/detail-card";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { useAppointmentsDetails } from "@/hooks/appointments/useAppointmentsDetails";

export const AgentAppointmentsDetails = () => {
  const {
    translate,
    loading,
    handleStatusUpdate,
    handleCreateReport,
    renderModal,
    appointmentDetails,
    handleNotes,
    handleUploadImages,
  } = useAppointmentsDetails();

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <AppointmentsDetailCard
            onStatusChange={handleStatusUpdate}
            appointmentDetails={appointmentDetails}
            isAgent={true}
            handleImageUpload={handleUploadImages}
            handleNotes={handleNotes}
          />
          {!appointmentDetails?.isReportSubmitted && (
            <div className="xMini:bg-white mt-6 xMini:flex items-center justify-center">
              <NoDataEmptyState
                heading={translate("appointments.detail_data.no_data_found")}
                isButton={true}
                onButtonClick={handleCreateReport}
                buttonHeading={translate("common.create_report_btn")}
                containerClassName="xMini:py-[153px]"
                imgClassName="w-14 h-14 xMini:w-fit xMini:h-fit"
                textClassName="text-lg xMini:text-2xl"
                className="py-5 px-3 w-full xMini:py-10 xMini:px-6 xMini:w-[617px]"
              />
            </div>
          )}
        </>
      )}

      {renderModal()}
    </>
  );
};
