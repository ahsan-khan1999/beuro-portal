import { Form } from "@/base-components/form/form";
import { useAddServiceDetails } from "@/hooks/offers/useAddServiceDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import { ComponentsType } from "./AddOffersDetailsData";
import { updateQuery } from "@/utils/update-query";

const ServiceAddDetails = ({
  onHandleNext,
}: {
  onHandleNext: (currentComponent: ComponentsType) => void;
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
    systemSettings,
    offerDetails,
  } = useAddServiceDetails(onHandleNext);

  const handleCancel = () => {
    router.pathname = "/offers";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
  };

  return (
    <FormCard>
      <div className="flex justify-between items-center bg-[#C50EE0] py-5 px-6 rounded-t-lg">
        <h2 className="text-[#fff] text-lg font-medium">
          {translate("offers.service_details.main_heading")}
          {offerDetails?.id && offerDetails?.offerNumber}
        </h2>
        <button
          onClick={handleCancel}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[131px] w-full bg-white"
        >
          {translate("offers.service_details.cancel_button")}
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

export default ServiceAddDetails;
