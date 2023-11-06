import React from "react";
import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import SideCard from "../SideCard";
import EditDetailsData from "./EditDetailsData";
import ServiceEditDetails from "./ServiceEditDetails";
import { useRouter } from "next/router";
import useServiceDetail from "@/hooks/services/useServiceDetail";

const ServicesDetails = () => {
  const { serviceDetail } = useServiceDetail();
  const router = useRouter();

  const handleRoute = () => {
    router.push({
      pathname: "/services/details",
      query: { service: serviceDetail?.id },
    });
  };
  return (
    <Layout>
      <DetailsCard>
        <EditDetailsData serviceDetail={serviceDetail} />
      </DetailsCard>
      <div className="flex mt-8">
        <ServiceEditDetails
          handleRoute={handleRoute}
          serviceDetail={serviceDetail}
        />
        <SideCard />
      </div>
    </Layout>
  );
};

export default ServicesDetails;
