import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import EmailDetailsData from "./EmailDetailsData";
import DetailsData from "../DetailsData";

const EmailDetails = () => {
  return (
    <Layout>
      <DetailsCard>
        <DetailsData />
      </DetailsCard>
      <div className="flex mt-7">
        <EmailDetailsData />
      </div>
    </Layout>
  );
};

export default EmailDetails;
