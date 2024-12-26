import { useReportDetails } from "@/hooks/appointments/useReportDetail";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
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
    reportDetails,
    systemSettings,
    handleNotes,
    handleUploadImages,
  } = useReportDetails();

  const cardClass = appointmentDetails?.isReportSubmitted
    ? "2xl:fixed offerCardCalWidth z-10 2xl:-mt-[270px] 2xl:border-t-[14px] 2xl:border-t-defaultBackground"
    : "";

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          <div className={cardClass}>
            <AppointmentsDetailCard
              onStatusChange={handleStatusUpdate}
              appointmentDetails={appointmentDetails}
              handleImageUpload={handleUploadImages}
              handleNotes={handleNotes}
              reportDetails={reportDetails}
            />
          </div>

          {appointmentDetails?.isReportSubmitted ? (
            <div className="2xl:mt-[350px] w-full 2xl:block mb-10">
              <ReportDetailData
                reportDetail={reportDetails}
                loading={isLoading}
                handleUpdateDiscount={handleUpdateDiscount}
                currency={systemSettings?.currency}
              />
            </div>
          ) : (
            !isLoading && (
              <div className="xMini:bg-white mt-6 xMini:flex items-center justify-center">
                <NoDataEmptyState
                  heading={translate("appointments.detail_data.no_data_found")}
                  containerClassName="xMini:py-[153px]"
                  imgClassName="w-14 h-14 xMini:w-fit xMini:h-fit"
                  textClassName="text-lg xMini:text-2xl"
                  className="py-5 px-3 w-full xMini:py-10 xMini:px-6 xMini:w-[617px]"
                />
              </div>
            )
          )}

          {renderModal()}
        </>
      )}
    </>
  );
};
