import { Layout } from "@/layout";
import React from "react";
import LeadsDetailsData from "./LeadsDetailsData";
import useLeadDetail from "@/hooks/leads/useLeadDetail";
import LeadsDetailsCardData from "./LeadsDetailsCardData";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import ComposeLeadMail from "../compose-mail/ComposeMail";

const LeadsDetails = () => {
  const {
    renderModal,
    leadDeleteHandler,
    leadDetails,
    loadingDetails,
    handleStatusUpdate,
    defaultUpdateModal,
    handleUploadImages,
    shareImgModal,
    handleNotes,
    handleScheduleAppointments,
    loading,
    handleSendByPost,
    handleSendEmail,
    isSendEmail,
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
              loading={loading}
              handleImageUpload={handleUploadImages}
              handleSendByPost={handleSendByPost}
              handleSendEmail={handleSendEmail}
              isSendEmail={isSendEmail}
            />
          </div>
          <div className="xlg:mt-[330px] w-full xlg:block mb-10">
            {isSendEmail ? (
              <div className="mt-5">
                <ComposeLeadMail backRouteHandler={handleSendEmail} />
              </div>
            ) : (
              <LeadsDetailsData
                leadDetails={leadDetails}
                loading={loadingDetails}
                shareImgModal={shareImgModal}
                handleImagesUpload={handleUploadImages}
                handleImageSlider={defaultUpdateModal}
              />
            )}
          </div>
        </>
      )}

      {renderModal()}
    </Layout>
  );
};

export default LeadsDetails;
