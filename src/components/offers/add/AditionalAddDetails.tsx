import { Form } from "@/base-components/form/form";
import { useOfferAditionalDetails } from "@/hooks/offers/useOfferAditionalDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";

const AditionalAddDetails = ({ onHandleNext }: { onHandleNext: Function }) => {
  const router = useRouter();
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useOfferAditionalDetails(onHandleNext);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 ">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("offers.additional_details.main_heading")}
        </h2>
        <button
          onClick={() => router.push("/offers")}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[131px] w-full"
        >
          {translate("offers.additional_details.cancel_button")}
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

export default AditionalAddDetails;
