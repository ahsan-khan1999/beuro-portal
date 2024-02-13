import { Form } from "@/base-components/form/form";
import { useEditOfferDetails } from "@/hooks/offers/useEditOfferDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { EditComponentsType } from "./EditOffersDetailsData";
import { useEditInvoiceDetails } from "@/hooks/invoice/useEditInvoiceDetails";

const OfferEditDetails = ({
  handleNext,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
}) => {
  const router = useRouter();
  const defaultClassName = "pt-5";
  const { fields, control, onSubmit, handleSubmit, errors, translate,invoiceDetails } =
  useEditInvoiceDetails({ handleNext });
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-b-[#000] border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("invoice.invoice_details")} ({invoiceDetails?.id && invoiceDetails?.invoiceNumber})
        </h2>
        <button
          onClick={() => router.back()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full"
        >
          {translate("offers.offer_details.cancel_button")}
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

export default OfferEditDetails;
