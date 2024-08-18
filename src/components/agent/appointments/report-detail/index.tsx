import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { AppointmentsDetailCard } from "../agent-details/detail-card";
import { ReportDetailData } from "./detail-screens";
import { useReportDetails } from "@/hooks/appointments/useReportDetail";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

export const ReportDetails = () => {
  const {
    translate,
    isLoading,
    loading,
    handleStatusUpdate,
    renderModal,
    reportDetails,
    handleUpdateDiscount,
    handleImageUpload,
    shareImgModal,
    systemSettings,
    defaultUpdateModal,
    appointmentDetails,
    handleCreateReport,
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
              isAgent={true}
            />
          </div>
          <div className="xMini:bg-white mt-6">
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
              onStatusChange={handleStatusUpdate}
              appointmentDetails={appointmentDetails}
              isAgent={true}
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
