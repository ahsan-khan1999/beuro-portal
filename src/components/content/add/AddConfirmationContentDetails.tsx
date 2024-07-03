import React from "react";
import { Form } from "@/base-components/form/form";
import { useAddContentConfirmationDetails } from "@/hooks/content/useAddContentConfirmationDetails";
import FormCard from "@/layout/customers/FormCard";
import { ConfirmationContentPdf } from "./pdf-preview/confirmation-content-pdf";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

const AddConfirmationContentDetails = ({
  onHandleNext,
  onHandleBack,
}: {
  onHandleNext: Function;
  onHandleBack: Function;
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
    confirmationDescription,
  } = useAddContentConfirmationDetails(onHandleNext, onHandleBack);

  return (
    <div className="flex gap-x-5">
      <FormCard>
        <div className="flex justify-between items-center bg-[#FE9244] py-5 px-6 rounded-t-lg">
          <h2 className="text-[#fff] text-lg font-medium">
            {translate("content.tabs_headings.confirmation_content")}
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
          {translate("common.confirmation_PDF_PREVIEW")}
        </h1>

        {confirmationDescription ? (
          <div className="p-[6px] mt-2 rounded-lg bg-[#EDF4FF]">
            <ConfirmationContentPdf description={confirmationDescription} />
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

export default AddConfirmationContentDetails;
