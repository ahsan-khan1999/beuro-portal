import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "./DetailsData";
import SideCard from "../SideCard";
import ServiceDetailsData from "./ServiceDetailsData";

const ServicesDetails = () => {
  return (
    <Layout>
      <DetailsCard>
        <DetailsData />
      </DetailsCard>
      <div className="flex mt-8">
        <ServiceDetailsData />
        <SideCard />
      </div>
    </Layout>
  );
};

export default ServicesDetails;
