import React from "react";
import { Form } from "@/base-components/form/form";
import { useAddContentInvoiceDetails } from "@/hooks/content/useAddContentInvoiceDetails";
import FormCard from "@/layout/customers/FormCard";
import { InvoiceContentPdf } from "./pdf-preview/invoice-content-pdf";
import { splitContentIntoPages } from "@/utils/functions";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

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

  const pages = splitContentIntoPages(invoiceDescription);

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

      <div className="bg-white rounded-lg w-[340px] h-fit p-[6px] hidden xlg:block">
        <h1 className="text-sm font-medium text-[#1E1E1E] pl-[14px] pt-3 pb-2 border-b-2 border-b-primary">
          {translate("common.invoice_PDF_PREVIEW")}
        </h1>

        {pages.length > 0 ? (
          <div className="flex flex-col gap-y-4">
            {pages.map((pageContent, index) => (
              <InvoiceContentPdf key={index} invoiceDescription={pageContent} />
            ))}
          </div>
        ) : (
          <NoDataEmptyState
            className="w-fit"
            imgClassName="w-14 h-14"
            textClassName="text-base"
            containerClassName="py-3"
          />
        )}
      </div>
    </div>
  );
};

export default AddInoviceContentDetails;
