import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useRedux";
import { Form } from "@/base-components/form/form";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import useEmployeePasswordReset from "@/hooks/employee/useEmployeePasswordReset";

export interface PasswordResetProps {
  onClose: () => void;
  passwordResetSuccessfully: Function;
}

const PasswordReset = ({
  onClose,
  passwordResetSuccessfully,
}: PasswordResetProps) => {
  const { id } = useAppSelector((state) => state.global.modal.data) || {};

  const { fields, onSubmit, handleSubmit, errors, translate } =
    useEmployeePasswordReset({ passwordResetSuccessfully, id });

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[480px] lg:max-w-[624.862px] min-h-fit"
    >
      <div className="relative flex flex-col">
        <Image
          src={crossIcon}
          onClick={onClose}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
        />
        <p className="ont-medium text-base md:text-2xl py-5 px-6">
          {translate("employees.edit_password_modal.heading")}
        </p>
        <div className="pb-3 px-6">
          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default PasswordReset;
