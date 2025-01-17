import { Form } from "@/base-components/form/form";
import { useOfferAditionalDetails } from "@/hooks/offers/useOfferAditionalDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { ComponentsType } from "./AddOffersDetailsData";
import { updateQuery } from "@/utils/update-query";

const AditionalAddDetails = ({
  onHandleNext,
  onHandleBack,
}: {
  onHandleNext: (currentComponent: ComponentsType) => void;
  onHandleBack: (currentComponent: ComponentsType) => void;
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
    offerDetails,
  } = useOfferAditionalDetails(onHandleNext, onHandleBack);

  const handleCancel = () => {
    router.pathname = "/offers";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
  };

  return (
    <FormCard containerClassName="pb-6">
      <div className="flex justify-between items-center bg-[#45C769] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-xl font-medium">
          {translate("offers.additional_details.main_heading")} (
          {offerDetails?.id && offerDetails?.offerNumber})
        </h2>
        <button
          onClick={handleCancel}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("offers.additional_details.cancel_button")}
        </button>
      </div>
      <div className="px-6 pt-3">
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          className={`${defaultClassName}`}
        />
      </div>
    </FormCard>
  );
};

export default AditionalAddDetails;
