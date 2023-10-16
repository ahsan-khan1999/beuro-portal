import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import useModalPasswordReset from "@/hooks/auth/useModalPasswordReset";

const PasswordReset = () => {
  const defaultClassName = "mt-0  ";
  const { fields, onSubmit, handleSubmit, errors, error } =
    useModalPasswordReset();
  return (
    <>
      <BaseModal
        onClose={() => false}
        containerClassName="max-w-[624px] min-h-auto max-h-[465px]"
      >
        <div className="relative flex flex-col px-[120px] pb-[45px] pt-[50px]">
          <p className="text-[#000] font-medium text-[24px] leading-7 mb-[13px]">
            Reset Password
          </p>
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

export default PasswordReset;
