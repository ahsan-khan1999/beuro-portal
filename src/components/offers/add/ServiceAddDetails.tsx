import { Form } from "@/base-components/form/form";
import { useAddServiceDetails } from "@/hooks/offers/useAddServiceDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";

const ServiceAddDetails = () => {
  const router = useRouter()
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
  useAddServiceDetails();
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 ">
        <h2 className="text-[#393939] text-lg font-medium">
          Service/Product Details
        </h2>
        <button onClick={() => router.push("/offers")} className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[131px] w-full">
          Cancel
        </button>

        <hr className="opacity-20 mb-5" />


      </div>
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

export default ServiceAddDetails;
