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
      <div className="grid grid-cols-1 mt-8 gap-x-8 gap-y-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CustomerForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            customerDetail={customerDetail}
            fields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        </div>
        <div className="xl:col-span-1">
          <SideCard customerDetail={customerDetail} />
        </div>
      </div>
      {renderModal()} 
    </Layout>
  );
};

export default CustomerDetails;
