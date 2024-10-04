import { Form } from "@/base-components/form/form";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { useEditInvoiceAddressDetails } from "@/hooks/invoice/useEditInvoiceAddressDetails";
import { EditComponentsType } from "@/enums/invoice";

const AddressEditDetails = ({
  handleNext,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
}) => {
  const router = useRouter();
  const {
    fields,
    control,
    onSubmit,
    handleSubmit,
    errors,
    error,
    translate,
    invoiceDetails,
  } = useEditInvoiceAddressDetails({ handleNext });

  return (
    <FormCard containerClassName="pb-6">
      <div className="flex justify-between items-center bg-[#FE9244] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("invoice.invoice_details")} (
          {invoiceDetails?.id && invoiceDetails?.invoiceNumber})
        </h2>
        <button
          onClick={() => router.back()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("offers.address_details.cancel_button")}
        </button>
      </div>

      <div className="py-3 px-6">
        <Form
          formFields={fields || []}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </FormCard>
  );
};

export default AddressEditDetails;
