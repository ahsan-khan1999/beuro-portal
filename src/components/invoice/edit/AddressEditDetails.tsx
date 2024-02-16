import { Form } from "@/base-components/form/form";
import { useEditOfferAddressDetails } from "@/hooks/offers/useEditOfferAddressDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { EditComponentsType } from "./EditOffersDetailsData";
import { useEditInvoiceAddressDetails } from "@/hooks/invoice/useEditInvoiceAddressDetails";

const AddressEditDetails = ({ handleNext }: { handleNext: (currentComponent: EditComponentsType) => void }) => {
  const router = useRouter();
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate, invoiceDetails } =
    useEditInvoiceAddressDetails({ handleNext });
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium"> {translate("invoice.invoice_details")} ({invoiceDetails?.id && invoiceDetails?.invoiceNumber})
        </h2>
        <button
          onClick={() => router.back()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full"
        >
          {translate("offers.address_details.cancel_button")}
        </button>
      </div>

      <hr className="opacity-20 mb-5" />

      <Form
        formFields={fields || []}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
    </FormCard>
  );
};

export default AddressEditDetails;