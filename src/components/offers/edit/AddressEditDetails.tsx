import { Form } from "@/base-components/form/form";
import { useEditOfferAddressDetails } from "@/hooks/offers/useEditOfferAddressDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { EditComponentsType } from "./EditOffersDetailsData";

const AddressEditDetails = ({
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
    offerDetails,
  } = useEditOfferAddressDetails({ handleNext });
  return (
    <FormCard>
      <div className="flex justify-between items-center bg-[#FE9244] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-lg font-medium">
          {translate("offers.address_details.main_heading") + " "}(
          {offerDetails?.id && offerDetails?.offerNumber})
        </h2>
        <button
          onClick={() => router.back()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("offers.address_details.cancel_button")}
        </button>
      </div>

      <div className="px-6">
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

export default AddressEditDetails;
