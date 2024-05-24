import React from "react";
import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import CustomerDetailsData from "./customer-details-data";
import useCustomerDetailAdmin from "@/hooks/admin/customer/useCustomerDetail";
import LoadingState from "@/base-components/loadingEffect/loading-state";
import DetailsData from "../DetailsData";

const CustomerDetails = () => {
  const {
    companyDetails,
    isCustomerFree,
    handleAreYouSure,
    handlePreviousClick,
    renderModal,
    handleStatusChange,
    loading,
    handleMakeAccountFree,
  } = useCustomerDetailAdmin();

  return (
    <>
      <Layout>
        <DetailsCard>
          <DetailsData
            customerDetail={companyDetails}
            handlePreviousClick={handlePreviousClick}
            handleAreYouSure={handleMakeAccountFree}
            isCustomerFree={isCustomerFree}
            handleStatusChange={handleStatusChange}
          />
        </DetailsCard>
        <div className="mt-8">
          {loading ? (
            <LoadingState />
          ) : (
            <CustomerDetailsData customerDetail={companyDetails} />
          )}
        </div>
      </Layout>
      {renderModal()}
    </>
  );
};

export default CustomerDetails;
