import { Layout } from "@/layout";
import React from "react";
import DetailsCard from "@/layout/customers/DetailsCard";
import OfferDetailsCard from "./OfferDetailsCard";
import OffersDetailsData from "./OffersDetailsData";
import useOfferDetails from "@/hooks/offers/useOfferDetails";
import ComposeMail from "../compose-mail/ComposeMail";

const OfferDetails = () => {
  const {
    offerDeleteHandler,
    offerDetails,
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
    handleSendByPost
  } = useOfferDetails();

  return (
    <Layout>
      <DetailsCard>
        <OfferDetailsCard
          offerDetails={offerDetails}
          offerDeleteHandler={offerDeleteHandler}
          handleNotes={handleNotes}
          handleImageUpload={handleImageUpload}
          handleStatusUpdate={handleStatusUpdate}
          handlePaymentStatusUpdate={handlePaymentStatusUpdate}
          handleSendEmail={handleSendEmail}
          isSendEmail={isSendEmail}
          handleSendByPost={handleSendByPost}
          loading={loading}

        />
      </DetailsCard>

      <div className="w-full mt-7">
        {isSendEmail ? (
          <ComposeMail
            backRouteHandler={handleSendEmail}
            onNextHandle={onNextHandle}
          />
        ) : (
          <OffersDetailsData offerDetails={offerDetails} loading={loading} />
        )}
      </div>
      {renderModal()}
    </Layout>
  );
};

export default OfferDetails;
