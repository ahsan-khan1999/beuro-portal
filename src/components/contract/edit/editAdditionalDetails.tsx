import React from "react";
import { Form } from "@/base-components/form/form";
import FormCard from "@/layout/customers/FormCard";
import { useEditContractAdditionalDetails } from "@/hooks/contract/useEditContractAdditionalDetails";

export const ContractAditionalEditDetails = ({
  onEditAdditionDetails,
  onComponentChange,
}: {
  onEditAdditionDetails: () => void;
  onComponentChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const defaultClassName = "mt-0";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useEditContractAdditionalDetails({
      onEditAdditionDetails,
      onComponentChange,
    });

  return (
    <FormCard>
      <div className="flex justify-between items-center bg-[#45C769] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("leads.additional.heading")}
        </h2>
        <button
          onClick={() => onComponentChange(false)}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("leads.additional.cancel_button")}
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
