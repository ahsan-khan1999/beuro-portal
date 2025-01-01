import { ReportDetailData } from "./detail-screens";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { AppointmentsDetailCard } from "../agent-details/detail-card";
import { useReportDetails } from "@/hooks/appointments/useReportDetail";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { useEffect } from "react";

export const ReportDetails = () => {
  const {
    translate,
    isLoading,
    loading,
    handleStatusUpdate,
    renderModal,
    reportDetails,
    handleUpdateDiscount,
    systemSettings,
    appointmentDetails,
    handleCreateReport,
    handleNotes,
    handleUploadImages,
    initialLoading,
    setInitialLoading,
  } = useReportDetails();

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setInitialLoading(false), 0);
    }
  }, [isLoading]);

  if (initialLoading || (loading && isLoading)) {
    return <CustomLoader />;
  }

  const styles =
    "2xl:fixed offerCardCalWidth z-10 2xl:-mt-[275px] 2xl:border-t-[14px] 2xl:border-t-defaultBackground";

  return (
    <>
      {/* {loading && isLoading ? (
        <CustomLoader />
      ) : ( */}
      <>
        <div
          className={`${!appointmentDetails?.isReportSubmitted ? "" : styles}`}
        >
          <AppointmentsDetailCard
            isAgent={true}
            handleNotes={handleNotes}
            onStatusChange={handleStatusUpdate}
            appointmentDetails={appointmentDetails}
            handleImageUpload={handleUploadImages}
          />
        </div>
        {!appointmentDetails?.isReportSubmitted ? (
          <div className="xMini:bg-white mt-6">
            <NoDataEmptyState
              heading={translate("appointments.detail_data.no_data_found")}
              isButton={true}
              onButtonClick={handleCreateReport}
              buttonHeading={translate("common.create_report_btn")}
              containerClassName="xMini:py-[153px] w-full xMini:flex xMini:items-center xMini:justify-center"
              className="py-5 px-3 xMini:py-10 xMini:px-6 w-full xMini:w-[531px]"
              imgClassName="w-14 h-14 xMini:w-fit xMini:h-fit"
              textClassName="text-lg xMini:text-2xl"
            />
          </div>
        ) : (
          <div className="2xl:mt-[355px] w-full 2xl:block mb-10">
            <ReportDetailData
              reportDetail={reportDetails}
              // loading={isLoading}
              handleUpdateDiscount={handleUpdateDiscount}
              currency={systemSettings?.currency}
            />
          </div>
        )}

        {renderModal()}
      </>
      {/* )} */}
    </>
  );
};
