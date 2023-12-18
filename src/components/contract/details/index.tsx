import { Layout } from "@/layout";
import React from "react";
import CardDetailsData from "./ContractDetailsCard";
import DetailsData from "./DetailsData";
import ContractDetailsData from "./ContractDetailsData";
import useContractDetail from "@/hooks/contract/useContractDetail";
import ComposeMail from "../compose-mail/ComposeMail";

const ContractDetails = () => {
  const {
    offerDeleteHandler,
    contractDetails,
    renderModal,
    handleImageUpload,
    handleNotes,
    handlePaymentStatusUpdate,
    handleStatusUpdate,
    handleSendEmail, isSendEmail, setIsSendEmail, onNextHandle
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
        handleSendEmail={handleSendEmail}
      />
      <div className="my-4">
        <DetailsData contractDetails={contractDetails} />
      </div>
      {
        isSendEmail ?
          <ComposeMail
            backRouteHandler={handleSendEmail}
            onNextHandle={onNextHandle}
          />
          :
          <ContractDetailsData />}

      {renderModal()}
    </Layout>
  );
};

export default ContractDetails;
