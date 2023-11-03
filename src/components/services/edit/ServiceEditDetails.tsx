import { Form } from "@/base-components/form/form";
import { useEditServicesDetails } from "@/hooks/services/useEditServicesDetails";
import FormCard from "@/layout/customers/FormCard";
import { TRowServices } from "@/types/service";
import React from "react";

const ServiceEditDetails = ({
  handleRoute,
  serviceDetail,
}: {
  handleRoute: Function;
  serviceDetail: TRowServices;
}) => {
  const defaultClassName = "mt-[30px]  ";
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useEditServicesDetails(handleRoute,serviceDetail);
  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">
          Service/Product Details
        </h2>
        <button
          onClick={() => handleRoute()}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-9"
        >
          Cancel
        </button>
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

export default ServiceEditDetails;
