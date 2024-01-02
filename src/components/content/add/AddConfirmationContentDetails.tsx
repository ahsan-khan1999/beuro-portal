import { Form } from "@/base-components/form/form";
import { useAddContentConfirmationDetails } from "@/hooks/content/useAddContentConfirmationDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const AddConfirmationContentDetails = ({
  onHandleNext,
  onHandleBack
}: {
  onHandleNext: Function;
  onHandleBack: Function;

}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error,translate } =
    useAddContentConfirmationDetails(onHandleNext,onHandleBack);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-[26px] ">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("content.tabs_headings.confirmation_content")}
        </h2>
      </div>
      <hr className="opacity-20 mb-5" />
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

export default AddConfirmationContentDetails;
