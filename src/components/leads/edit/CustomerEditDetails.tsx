import React from "react";
import { Form } from "@/base-components/form/form";
import { useLeadCustomerEditDetails } from "@/hooks/leads/useLeadCustomerEditDetails";
import FormCard from "@/layout/customers/FormCard";
import { ComponentsType } from "../details/LeadsDetailsData";

const CustomerEditDetails = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useLeadCustomerEditDetails(onClick);

  return (
    <FormCard>
      <div className="flex justify-between items-center bg-[#4A13E7] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-lg font-medium">
          {translate("leads.customer_details.heading")}
        </h2>
        <button
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
          onClick={() => onClick(0, ComponentsType.customer)}
        >
          {translate("leads.customer_details.cancel_button")}
        </button>
      </div>

      <div className="px-6 py-3">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          className={`${defaultClassName}`}
        />
      </div>
    </FormCard>
  );
};

export default CustomerEditDetails;
