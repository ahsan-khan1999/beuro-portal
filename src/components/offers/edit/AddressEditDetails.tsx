import { Form } from "@/base-components/form/form";
import { useEditOfferAddressDetails } from "@/hooks/offers/useEditOfferAddressDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";

const AddressEditDetails = () => {
  const router = useRouter();
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useEditOfferAddressDetails();
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">Address Details</h2>
        <button
          onClick={() => router.push("/offers/details")}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[131px] w-full"
        >
          Cancel
        </button>
      </div>

      <hr className="opacity-20 mb-5" />

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

export default AddressEditDetails;
