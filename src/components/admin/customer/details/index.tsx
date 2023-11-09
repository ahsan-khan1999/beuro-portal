import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";

import useCustomerDetail from "@/hooks/admin/customer/useCustomerDetail";
import CustomerDetailsData from "./customer-details-data";

const CustomerDetails = () => {
  const { customerDetail, handlePreviousClick } = useCustomerDetail(true);

  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          customerDetail={customerDetail}
          handlePreviousClick={handlePreviousClick}
        />
      </DetailsCard>
      <div className="flex mt-8">
        <CustomerDetailsData customerDetail={customerDetail} />
      </div>
    </Layout>
  );
};

export default CustomerDetails;
