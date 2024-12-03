import { Form } from "@/base-components/form/form";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { OfferContentPdf } from "./pdf-preview/offer-content-pdf";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { updateQuery } from "@/utils/update-query";
import { useAddLeadContentDetails } from "@/hooks/content/useAddLeadContentDetails";

export interface AddLeadContentProps {
  onHandleNext: Function;
  onCancel: () => void;
}

const AddLeadContentDetails = ({
  onHandleNext,
  onCancel,
}: AddLeadContentProps) => {
  const {
    fields,
    router,
    onSubmit,
    handleSubmit,
    errors,
    translate,
    leadDescriptionCount,
  } = useAddLeadContentDetails(onHandleNext);

  const handleCancel = () => {
    router.pathname = "/content";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
  };

  return (
    <div className="flex gap-x-5">
      <FormCard>
        <div className="flex justify-between items-center bg-[#4A13E7] py-5 px-6 rounded-t-lg">
          <div className="flex items-center gap-x-[26px]">
            <span className="cursor-pointer" onClick={handleCancel}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
              >
                <rect
                  x="0.750977"
                  y="0.5"
                  width="39.2105"
                  height="39"
                  rx="7.5"
                  fill="white"
                  stroke="#4A13E7"
                />
                <path
                  d="M23.7911 13.2658C23.975 13.4498 24.0783 13.6993 24.0783 13.9594C24.0783 14.2196 23.975 14.4691 23.7911 14.6531L18.9346 19.5095L23.7911 24.366C23.9698 24.551 24.0687 24.7989 24.0664 25.0561C24.0642 25.3134 23.961 25.5594 23.7791 25.7413C23.5972 25.9232 23.3511 26.0264 23.0939 26.0287C22.8366 26.0309 22.5888 25.932 22.4038 25.7533L16.8537 20.2032C16.6697 20.0192 16.5664 19.7697 16.5664 19.5095C16.5664 19.2494 16.6697 18.9999 16.8537 18.8159L22.4038 13.2658C22.5878 13.0818 22.8373 12.9785 23.0974 12.9785C23.3576 12.9785 23.6071 13.0818 23.7911 13.2658Z"
                  fill="#4A13E7"
                />
              </svg>
            </span>
            <h2 className="text-[#fff] text-xl font-medium">
              {translate("content.tabs_headings.lead_content")}
            </h2>
          </div>
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
          />
        </div>
      </FormCard>

      <div className="bg-white rounded-lg w-[500px] h-fit p-[6px] hidden xlg:block">
        <h1 className="text-sm font-medium text-[#1E1E1E] pl-[14px] pt-2 pb-2 border-b-2 border-b-primary">
          {translate("common.lead_PDF_PREVIEW")}
        </h1>
        {leadDescriptionCount ? (
          <div className="p-[6px] mt-2 rounded-lg bg-[#EDF4FF]">
            <OfferContentPdf description={leadDescriptionCount} />
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

export default AddLeadContentDetails;
