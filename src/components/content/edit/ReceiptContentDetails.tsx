import { Form } from "@/base-components/form/form";
import { useEditReceiptDetails } from "@/hooks/content/useEditReceiptDetails";
import React from "react";
import { ComponentsType } from "../details/ContentDetailsData";
import { ReceiptContentPdf } from "../add/pdf-preview/receipt-content-pdf";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { Button } from "@/base-components/ui/button/button";

const EditReceiptContentDetails = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const {
    fields,
    onSubmit,
    handleSubmit,
    errors,
    translate,
    receiptDescription,
  } = useEditReceiptDetails(onClick);

  const handlePreviewClick = (type: string) => {
    localStorage.setItem("description", receiptDescription);
    window.open(`/content/pdf-preview/${type}`, "_blank");
  };

  return (
    <div className="flex gap-x-5">
      <div className="rounded-lg border border-primary bg-white w-full h-fit">
        <div className="flex justify-between items-center bg-[#45C769] rounded-t-lg py-5 px-6">
          <h2 className="text-white text-xl font-medium">
            {translate("content.tabs_headings.receipt_content")}
          </h2>
          <button
            onClick={() => onClick(4, ComponentsType.receiptContent)}
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
          />
        </div>
      </div>

      <div className="bg-white rounded-lg w-[500px] h-fit p-[6px] hidden xlg:block">
        <div className="flex items-center justify-between pt-2 pb-2 border-b-2 border-b-primary">
          <h1 className="text-sm font-medium text-[#1E1E1E] pl-[14px]">
            {translate("common.receipt_PDF_PREVIEW")}
          </h1>

          <Button
            inputType="button"
            onClick={() => handlePreviewClick("receipt")}
            className="gap-x-2 !h-fit py-2 p-4 w-fit flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap"
            text={translate("invoice.invoice_created_modal.button")}
            id="preview"
            iconAlt="button"
          />
        </div>

        {receiptDescription ? (
          <div className="p-[6px] mt-2 rounded-lg bg-[#EDF4FF]">
            <ReceiptContentPdf description={receiptDescription} />
          </div>
        ) : (
          <NoDataEmptyState
            className="w-full"
            imgClassName="w-14 h-14"
            textClassName="text-base"
            containerClassName="py-3"
          />
        )}
      </div>
    </div>
  );
};

export default EditReceiptContentDetails;
