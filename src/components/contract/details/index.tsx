import { Layout } from "@/layout";
import React from "react";
import CardDetailsData from "./ContractDetailsCard";
import DetailsData from "./DetailsData";
import ContractDetailsData from "./ContractDetailsData";
import useContractDetail from "@/hooks/contract/useContractDetail";

const ContractDetails = () => {
  const {
    offerDeleteHandler,
    contractDetails,
    renderModal,
    handleImageUpload,
    handleNotes,
    handlePaymentStatusUpdate,
    handleStatusUpdate,
  } = useContractDetail();

  return (
    <Layout>
      <CardDetailsData
        contractDetails={contractDetails}
        offerDeleteHandler={offerDeleteHandler}
        handleImageUpload={handleImageUpload}
        handleNotes={handleNotes}
        handlePaymentStatusUpdate={handlePaymentStatusUpdate}
        handleStatusUpdate={handleStatusUpdate}
      />
      <div className="my-4">
        <DetailsData contractDetails={contractDetails} />
      </div>
      <ContractDetailsData />
      {renderModal()}
    </Layout>
  );
};

export default ContractDetails;
