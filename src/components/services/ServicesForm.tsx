import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import FormCard from "@/layout/customers/FormCard";
import { FormDataProps } from "@/types/service";
import Image from "next/image";
import React, { SetStateAction } from "react";
import editInfo from "@/assets/svgs/edit-customer-details.svg";

const ServiceForm = ({
  isUpdate,
  setIsUpdate,
  fields,
  onSubmit,
  handleSubmit,
  errors,
}: FormDataProps) => {
  const defaultClassName = "";

  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">
          Service/Product Details
        </h2>
        {isUpdate ? (
          <BaseButton
            buttonText="Edit Details"
            onClick={() => setIsUpdate(!isUpdate)}
            containerClassName="flex gap-x-3 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
          >
            <Image src={editInfo} alt="editInfo" />
          </BaseButton>
        ) : (
          <BaseButton
            buttonText="Cancel"
            onClick={() => setIsUpdate(!isUpdate)}
            containerClassName="flex  items-center justify-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
          ></BaseButton>
        )}
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

export default ServiceForm;
