import { Form } from "@/base-components/form/form";
import { useServiceOfferEditDetail } from "@/hooks/offers/useServiceOfferEditDetail";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { EditComponentsType } from "./EditOffersDetailsData";
import { useServiceInvoiceEditDetail } from "@/hooks/invoice/useServiceInvoiceEditDetail";

const ServiceEditDetails = ({
  handleNext,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
}) => {
  const router = useRouter();
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate, invoiceDetails } =
    useServiceInvoiceEditDetail({ handleNext });
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("offers.service_details.main_heading")} ({invoiceDetails?.id && invoiceDetails?.invoiceNumber})
        </h2>
        <button
          onClick={() => router.back()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full"
        >
          {translate("offers.service_details.cancel_button")}
        </button>
      </div>

      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
      {
        errors?.taxAmount && <span className="mt-[3px] text-red text-sm">{translate(errors?.taxAmount?.message as any)}</span>
      }
    </FormCard>
  );
};

export default ServiceEditDetails;