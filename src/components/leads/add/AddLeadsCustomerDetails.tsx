import { Form } from "@/base-components/form/form";
import { useAddNewLeadCustomer } from "@/hooks/leads/useAddNewLeadCustomer";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { updateQuery } from "@/utils/update-query";

export interface AddLeadProps {
  onHandleNext: Function;
}

const AddLeadsCustomerDetails = ({ onHandleNext }: AddLeadProps) => {
  const { fields, onSubmit, handleSubmit, errors, translate, router } =
    useAddNewLeadCustomer(onHandleNext);

  const handleCancel = () => {
    router.pathname = "/leads";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
  };

  return (
    <FormCard>
      <div
        className="flex justify-between items-center bg-primary py-5 px-6 rounded-t-lg"
        id="Customer Details"
      >
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("leads.customer_details.heading")}
        </h2>
        <button
          onClick={handleCancel}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("leads.customer_details.cancel_button")}
        </button>
      </div>

      <div className="py-3 px-6">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </FormCard>
  );
};

export default AddLeadsCustomerDetails;
