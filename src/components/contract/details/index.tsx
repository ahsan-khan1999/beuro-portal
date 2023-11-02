import { Layout } from "@/layout";
import ContractCardLayout from "@/layout/contractCard/ContractCardLayout";
import React from "react";
import CardDetailsData from "./ContractDetailsCard";
import DetailsData from "./DetailsData";
import ContractDetailsData from "./ContractDetailsData";

const ContractDetails = () => {
  return (
    <Layout>
      <CardDetailsData />
      <div className="my-4">
        <DetailsData />
      </div>

      <div className="flex ">
        <ContractDetailsData />
      </div>
    </Layout>
  );
};

export default ContractDetails;
