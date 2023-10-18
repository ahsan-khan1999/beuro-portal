import { Layout } from "@/layout";
import ContractCardLayout from "@/layout/contractCard/ContractCardLayout";
import React from "react";
import CardDetailsData from "./CardDetailsData";
import ContractDetailHeadLayout from "@/layout/contractCard/ContractDetailHeadLayout";
import DetailsData from "./DetailsData";
import ContractDetailsData from "./ContractDetailsData";

const ContractDetails = () => {
  return (
    <Layout>
      <ContractCardLayout>
        <CardDetailsData />
      </ContractCardLayout>

      <ContractDetailHeadLayout>
        <DetailsData />
      </ContractDetailHeadLayout>

      <div className="flex ">
          <ContractDetailsData />
        </div>
    </Layout>
  );
};

export default ContractDetails;
