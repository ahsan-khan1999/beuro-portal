import { Layout } from "@/layout";
import React from "react";
import LeadsDetailsData from "./LeadsDetailsData";
import useLeadDetail from "@/hooks/leads/useLeadDetail";
import LeadsDetailsCardData from "./LeadsDetailsCardData";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

const LeadsDetails = () => {
  const {
    renderModal,
    leadDeleteHandler,
    leadDetails,
    loading,
    loadingDetails,
    handleStatusUpdate,
    defaultUpdateModal,
    handleUploadImages,
    shareImgModal,
    handleNotes,
    handleScheduleAppointments,
  } = useLeadDetail();

  return (
    <Layout>
      {loadingDetails ? (
        <CustomLoader />
      ) : (
        <>
          <div className="bg-white rounded-md px-5 pt-5 pb-10 xlg:fixed xlg:-mt-[250px] maxSize:border-t-[14px] border-t-defaultBackground calWidth z-10">
            <LeadsDetailsCardData
              leadDeleteHandler={leadDeleteHandler}
              leadDetails={leadDetails}
              onStatusUpdate={handleStatusUpdate}
              onCreateAppointment={handleScheduleAppointments}
              handleNotes={handleNotes}
              handleImageUpload={handleUploadImages}
            />
          </div>
          <div className="xlg:mt-[330px] w-full xlg:block mb-10">
            <LeadsDetailsData
              leadDetails={leadDetails}
              loading={loadingDetails}
              shareImgModal={shareImgModal}
              handleImagesUpload={handleUploadImages}
              handleImageSlider={defaultUpdateModal}
            />
          </div>
        </>
      )}

      {renderModal()}
    </Layout>
  );
};

export default LeadsDetails;
