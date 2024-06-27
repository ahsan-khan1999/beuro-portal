import React from "react";
import { Form } from "@/base-components/form/form";
import { useAddContentInvoiceDetails } from "@/hooks/content/useAddContentInvoiceDetails";
import FormCard from "@/layout/customers/FormCard";
import { InvoiceContentPdf } from "./pdf-preview/invoice-content-pdf";

const AddInoviceContentDetails = ({
  onHandleNext,
}: {
  onHandleNext: Function;
}) => {
  const defaultClassName = "";
  const {
    fields,
    control,
    onSubmit,
    handleSubmit,
    errors,
    error,
    translate,
    invoiceDescription,
  } = useAddContentInvoiceDetails(onHandleNext);

  return (
    <div className="flex gap-x-5">
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

      <div className="bg-white rounded-lg w-[340px] hidden xlg:block">
        <h1 className="text-sm font-medium text-[#1E1E1E] pl-[14px] pt-3 pb-2">
          {translate("common.invoice_PDF_PREVIEW")}
        </h1>
        <InvoiceContentPdf invoiceDescription={invoiceDescription} />
      </div>
    </div>
  );
};

export default AddInoviceContentDetails;
