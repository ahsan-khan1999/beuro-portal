import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "./DetailsData";
import SideCard from "../SideCard";
import ServiceDetailsData from "./ServiceDetailsData";
import useServiceDetail from "@/hooks/services/useServiceDetail";

const ServicesDetails = () => {
  const { serviceDetail } = useServiceDetail();
  return (
    <Layout>
      <DetailsCard>
        <DetailsData serviceDetail={serviceDetail} />
      </DetailsCard>
      <div className="flex mt-8">
        <ServiceDetailsData serviceDetail={serviceDetail} />
        <SideCard />
      </div>
    </Layout>
  );
};

export default ServicesDetails;
