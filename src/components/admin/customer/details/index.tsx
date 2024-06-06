import React from "react";
import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import CustomerDetailsData from "./customer-details-data";
import useCustomerDetailAdmin from "@/hooks/admin/customer/useCustomerDetail";
import DetailsData from "../DetailsData";
import { CustomPuffLoader } from "@/base-components/ui/loader/puff-loader";

const CustomerDetails = () => {
  const {
    companyDetails,
    isCustomerFree,
    handleAreYouSure,
    handleBack,
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
            onHandleBack={handleBack}
            handleAreYouSure={handleMakeAccountFree}
            isCustomerFree={isCustomerFree}
            handleStatusChange={handleStatusChange}
          />
        </DetailsCard>
        <div className="mt-5">
          {loading ? (
            <CustomPuffLoader />
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
