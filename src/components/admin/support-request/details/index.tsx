import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import useSupportDetail from "@/hooks/admin/support-request/useSupportDetail";
import { CustomPuffLoader } from "@/base-components/ui/loader/puff-loader";
import { SupportDetailsData } from "./support-request-data";
import { DetailsData } from "../DetailsData";

const SupportRequestDetails = () => {
  const {
    contactSupportDetails,
    // status,
    handlePreviousClick,
    handleStatusUpadte,
    renderModal,
    loading,
  } = useSupportDetail();

  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          supportDetail={contactSupportDetails}
          handlePreviousClick={handlePreviousClick}
          handleStatusUpadte={handleStatusUpadte}
        />
      </DetailsCard>
      <div className="mt-5">
        {loading ? (
          <CustomPuffLoader />
        ) : (
          <SupportDetailsData supportDetail={contactSupportDetails} />
        )}
      </div>
      {renderModal()}
    </Layout>
  );
};

export default SupportRequestDetails;
