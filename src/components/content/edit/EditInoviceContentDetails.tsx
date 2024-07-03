import React from "react";
import { Form } from "@/base-components/form/form";
import { ContentTableRowTypes } from "@/types/content";
import { ComponentsType } from "../details/ContentDetailsData";
import { useEditInvoiceContentDetails } from "@/hooks/content/useEditInvoiceContentDetails";
import { InvoiceContentPdf } from "../add/pdf-preview/invoice-content-pdf";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

const EditInoviceContentDetails = ({
  onClick,
  contentDetail,
}: {
  onClick: (index: number, component: ComponentsType) => void;
  contentDetail: ContentTableRowTypes;
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
  } = useEditInvoiceContentDetails(onClick);

  return (
    <div className="flex gap-x-5">
      <div className="rounded-lg border border-primary bg-white w-full h-fit">
        <div className="flex justify-between items-center bg-[#C50EE0] rounded-t-lg py-5 px-6">
          <h2 className="text-white text-lg font-medium">
            {translate("content.details.invoice_heading")}
          </h2>
          <button
            onClick={() => onClick(2, ComponentsType.invoiceContent)}
            className="text-[#4B4B4B] bg-white font-medium rounded-lg border border-[#C7C7C7] py-2 px-9"
          >
            {translate("content.details.cancel_button")}
          </button>
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
      </div>

      <div className="bg-white rounded-lg w-[500px] h-fit p-[6px] hidden xlg:block">
        <h1 className="text-sm font-medium text-[#1E1E1E] pl-[14px] pt-3 pb-2 border-b-2 border-b-primary">
          {translate("common.invoice_PDF_PREVIEW")}
        </h1>

        {invoiceDescription ? (
          <div className="p-[6px] mt-2 rounded-lg bg-[#EDF4FF]">
            <InvoiceContentPdf description={invoiceDescription} />
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

export default EditInoviceContentDetails;
