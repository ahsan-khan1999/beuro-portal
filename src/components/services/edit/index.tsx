import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";

const ServicesDetails = () => {
  return (
    <Layout>
      <DetailsCard>
        <DetailsData />
      </DetailsCard>
      <div className="flex mt-8">
        <div className="w-full">
          <h2 className="flex justify-center items-center h-full">Buro 365</h2>
        </div>
        <SideCard />
      </div>
    </Layout>
  );
};

export default ServicesDetails;
