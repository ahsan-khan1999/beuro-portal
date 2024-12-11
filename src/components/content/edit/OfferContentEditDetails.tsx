import React from "react";
import { Form } from "@/base-components/form/form";
import { useOfferContentEditDetails } from "@/hooks/content/useOfferContentEditDetails";
import { ComponentsType } from "../details/ContentDetailsData";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { OfferContentPdf } from "../add/pdf-preview/offer-content-pdf";
import { Button } from "@/base-components/ui/button/button";

const OfferContentEditDetails = ({
  onClick,
}: {
  onClick: (index: number, component: ComponentsType) => void;
}) => {
  const {
    fields,
    control,
    onSubmit,
    handleSubmit,
    errors,
    error,
    translate,
    offerDescriptionCount,
  } = useOfferContentEditDetails(onClick);

  const handlePreviewClick = (type: string) => {
    localStorage.setItem("description", offerDescriptionCount);
    window.open(`/content/pdf-preview/${type}`, "_blank");
  };

  return (
    <div className="flex gap-x-5">
      <div className="rounded-lg border border-primary bg-white w-full h-fit">
        <div className="flex justify-between items-center bg-primary py-5 px-6 rounded-t-lg">
          <h2 className="text-white text-xl font-medium">
            {translate("content.details.offer_heading")}
          </h2>
          <button
            onClick={() => onClick(1, ComponentsType.offerContent)}
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
      <div className="bg-white rounded-lg w-[500px] h-fit p-[6px] hidden xMaxSize:block">
        <div className="flex items-center justify-between pt-2 pb-2 border-b-2 border-b-primary">
          <h1 className="text-sm font-medium text-[#1E1E1E] pl-[14px]">
            {translate("common.offer_PDF_PREVIEW")}
          </h1>

          <Button
            inputType="button"
            onClick={() => handlePreviewClick("offer")}
            className="gap-x-2 !h-fit py-2 p-4 w-fit flex items-center text-sm font-semibold bg-primary text-white rounded-md whitespace-nowrap"
            text={translate("invoice.invoice_created_modal.button")}
            id="preview"
            iconAlt="button"
          />
        </div>

        {offerDescriptionCount ? (
          <div className="p-[6px] mt-2 rounded-lg bg-[#EDF4FF]">
            <OfferContentPdf description={offerDescriptionCount} />
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

export default OfferContentEditDetails;
