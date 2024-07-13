import { Form } from "@/base-components/form/form";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { useInoviceEditAdditionalDetails } from "@/hooks/invoice/useInvoiceEditAdditionalDetails";
import { EditComponentsType } from "@/enums/invoice";

const AditionalEditDetails = ({
  handleNext,
  handleBack,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
  handleBack: (currentComponent: EditComponentsType) => void;
}) => {
  const router = useRouter();
  const defaultClassName = "";
  const {
    fields,
    control,
    onSubmit,
    handleSubmit,
    errors,
    error,
    translate,
    invoiceDetails,
  } = useInoviceEditAdditionalDetails({ handleNext, handleBack });

  return (
    <FormCard containerClassName="pb-6">
      <div className="flex justify-between items-center bg-[#45C769] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-lg font-medium">
          {translate("offers.additional_details.main_heading")} (
          {invoiceDetails?.id && invoiceDetails?.invoiceNumber})
        </h2>
        <button
          onClick={() => router.back()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("offers.additional_details.cancel_button")}
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

export default AditionalEditDetails;
