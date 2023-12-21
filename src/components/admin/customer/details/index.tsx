import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React, { useState } from "react";
import DetailsData from "../DetailsData";

import CustomerDetailsData from "./customer-details-data";
import useCustomerDetailAdmin from "@/hooks/admin/customer/useCustomerDetail";

const CustomerDetails = () => {
  const {
    companyDetails,
    isCustomerFree,
    handleAreYouSure,
    handlePreviousClick,
    renderModal,
    handleStatusChange
  } = useCustomerDetailAdmin();

 

  return (
    <>
      <Layout>
        <DetailsCard>
          <DetailsData
            customerDetail={companyDetails}
            handlePreviousClick={handlePreviousClick}
            handleAreYouSure={handleAreYouSure}
            isCustomerFree={isCustomerFree}
            handleStatusChange={handleStatusChange}
          />
        </DetailsCard>
        <div className="flex mt-8">
          <CustomerDetailsData customerDetail={companyDetails} />
        </div>
      </Layout>
      {renderModal()}
    </>
  );
};

export default CustomerDetails;
