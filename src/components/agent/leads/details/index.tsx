import { Layout } from "@/layout";
import React from "react";
import useLeadDetail from "@/hooks/leads/useLeadDetail";
import { AgentLeadsDetailsData } from "./leads-details-screen";
import LeadsDetailsCardData from "@/components/leads/details/LeadsDetailsCardData";

export const AgentLeadsDetails = () => {
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
    handleScheduleAppointments,
  } = useLeadDetail();

  return (
    <Layout>
      <div className="bg-white rounded-md px-5 pt-5 pb-10 xlg:fixed xlg:-mt-[250px] maxSize:border-t-[14px] border-t-defaultBackground calWidth z-10">
        <LeadsDetailsCardData
          leadDeleteHandler={leadDeleteHandler}
          leadDetails={leadDetails}
          onStatusUpdate={handleStatusUpdate}
          onCreateAppointment={handleScheduleAppointments}
          isAgent={true}
        />
      </div>
      <div className="xlg:mt-[330px] w-full xlg:block mb-10">
        <AgentLeadsDetailsData
          leadDetails={leadDetails}
          loading={loadingDetails}
          shareImgModal={shareImgModal}
          handleImagesUpload={handleUploadImages}
          handleImageSlider={defaultUpdateModal}
        />
      </div>

      {renderModal()}
    </Layout>
  );
};
