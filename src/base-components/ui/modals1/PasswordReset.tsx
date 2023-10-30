import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import useEmployeePasswordReset from "@/hooks/employee/useEmployeePasswordReset";

const PasswordReset = ({ onClose }: { onClose: () => void }) => {
  const defaultClassName = "mt-0  ";
  const { fields, onSubmit, handleSubmit, errors, error } =
  useEmployeePasswordReset();
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[624px] min-h-auto max-h-auto"
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
