import { Form } from "@/base-components/form/form";
import { useAddContentReceiptDetails } from "@/hooks/content/useAddContentReceiptDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";

const AddReceiptContentDetails = ({
  onHandleBack,
  onHandleNext,
}: {
  onHandleBack: Function;
  onHandleNext: Function;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useAddContentReceiptDetails(onHandleBack, onHandleNext);

  return (
    <FormCard>
      <div className="flex justify-between items-center bg-[#45C769] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-lg font-medium">
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
  );
};

export default AddReceiptContentDetails;
