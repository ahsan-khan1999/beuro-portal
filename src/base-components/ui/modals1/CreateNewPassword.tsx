import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import useCreateNewPassword from "@/hooks/auth/useCreateNewPassword";

const CreateNewPassword = () => {
  const defaultClassName = "mt-0  ";
  const { fields, onSubmit, handleSubmit, errors, error } =
    useCreateNewPassword();
  return (
    <>
      <BaseModal
        onClose={() => false}
        containerClassName="max-w-[624px] min-h-auto px-[120px] !py-[45px] max-h-[465px]"
      >
        <div className="relative flex flex-col  ">
          <p className="text-[#000] font-medium text-[24px] leading-7 mb-[13px]">
            Create New Password
          </p>
          <p className="text-[#1E1E1E] text-[14px] font-medium mb-[12px]">
            Your Email
          </p>

          <div className="w-[380px] py-4 pl-[41px] border border-[#BFBFBF] rounded-lg mb-5">
            Testuser123@gmail.com
          </div>
          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            className={`${defaultClassName}`}
          />
        </div>
      </BaseModal>
    </>
  );
};

export default CreateNewPassword;