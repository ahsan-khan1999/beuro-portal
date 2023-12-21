import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SupportDetailsData from "./support-request-data";
import useSupportDetail from "@/hooks/admin/support-request/useSupportDetail";

const SupportRequestDetails = () => {
  const { contactSupportDetails, status, handlePreviousClick, handleStatusUpadte, renderModal } = useSupportDetail();


  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          supportDetail={contactSupportDetails}
          status={status}
          handlePreviousClick={handlePreviousClick}
          handleStatusUpadte={handleStatusUpadte}
        />
      </DetailsCard>
      <div className="flex mt-8">
        <SupportDetailsData supportDetail={contactSupportDetails} />
      </div>
      {renderModal()}
    </Layout>
  );
};

export default SupportRequestDetails;
