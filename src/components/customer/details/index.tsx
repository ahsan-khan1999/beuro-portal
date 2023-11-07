import { Layout } from "@/layout";
import DetailsCard from "@/layout/customers/DetailsCard";
import React from "react";
import DetailsData from "../DetailsData";
import SideCard from "../SideCard";

import CustomerForm from "../Form";
import useCustomerDetail from "@/hooks/customer/useCustomerDetail";

const CustomerDetails = () => {
  const { customerDetail, isUpdate, setIsUpdate,fields,handleSubmit,onSubmit,errors,handlePreviousClick } = useCustomerDetail(true)
  
  return (
    <Layout>
      <DetailsCard>
        <DetailsData date={customerDetail?.date} id={customerDetail?.id} name={customerDetail?.name} handlePreviousClick={handlePreviousClick}/>
      </DetailsCard>
      <div className="flex mt-8">
        <CustomerForm isUpdate={isUpdate} setIsUpdate={setIsUpdate} customerDetail={customerDetail} fields={fields} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors}/>
        <SideCard customerDetail={customerDetail} />
      </div>
    </Layout>
  );
};

export default CustomerDetails;
