import { Form } from "@/base-components/form/form";
import { useLeadAdditionalDetails } from "@/hooks/leads/useLeadAdditionalDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { ComponentsType } from "../details/LeadsDetailsData";

const AditionalEditDetails = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const defaultClassName = "mt-0";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useLeadAdditionalDetails(onClick);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-[#e5e5e5]">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("leads.additional.heading")}
        </h2>
        <button
          onClick={() => onClick(3, ComponentsType.additional)}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[131px] w-full"
        >
          {translate("leads.additional.cancel_button")}
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

export default AditionalEditDetails;
