import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import FormCard from "@/layout/customers/FormCard";
import { FormDataProps } from "@/types/admin/plans";
import React, { SetStateAction } from "react";

const PlansForm = ({
  isUpdate,
  setIsUpdate,
  fields,
  onSubmit,
  handleSubmit,
  errors,
}: FormDataProps) => {
  const defaultClassName = "mt-[30px]  ";

  return (
    <FormCard>
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
      {isUpdate && (
        <div className="flex items-center space-x-5 mt-8">
          <BaseButton
            buttonText="Back"
            onClick={() => setIsUpdate(!isUpdate)}
            containerClassName="px-4 py-[10px] w-[92px] font-medium border border-[#C7C7C7] !h-[50px]"
          />
          <BaseButton
            buttonText="Edit"
            onClick={() => setIsUpdate(!isUpdate)}
            containerClassName="px-4 py-[10px] w-[152px]  bg-primary !h-[50px]"
            textClassName="text-white font-medium !text-base"
          />
        </div>
      )}
    </FormCard>
  );
};

export default PlansForm;
