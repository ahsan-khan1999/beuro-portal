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
        <div className="flex items-center gap-x-[26px]">
          <span className="cursor-pointer" onClick={handleCancel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="40"
              viewBox="0 0 41 40"
              fill="none"
            >
              <rect
                x="0.750977"
                y="0.5"
                width="39.2105"
                height="39"
                rx="7.5"
                fill="white"
                stroke="#4A13E7"
              />
              <path
                d="M23.7911 13.2658C23.975 13.4498 24.0783 13.6993 24.0783 13.9594C24.0783 14.2196 23.975 14.4691 23.7911 14.6531L18.9346 19.5095L23.7911 24.366C23.9698 24.551 24.0687 24.7989 24.0664 25.0561C24.0642 25.3134 23.961 25.5594 23.7791 25.7413C23.5972 25.9232 23.3511 26.0264 23.0939 26.0287C22.8366 26.0309 22.5888 25.932 22.4038 25.7533L16.8537 20.2032C16.6697 20.0192 16.5664 19.7697 16.5664 19.5095C16.5664 19.2494 16.6697 18.9999 16.8537 18.8159L22.4038 13.2658C22.5878 13.0818 22.8373 12.9785 23.0974 12.9785C23.3576 12.9785 23.6071 13.0818 23.7911 13.2658Z"
                fill="#4A13E7"
              />
            </svg>
          </span>
          <h2 className="text-[#fff] text-xl font-medium">
            {translate("leads.customer_details.heading")}
          </h2>
        </div>

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
