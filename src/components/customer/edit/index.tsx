import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import CustomerForm from "../Form";
import SideCard from "../SideCard";

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
