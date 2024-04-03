import { Form } from "@/base-components/form/form";
import { useAddContentInvoiceDetails } from "@/hooks/content/useAddContentInvoiceDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const AddInoviceContentDetails = ({
  onHandleNext,
}: {
  onHandleNext: Function;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useAddContentInvoiceDetails(onHandleNext);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-[#000] border-opacity-10">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("content.tabs_headings.invoice_content")}
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

export default AddInoviceContentDetails;
