import React from "react";
import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";
import ServiceForm from "../Form";

const ServicesDetails = () => {
  return (
    <Layout>
      <DetailsCard>
        <DetailsData />
      </DetailsCard>
      <div className="flex mt-8">
        <ServiceForm />
        <SideCard />
      </div>
    </Layout>
  );
};

export default ServicesDetails;
