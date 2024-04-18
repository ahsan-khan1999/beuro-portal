import { Form } from "@/base-components/form/form";
import { useLeadsServiceEditDetails } from "@/hooks/leads/useLeadsServiceEditDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { ComponentsType } from "../details/LeadsDetailsData";

const ServiceEditDetails = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useLeadsServiceEditDetails(onClick);
  return (
    <FormCard>
      <div className="flex justify-between items-center bg-[#C50EE0] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-lg font-medium">
          {translate("leads.service_details.heading")}
        </h2>
        <button
          onClick={() => onClick(2, ComponentsType.service)}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("leads.address_details.cancel_button")}
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

export default ServiceEditDetails;
