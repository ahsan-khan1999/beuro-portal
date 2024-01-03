import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import LeadsDetailsCardData from "../LeadsDetailsCardData";
import LeadsDetailsData from "./LeadsDetailsData";

import useLeadDetail from "@/hooks/leads/useLeadDetail";

const LeadsDetails = () => {
  const { renderModal, leadDeleteHandler, leadDetails, loading } =
    useLeadDetail();
  return (
    <>
      <Layout>
        <DetailsCard>
          <LeadsDetailsCardData
            leadDeleteHandler={leadDeleteHandler}
            leadDetails={leadDetails}
          />
        </DetailsCard>
        <LeadsDetailsData loading={loading} />
      </Layout>

      {renderModal()}
    </>
  );
};

export default LeadsDetails;
