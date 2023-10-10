import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import FormData from "./FormData";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";

const EmploysDetails = () => {
  return (
    <Layout>
      <DetailsCard>
        <DetailsData />
      </DetailsCard>
      <div className="flex mt-8">
        <FormData />
        <SideCard />
      </div>
    </Layout>
  );
};

export default EmploysDetails;
