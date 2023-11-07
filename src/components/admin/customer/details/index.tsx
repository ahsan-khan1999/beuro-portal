import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";

import useCustomerDetail from "@/hooks/admin/customer/useCustomerDetail";

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
      {/* <div className="flex mt-8">
        <CustomerForm
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          customerDetail={customerDetail}
          fields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div> */}
    </Layout>
  );
};

export default CustomerDetails;
