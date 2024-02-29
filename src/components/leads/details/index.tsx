import { Layout } from "@/layout";
import React from "react";
import LeadsDetailsCardData from "../LeadsDetailsCardData";
import LeadsDetailsData from "./LeadsDetailsData";
import useLeadDetail from "@/hooks/leads/useLeadDetail";
import LoadingState from "@/base-components/loadingEffect/loading-state";

const LeadsDetails = () => {
  const {
    renderModal,
    leadDeleteHandler,
    leadDetails,
    loading,
    loadingDetails,
    handleStatusUpdate,
  } = useLeadDetail();
  return (
    <Layout>
      {loadingDetails ? (
        <LoadingState />
      ) : (
        <>
          <div className="bg-white rounded-md px-5 pt-5 pb-10 xlg:fixed xlg:-mt-[250px] maxSize:border-t-[14px] border-t-defaultBackground calWidth z-10">
            <LeadsDetailsCardData
              leadDeleteHandler={leadDeleteHandler}
              leadDetails={leadDetails}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
          <div className="xlg:mt-[330px] w-full xlg:block">
            <LeadsDetailsData loading={loading} />
          </div>

          {renderModal()}
        </>
      )}
    </Layout>
  );
};

export default LeadsDetails;
