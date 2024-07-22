import { Form } from "@/base-components/form/form";
import { useAddContentReceiptDetails } from "@/hooks/content/useAddContentReceiptDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { ReceiptContentPdf } from "./pdf-preview/receipt-content-pdf";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

const AddReceiptContentDetails = ({
  onHandleBack,
  onHandleNext,
}: {
  onHandleBack: Function;
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
    receiptDescription,
  } = useAddContentReceiptDetails(onHandleBack, onHandleNext);

  return (
    <div className="flex gap-x-5">
      <FormCard>
        <div className="flex justify-between items-center bg-[#45C769] py-5 px-6 rounded-t-lg">
          <h2 className="text-[#fff] text-xl font-medium">
            {translate("content.tabs_headings.receipt_content")}
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
      <div className="bg-white rounded-lg w-[500px] h-fit p-[6px] hidden xlg:block">
        <h1 className="text-sm font-medium text-[#1E1E1E] pl-[14px] pt-3 pb-2 border-b-2 border-b-primary">
          {translate("common.receipt_PDF_PREVIEW")}
        </h1>

        {receiptDescription ? (
          <div className="p-[6px] mt-2 rounded-lg bg-[#EDF4FF]">
            <ReceiptContentPdf description={receiptDescription} />
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

export default AddReceiptContentDetails;
