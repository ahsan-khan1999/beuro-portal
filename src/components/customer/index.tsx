import { Layout } from "@/layout";
import DetailsCard from "@/layout/customer/DetailsCard";
import React from "react";
import DetailsData from "./DetailsData";
import SideCard from "./sideCard";
import CustomerForm from "./Form";

const CustomerDetails = () => {
  return (
    <Layout>
      <DetailsCard>
        <DetailsData />
      </DetailsCard>
      <div className="flex mt-8">
        <CustomerForm />
        <SideCard />
      </div>
    </Layout>
  );
};

export default CustomerDetails;
