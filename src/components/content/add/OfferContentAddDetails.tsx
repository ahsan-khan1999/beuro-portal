import { Form } from "@/base-components/form/form";
import { useAddOfferContentDetails } from "@/hooks/content/useAddOfferContent";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const OfferContentAddDetails = ({
  onHandleNext,
}: {
  onHandleNext: Function;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useAddOfferContentDetails(onHandleNext);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-[26px] border-b border-b-[#000] border-opacity-10">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("content.tabs_headings.offer_content")}
        </h2>
      </div>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
    </FormCard>
  );
};

export default OfferContentAddDetails;
