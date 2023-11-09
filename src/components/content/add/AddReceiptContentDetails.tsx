import { Form } from "@/base-components/form/form";
import { useAddContentReceiptDetails } from "@/hooks/content/useAddContentReceiptDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const AddReceiptContentDetails = ({
  onHandleNext,
}: {
  onHandleNext: Function;
}) => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useAddContentReceiptDetails(onHandleNext);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-[26px]">
        <h2 className="text-[#393939] text-lg font-medium">Receipt Content</h2>
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

export default AddReceiptContentDetails;
