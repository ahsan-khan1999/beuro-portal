import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import FormCard from "@/layout/customers/FormCard";
import { FormDataProps } from "@/types/employee";
import Image from "next/image";
import React from "react";
import editInfo from "@/assets/svgs/edit-customer-details.svg";
import editPassword from "@/assets/svgs/edit-password.svg";

const EmployeeForm = ({
  isUpdate,
  setIsUpdate,
  fields,
  onSubmit,
  handleSubmit,
  errors,
  handlePasswordReset,
}: FormDataProps) => {
  const defaultClassName = "";

  return (
    <div
      className={`rounded-md bg-white py-[26px] pl-[32px] pr-[25px] border ${
        !isUpdate ? "border-primary" : "border-none"
      } w-full h-fit`}
    >
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">Employee Details</h2>
        {isUpdate ? (
          <div className="flex gap-x-5">
            <BaseButton
              buttonText="Edit Password"
              onClick={() => handlePasswordReset()}
              containerClassName="flex gap-x-3 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4  w-fit whitespace-nowrap"
            >
              <Image src={editPassword} alt="editPassword" />
            </BaseButton>
            <BaseButton
              buttonText="Edit Details"
              onClick={() => setIsUpdate(!isUpdate)}
              containerClassName="flex gap-x-3 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
            >
              <Image src={editInfo} alt="editInfo" />
            </BaseButton>
          </div>
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
    </div>
  );
};

export default EmployeeForm;
