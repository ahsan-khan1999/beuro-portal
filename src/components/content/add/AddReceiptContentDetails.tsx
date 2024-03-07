import { Form } from "@/base-components/form/form";
import { useAddContentReceiptDetails } from "@/hooks/content/useAddContentReceiptDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const AddReceiptContentDetails = ({
  onHandleBack,
  onHandleNext,
}: {
  onHandleBack: Function;
  onHandleNext: Function;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useAddContentReceiptDetails(onHandleBack, onHandleNext);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-[26px] border-b border-[#000] border-opacity-10">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("content.tabs_headings.receipt_content")}
        </h2>
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

export default AddReceiptContentDetails;
