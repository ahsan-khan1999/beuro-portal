import { Form } from "@/base-components/form/form";
import { useCustomerDetails } from "@/hooks/customer/useCustomerDetails";
import FormCard from "@/layout/customers/FormCard";
import { CustomerField } from "@/types/customer";
import React from "react";

const CustomerForm = (data?: CustomerField) => {
  console.log(data,"data");
  
  const defaultClassName = "mt-[30px]  ";

  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useCustomerDetails(data?.customerDetail);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">Customer Details</h2>
        <button className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[131px] w-full">
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
  );
};

export default CustomerForm;
