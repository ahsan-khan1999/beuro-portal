import { Layout } from "@/layout";
import React from "react";
import CardDetailsData from "./ContractDetailsCard";
import DetailsData from "./DetailsData";
import ContractDetailsData from "./ContractDetailsData";
import useContractDetail from "@/hooks/contract/useContractDetail";
import ComposeMail from "../compose-mail/ComposeMail";
import MailDetailsCard from "../compose-mail/MailDetailsCard";

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
      <div className="bg-white rounded-md px-5 pt-5 pb-10 2xl:fixed offerCardCalWidth z-10 2xl:-mt-[285px] 2xl:border-t-[14px] 2xl:border-t-defaultBackground">
        <CardDetailsData
          contractDetails={contractDetails}
          offerDeleteHandler={offerDeleteHandler}
          handleImageUpload={handleImageUpload}
          handleNotes={handleNotes}
          handlePaymentStatusUpdate={handlePaymentStatusUpdate}
          handleStatusUpdate={handleStatusUpdate}
          handleSendEmail={handleSendEmail}
          isSendEmail={isSendEmail}
        />
      </div>

      {isSendEmail ? (
        <>
          <div className="bg-white rounded-md px-5 pt-5 pb-10">
            <CardDetailsData
              contractDetails={contractDetails}
              offerDeleteHandler={offerDeleteHandler}
              handleImageUpload={handleImageUpload}
              handleNotes={handleNotes}
              handlePaymentStatusUpdate={handlePaymentStatusUpdate}
              handleStatusUpdate={handleStatusUpdate}
              handleSendEmail={handleSendEmail}
              isSendEmail={isSendEmail}

            />
          </div>
          <div className="mt-5">
            <ComposeMail
              backRouteHandler={handleSendEmail}
              onNextHandle={onNextHandle}
            />
          </div>
        </>
      ) : (
        <div className={`2xl:mt-[365px] w-full xl:block`}>
          <div className="mb-4 max-h-[75px] overflow-y-scroll">
            {contractDetails?.signedContracts &&
              contractDetails?.signedContracts?.length > 0 && (
                <DetailsData
                  contractDetails={contractDetails}
                  handleViewPdf={handleViewPdf}
                />
              )}
          </div>

          <ContractDetailsData loading={loading} />
        </div>
      )}

      {renderModal()}
    </Layout>
  );
};

export default ContractDetails;
