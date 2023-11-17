import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";

import CustomerForm from "../CustomerForm";
import useCustomerDetail from "@/hooks/customer/useCustomerDetail";

const CustomerDetails = () => {
  const {
    customerDetail,
    isUpdate,
    setIsUpdate,
    fields,
    handleSubmit,
    onSubmit,
    errors,
    handlePreviousClick,
    deleteHandler,
    renderModal,

  } = useCustomerDetail(true);

  return (
    <Layout>
      <DetailsCard>
        <DetailsData
          date={customerDetail?.date}
          id={customerDetail?.refID}
          name={customerDetail?.fullName}
          handlePreviousClick={handlePreviousClick}
          handleDelete={deleteHandler}
        />
      </DetailsCard>
      <div className="flex mt-8">
        <CustomerForm
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          customerDetail={customerDetail}
          fields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
        <SideCard customerDetail={customerDetail} />
      </div>
      {renderModal()}
    </Layout>
  );
};

export default CustomerDetails;
