import { Form } from "@/base-components/form/form";
import { useEditConfirmationContentDetails } from "@/hooks/useEditConfirmationContentDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const EditConfirmationContentDetailsData = () => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
  useEditConfirmationContentDetails();
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-[26px] border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">Confirmation Content</h2>
        <button className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7]  px-9">
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

export default EditConfirmationContentDetailsData;
