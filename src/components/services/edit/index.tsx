import React from "react";
import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import SideCard from "../SideCard";
import EditDetailsData from "./EditDetailsData";
import ServiceEditDetails from "./ServiceEditDetails";
import { useRouter } from "next/router";

const ServicesDetails = () => {
  const router = useRouter();

  const handleRoute = () => {
    router.push("/services/details");
  };
  return (
    <Layout>
      <DetailsCard>
        <EditDetailsData />
      </DetailsCard>
      <div className="flex mt-8">
        <ServiceEditDetails handleRoute={handleRoute} />
        <SideCard />
      </div>
    </Layout>
  );
};

export default ServicesDetails;
