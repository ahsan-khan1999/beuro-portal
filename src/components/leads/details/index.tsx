import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import LeadsDetailsCardData from "../LeadsDetailsCardData";
import LeadsDetailsData from "../LeadsDetailsData";

const LeadsDetails = () => {
  return (
    <Layout>
      <DetailsCard>
        <LeadsDetailsCardData />
      </DetailsCard>
      <div className="flex mt-7">
        <LeadsDetailsData />
      </div>

      
    </Layout>
  );
};

export default LeadsDetails;
