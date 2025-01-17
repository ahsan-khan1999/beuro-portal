import { useLeadsAddressEditDetails } from "@/hooks/leads/useLeadsAddressEditDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { ComponentsType } from "../details/LeadsDetailsData";
import { Form } from "@/base-components/form/form";

const AddressEditDetails = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const { fields, onSubmit, handleSubmit, errors, translate } =
    useLeadsAddressEditDetails(onClick);

  return (
    <FormCard>
      <div className="flex justify-between items-center bg-[#FE9244] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("leads.address_details.main_heading")}
        </h2>
        <button
          onClick={() => onClick(1, ComponentsType.address)}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("leads.address_details.cancel_button")}
        </button>
      </div>
      <div className="px-6 py-3">
        <Form
          formFields={fields || []}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </FormCard>
  );
};

export default AddressEditDetails;
