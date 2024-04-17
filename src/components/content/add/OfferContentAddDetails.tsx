import { Form } from "@/base-components/form/form";
import { useAddOfferContentDetails } from "@/hooks/content/useAddOfferContent";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const OfferContentAddDetails = ({
  onHandleNext,
  onCancel,
}: {
  onHandleNext: Function;
  onCancel: () => void;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useAddOfferContentDetails(onHandleNext);

  return (
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
  );
};

export default OfferContentAddDetails;
