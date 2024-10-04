import React from "react";
import { Form } from "@/base-components/form/form";
import FormCard from "@/layout/customers/FormCard";
import { useRouter } from "next/router";
import { useEditInvoiceDetails } from "@/hooks/invoice/useEditInvoiceDetails";
import { EditComponentsType } from "@/enums/invoice";
import CustomLoader from "@/base-components/ui/loader/customer-loader";

const OfferEditDetails = ({
  handleNext,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
}) => {
  const router = useRouter();
  const {
    fields,
    onSubmit,
    handleSubmit,
    errors,
    translate,
    invoiceDetails,
    loading,
  } = useEditInvoiceDetails({ handleNext });

  return (
    <FormCard containerClassName="pb-[100px]">
      <div className="flex justify-between items-center bg-[#4A13E7] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("invoice.invoice_details")} (
          {invoiceDetails?.id && invoiceDetails?.invoiceNumber})
        </h2>
        <button
          onClick={() => router.back()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("offers.offer_details.cancel_button")}
        </button>
      </div>

      {loading ? (
        <CustomLoader />
      ) : (
        <div className="py-3 px-6">
          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        </div>
      )}
    </FormCard>
  );
};

export default OfferEditDetails;
