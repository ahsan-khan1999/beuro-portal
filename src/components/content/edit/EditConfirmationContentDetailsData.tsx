import { Form } from "@/base-components/form/form";
import { useEditConfirmationContentDetails } from "@/hooks/content/useEditConfirmationContentDetails";
import FormCard from "@/layout/customers/FormCard";
import { ContentTableRowTypes } from "@/types/content";
import React from "react";

const EditConfirmationContentDetailsData = ({
  handleRoute,
  contentDetail,
}: {
  handleRoute: Function;
  contentDetail: ContentTableRowTypes;
}) => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useEditConfirmationContentDetails(handleRoute);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-[26px] border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">
          Confirmation Content
        </h2>
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
