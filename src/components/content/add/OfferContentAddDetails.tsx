import { Form } from "@/base-components/form/form";
import { useAddOfferContentDetails } from "@/hooks/content/useAddOfferContent";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { OfferContentPdf } from "./pdf-preview/offer-content-pdf";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

const OfferContentAddDetails = ({
  onHandleNext,
  onCancel,
}: {
  onHandleNext: Function;
  onCancel: () => void;
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
    offerDescriptionCount,
  } = useAddOfferContentDetails(onHandleNext);

  return (
    <div className="flex gap-x-5">
      <FormCard>
        <div className="flex justify-between items-center bg-[#4A13E7] py-5 px-6 rounded-t-lg">
          <h2 className="text-[#fff] text-lg font-medium">
            {translate("content.tabs_headings.offer_content")}
          </h2>
          <button
            onClick={onCancel}
            className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
          >
            {translate("leads.customer_details.cancel_button")}
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
      </FormCard>

      <div className="bg-white rounded-lg w-[500px] h-fit p-[6px] hidden xlg:block">
        <h1 className="text-sm font-medium text-[#1E1E1E] pl-[14px] pt-2 pb-2 border-b-2 border-b-primary">
          {translate("common.offer_PDF_PREVIEW")}
        </h1>
        {offerDescriptionCount ? (
          <div className="p-[6px] mt-2 rounded-lg bg-[#EDF4FF]">
            <OfferContentPdf description={offerDescriptionCount} />
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

export default OfferContentAddDetails;
