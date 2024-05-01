import { Form } from "@/base-components/form/form";
import { useAddContentConfirmationDetails } from "@/hooks/content/useAddContentConfirmationDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const AddConfirmationContentDetails = ({
  onHandleNext,
  onHandleBack,
}: {
  onHandleNext: Function;
  onHandleBack: Function;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useAddContentConfirmationDetails(onHandleNext, onHandleBack);

  return (
    <FormCard>
      <div className="flex justify-between items-center bg-[#FE9244] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-lg font-medium">
          {translate("content.tabs_headings.confirmation_content")}
        </h2>
      </div>
      <div className="py-3 px-6">
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

export default AddConfirmationContentDetails;
