import { Layout } from "@/layout";
import React from "react";
import DetailsCard from "@/layout/customers/DetailsCard";
import OfferDetailsCard from "./OfferDetailsCard";
import OffersDetailsData from "./OffersDetailsData";

const OfferDetails = () => {
  return (
    <Layout>
      <DetailsCard>
        <OfferDetailsCard />
      </DetailsCard>

      <div className="mt-7">
        <OffersDetailsData />
      </div>
    </Layout>
  );
};

export default OfferDetails;
