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
    handleSendEmail,
    isSendEmail,
    setIsSendEmail,
    onNextHandle,
    loading,
    handleViewPdf,
  } = useContractDetail();

  return (
    <Layout>
      <div
        className={`2xl:fixed offerCardCalWidth z-10 ${
          contractDetails?.signedContracts &&
          contractDetails?.signedContracts?.length > 0
            ? "2xl:-mt-[360px]"
            : "2xl:-mt-[280px]"
        }`}
      >
        <div className="bg-white rounded-md px-5 pt-5 pb-10">
          <CardDetailsData
            contractDetails={contractDetails}
            offerDeleteHandler={offerDeleteHandler}
            handleImageUpload={handleImageUpload}
            handleNotes={handleNotes}
            handlePaymentStatusUpdate={handlePaymentStatusUpdate}
            handleStatusUpdate={handleStatusUpdate}
            handleSendEmail={handleSendEmail}
          />
        </div>
        <div className="my-4">
          {contractDetails?.signedContracts &&
            contractDetails?.signedContracts?.length > 0 && (
              <DetailsData
                contractDetails={contractDetails}
                handleViewPdf={handleViewPdf}
              />
            )}
        </div>
      </div>

      {isSendEmail ? (
        <ComposeMail
          backRouteHandler={handleSendEmail}
          onNextHandle={onNextHandle}
        />
      ) : (
        <div
          className={`${
            contractDetails?.signedContracts &&
            contractDetails?.signedContracts?.length > 0
              ? "2xl:mt-[460px]"
              : "2xl:mt-[380px]"
          } w-full xl:block`}
        >
          <ContractDetailsData loading={loading} />
        </div>
      )}

      {renderModal()}
    </Layout>
  );
};

export default ContractDetails;
