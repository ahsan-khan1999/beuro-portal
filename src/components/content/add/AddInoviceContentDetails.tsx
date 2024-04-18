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
      <div className="flex justify-between items-center bg-[#C50EE0] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-lg font-medium">
          {translate("content.tabs_headings.invoice_content")}
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

export default AddInoviceContentDetails;
