import { Form } from "@/base-components/form/form";
import { useCustomerDetails } from "@/hooks/useCustomerDetails";
import { Layout } from "@/layout";
import React from "react";

const CustomerDetails = () => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useCustomerDetails();
  return (
    <Layout>
      <div className="flex">
        <div className="rounded-md bg-white pt-5 px-6 pb-6 border border-primary w-full h-fit">
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
        </div>
        <div className="ml-8 bg-white rounded-md px-5 py-6 w-full max-w-[254px] h-[634px]">
          <h2 className="text-[#393939] text-lg font-medium pb-6 border-b border-black border-opacity-20">
            Customer Details
          </h2>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDetails;
