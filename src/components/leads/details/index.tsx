import { Layout } from "@/layout";
import React from "react";
import LeadsDetailsCardData from "../LeadsDetailsCardData";
import LeadsDetailsData from "./LeadsDetailsData";
import useLeadDetail from "@/hooks/leads/useLeadDetail";

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
  } = useLeadDetail();

  return (
    <Layout>
      <div className="bg-white rounded-md px-5 pt-5 pb-10 xlg:fixed xlg:-mt-[250px] maxSize:border-t-[14px] border-t-defaultBackground calWidth z-10">
        <LeadsDetailsCardData
          leadDeleteHandler={leadDeleteHandler}
          leadDetails={leadDetails}
          onStatusUpdate={handleStatusUpdate}
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

      {renderModal()}
    </Layout>
  );
};

export default LeadsDetails;
