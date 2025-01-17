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
    handleBack,
    renderModal,
    handleStatusChange,
    loading,
    handleMakeAccountFree,
    deleteHandler,
    handleAddAppointment,
    isToggleChecked,
    handleDeleteCompany,
  } = useCustomerDetailAdmin();

  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          customerDetail={companyDetails}
          onHandleBack={handleBack}
          handleAreYouSure={handleMakeAccountFree}
          isCustomerFree={isCustomerFree}
          onStatusChange={handleStatusChange}
          onDelete={deleteHandler}
          onCompanyUpdate={handleAddAppointment}
          isToggleChecked={isToggleChecked}
          onDeleteCompany={handleDeleteCompany}
        />
      </DetailsCard>
      <div className="mt-5">
        {loading ? (
          <CustomPuffLoader />
        ) : (
          <CustomerDetailsData customerDetail={companyDetails} />
        )}
      </div>
      {renderModal()}
    </Layout>
  );
};

export default CustomerDetails;
