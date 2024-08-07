import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { useReportDetails } from "@/hooks/appointments/useReportDetail";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { ReportDetailData } from "@/components/agent/appointments/report-detail/detail-screens";
import { AppointmentsDetailCard } from "@/components/agent/appointments/agent-details/detail-card";

export const AppointmentsDetails = () => {
  const {
    translate,
    renderModal,
    handleCreateReport,
    appointmentDetails,
    defaultUpdateModal,
    handleImageUpload,
    handleStatusUpdate,
    handleUpdateDiscount,
    isLoading,
    loading,
    reportDetails,
    router,
    systemSettings,
    shareImgModal,
  } = useReportDetails();

  return (
    <>
      {isLoading ? (
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
            />
          </div>
          <div className="bg-white flex items-center justify-center mt-6">
            <NoDataEmptyState
              heading={translate("appointments.detail_data.no_data_found")}
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
            />
          </div>
          <div className="2xl:mt-[365px] w-full 2xl:block mb-10">
            <ReportDetailData
              reportDetail={reportDetails}
              loading={isLoading}
              handleUpdateDiscount={handleUpdateDiscount}
              currency={systemSettings?.currency}
              shareImgModal={shareImgModal}
              handleImagesUpload={handleImageUpload}
              handleImageSlider={defaultUpdateModal}
            />
          </div>
        </>
      )}

      {renderModal()}
    </>
  );
};
