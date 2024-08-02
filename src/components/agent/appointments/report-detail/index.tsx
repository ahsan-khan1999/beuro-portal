import { AppointmentsDetailCard } from "../agent-details/detail-card";
import { ReportDetailCard } from "./detail-card";
import { ReportDetailData } from "./detail-screens";
import { useReportDetails } from "@/hooks/appointments/useReportDetail";

export const ReportDetails = () => {
  const {
    translate,
    loading,
    handleStatusUpdate,
    renderModal,
    reportDetails,
    handleUpdateDiscount,
    handleImageUpload,
    shareImgModal,
    systemSettings,
    defaultUpdateModal,
  } = useReportDetails();

  return (
    <>
      <div className=" 2xl:fixed offerCardCalWidth z-10 2xl:-mt-[295px] 2xl:border-t-[14px] 2xl:border-t-defaultBackground">
        <ReportDetailCard
          onStatusChange={handleStatusUpdate}
          reportDetail={reportDetails}
        />
      </div>

      <div className="2xl:mt-[375px] w-full 2xl:block mb-10">
        <ReportDetailData
          reportDetail={reportDetails}
          loading={loading}
          handleUpdateDiscount={handleUpdateDiscount}
          currency={systemSettings?.currency}
          shareImgModal={shareImgModal}
          handleImagesUpload={handleImageUpload}
          handleImageSlider={defaultUpdateModal}
        />
      </div>

      {renderModal()}
    </>
  );
};
