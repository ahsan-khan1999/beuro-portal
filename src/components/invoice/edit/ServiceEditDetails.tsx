import React from "react";
import { Form } from "@/base-components/form/form";
import { useRouter } from "next/router";
import { useServiceInvoiceEditDetail } from "@/hooks/invoice/useServiceInvoiceEditDetail";
import { EditComponentsType } from "@/enums/invoice";

const ServiceEditDetails = ({
  handleNext,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
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
  } = useServiceInvoiceEditDetail({ handleNext });

  return (
    <>
      <div className="flex justify-between items-center bg-[#C50EE0] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("offers.service_details.main_heading")} (
          {invoiceDetails?.id && invoiceDetails?.invoiceNumber})
        </h2>
        <button
          onClick={() => router.back()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
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
      {errors?.taxAmount && (
        <span className="mt-[3px] text-red text-sm">
          {translate(errors?.taxAmount?.message as any)}
        </span>
      )}
    </>
  );
};

export default ServiceEditDetails;
