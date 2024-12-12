import React from "react";
import { Layout } from "@/layout";
import AddOffersDetailsData from "./AddOffersDetailsData";

const OfferAddDetails = () => {
  return (
    <Layout>
      {/* <p className="mb-5 text-2xl text-[#222B45] font-semibold">
        {translate("common.add_new_offer")}
      </p> */}
      <AddOffersDetailsData />
    </Layout>
  );
};

export default OfferAddDetails;
