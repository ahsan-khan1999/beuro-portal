import { Form } from "@/base-components/form/form";
import { useEditOfferDetails } from "@/hooks/offers/useEditOfferDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { EditComponentsType } from "./EditOffersDetailsData";

const OfferEditDetails = ({
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
    translate,
    offerDetails,
  } = useEditOfferDetails({ handleNext });

  return (
    <FormCard>
      <div className="flex justify-between items-center bg-[#4A13E7] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-lg font-medium">
          {translate("offers.offer_details.heading")} (
          {offerDetails?.id && offerDetails?.offerNumber})
        </h2>
        <button
          onClick={() => router.back()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("offers.offer_details.cancel_button")}
        </button>
      </div>

      <div className="px-6">
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

export default OfferEditDetails;
