import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SupportDetailsData from "./support-request-data";
import useSupportDetail from "@/hooks/admin/support-request/useSupportDetail";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

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
          // status={status}
          handlePreviousClick={handlePreviousClick}
          handleStatusUpadte={handleStatusUpadte}
        />
      </DetailsCard>
      <div className="mt-8">
        {loading ? (
          <CustomLoader />
        ) : (
          <SupportDetailsData supportDetail={contactSupportDetails} />
        )}
      </div>
      {renderModal()}
    </Layout>
  );
};

export default SupportRequestDetails;
