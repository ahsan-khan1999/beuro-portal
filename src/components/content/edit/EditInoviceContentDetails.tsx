import { Form } from "@/base-components/form/form";
import { useEditInvoiceContentDetails } from "@/hooks/content/useEditInvoiceContentDetails";
import FormCard from "@/layout/customers/FormCard";
import { ContentTableRowTypes } from "@/types/content";
import React from "react";
import { ComponentsType } from "../details/ContentDetailsData";

const EditInoviceContentDetails = ({
  onClick,
  contentDetail,
}: {
  onClick: (index: number, component: ComponentsType) => void;
  contentDetail: ContentTableRowTypes;
}) => {
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useEditInvoiceContentDetails(onClick);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-[26px] border-b border-black border-opacity-20 ">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("content.details.invoice_heading")}
        </h2>
        <button
          onClick={() => onClick(2, ComponentsType.invoiceContent)}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-2 px-9"
        >
          {translate("content.details.cancel_button")}
        </button>
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

export default EditInoviceContentDetails;
