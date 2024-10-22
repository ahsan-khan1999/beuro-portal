import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { useReportDetails } from "@/hooks/appointments/useReportDetail";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { ReportDetailData } from "@/components/agent/appointments/report-detail/detail-screens";
import { AppointmentsDetailCard } from "@/components/agent/appointments/agent-details/detail-card";

export const AppointmentsDetails = () => {
  const {
    translate,
    renderModal,
    appointmentDetails,
    handleStatusUpdate,
    handleUpdateDiscount,
    isLoading,
    loading,
    reportDetails,
    systemSettings,
    handleNotes,
    handleUploadImages,
  } = useReportDetails();

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : !appointmentDetails?.isReportSubmitted ? (
        <>
          <div
            className={`${
              !appointmentDetails?.isReportSubmitted
                ? ""
                : "2xl:fixed offerCardCalWidth z-10 2xl:-mt-[295px] 2xl:border-t-[14px] 2xl:border-t-defaultBackground"
            }`}
          >
            <AppointmentsDetailCard
              onStatusChange={handleStatusUpdate}
              appointmentDetails={appointmentDetails}
              handleImageUpload={handleUploadImages}
              handleNotes={handleNotes}
              reportDetails={reportDetails}
            />
          </div>
          <div className="xMini:bg-white mt-6 xMini:flex items-center justify-center">
            <NoDataEmptyState
              heading={translate("appointments.detail_data.no_data_found")}
              containerClassName="xMini:py-[153px]"
              imgClassName="w-14 h-14 xMini:w-fit xMini:h-fit"
              textClassName="text-lg xMini:text-2xl"
              className="py-5 px-3 w-full xMini:py-10 xMini:px-6 xMini:w-[617px]"
            />
          </div>
        </>
      ) : (
        <>
          <div
            className={`${
              !appointmentDetails?.isReportSubmitted
                ? ""
                : "2xl:fixed offerCardCalWidth z-10 2xl:-mt-[285px] 2xl:border-t-[14px] 2xl:border-t-defaultBackground"
            }`}
          >
            <AppointmentsDetailCard
              appointmentDetails={appointmentDetails}
              onStatusChange={handleStatusUpdate}
              handleImageUpload={handleUploadImages}
              handleNotes={handleNotes}
              reportDetails={reportDetails}
            />
          </div>
          <div className="2xl:mt-[365px] w-full 2xl:block mb-10">
            <ReportDetailData
              reportDetail={reportDetails}
              loading={isLoading}
              handleUpdateDiscount={handleUpdateDiscount}
              currency={systemSettings?.currency}
            />
          </div>
        </>
      )}

      {renderModal()}
    </>
  );
};
