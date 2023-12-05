import { Layout } from "@/layout";
import React from "react";
import DetailsCard from "@/layout/customers/DetailsCard";
import OfferDetailsCard from "./OfferDetailsCard";
import OffersDetailsData from "./OffersDetailsData";
import useOfferDetails from "@/hooks/offers/useOfferDetails";

const OfferDetails = () => {
  const { offerDeleteHandler, offerDetails, renderModal, handleImageUpload, handleNotes } = useOfferDetails()
  return (
    <Layout>
      <DetailsCard>
        <OfferDetailsCard offerDetails={offerDetails} offerDeleteHandler={offerDeleteHandler} handleNotes={handleNotes} handleImageUpload={handleImageUpload} />
      </DetailsCard>

      <div className="w-full mt-7">
        <OffersDetailsData offerDetails={offerDetails} />
      </div>
      {renderModal()}
    </Layout>
  );
};

export default OfferDetails;
