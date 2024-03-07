import { Form } from "@/base-components/form/form";
import { useOfferEditAdditionalDetails } from "@/hooks/offers/useOfferEditAdditionalDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { EditComponentsType } from "./EditOffersDetailsData";
import { useInoviceEditAdditionalDetails } from "@/hooks/invoice/useInvoiceEditAdditionalDetails";

const AditionalEditDetails = ({
  handleNext,
  handleBack,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
  handleBack: (currentComponent: EditComponentsType) => void;
}) => {
  const router = useRouter();
  const defaultClassName = "pt-5";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate,invoiceDetails } =
  useInoviceEditAdditionalDetails({ handleNext, handleBack });
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("offers.additional_details.main_heading")} ({invoiceDetails?.id && invoiceDetails?.invoiceNumber})
        </h2>
        <button
          onClick={() => router.back()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full"
        >
          {translate("offers.additional_details.cancel_button")}
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

export default AditionalEditDetails;
