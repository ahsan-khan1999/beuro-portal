import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import useEmployeePasswordReset from "@/hooks/employee/useEmployeePasswordReset";

const PasswordReset = ({ onClose, passwordResetSuccessfully }: { onClose: () => void; passwordResetSuccessfully: Function }) => {
  const defaultClassName = "";
  const { fields, onSubmit, handleSubmit, errors, error, translate } =
  useEmployeePasswordReset(passwordResetSuccessfully);
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] lg:max-w-[624.862px] min-h-fit "
      >
        <div className="relative flex flex-col lg:px-[120px] px-7 pb-[45px] pt-[50px]">
          <p className="text-[#000] font-medium text-2xl mb-[13px]">
           {translate("employees.edit_password_modal.heading")}
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
