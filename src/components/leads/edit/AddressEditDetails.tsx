import { Form } from "@/base-components/form/form";
import { useLeadsAddressEditDetails } from "@/hooks/leads/useLeadsAddressEditDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { ComponentsType } from "../details/LeadsDetailsData";

const AddressEditDetails = ({onClick}: {onClick: (index: number, component: ComponentsType) => void;}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error , translate} =
    useLeadsAddressEditDetails(onClick);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 ">
        <h2 className="text-[#393939] text-lg font-medium">{translate("leads.address_details.main_heading")}</h2>
        <button onClick={() => onClick(1, ComponentsType.address)} className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[131px] w-full">
        {translate("leads.address_details.cancel_button")}
        </button>
      </div>

      <hr  className="opacity-20 mb-5"/>
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

export default AddressEditDetails;
