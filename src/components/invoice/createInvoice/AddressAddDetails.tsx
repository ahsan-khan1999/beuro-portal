import React from "react";
import { useRouter } from "next/router";
import { updateQuery } from "@/utils/update-query";
import { Form } from "@/base-components/form/form";
import FormCard from "@/layout/customers/FormCard";
import { useCreateInvoiceAddressDetails } from "@/hooks/invoice/useCreateInvoiceAddressDetails";

const AddressAddDetails = ({ onHandleNext }: { onHandleNext: Function }) => {
  const router = useRouter();
  const defaultClassName = "";
  const {
    fields,
    control,
    onSubmit,
    handleSubmit,
    errors,
    translate,
    invoiceDetails,
  } = useCreateInvoiceAddressDetails(onHandleNext);

  const handleCancel = () => {
    router.pathname = "/invoices";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
  };

  return (
    <FormCard containerClassName="pb-6">
      <div className="flex justify-between items-center bg-[#FE9244] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("offers.address_details.main_heading")} (
          {invoiceDetails?.id && invoiceDetails?.invoiceNumber})
        </h2>
        <button
          onClick={handleCancel}
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
          className={`${defaultClassName}`}
        />
      </div>
    </FormCard>
  );
};

export default AddressAddDetails;
