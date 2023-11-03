import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import LeadsDetailsCardData from "../LeadsDetailsCardData";
import LeadsEditDetailsData from "./LeadsEditDetailsData";

const LeadsEditDetails = () => {
  return (
    <Layout>
      <DetailsCard>
        {/* <LeadsDetailsCardData /> */}
      </DetailsCard>
      <div className="flex mt-7">
        <LeadsEditDetailsData />
      </div>
    </Layout>
  );
};

export default LeadsEditDetails;
