import { Form } from "@/base-components/form/form";
import { useCustomerDetails } from "@/hooks/useCustomerDetails";
import { Layout } from "@/layout";
import DetailsCard from "@/layout/customer/DetailsCard";
import React from "react";
import DetailsData from "./DetailsData";
import FormCard from "@/layout/customer/FormCard";
import SideCard from "./sideCard";

const CustomerDetails = () => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useCustomerDetails();
  return (
    <Layout>
      <DetailsCard>
        <DetailsData />
      </DetailsCard>
      <div className="flex mt-8">
        <FormCard>
          <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
            <h2 className="text-[#393939] text-lg font-medium">
              Customer Details
            </h2>
            <button className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-9">
              Cancel
            </button>
          </div>
          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            className={`${defaultClassName}`}
          />
        </FormCard>
        <SideCard />
      </div>
    </Layout>
  );
};

export default CustomerDetails;
