import { Layout } from "@/layout";
import React from "react";
import LeadsEditDetailsData from "./LeadsEditDetailsData";

const LeadsEditDetails = () => {
  return (
    <Layout>
      <div className="flex mt-7">
        <LeadsEditDetailsData />
      </div>
    </Layout>
  );
};

export default LeadsEditDetails;
