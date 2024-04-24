import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import useEmployeePasswordReset from "@/hooks/employee/useEmployeePasswordReset";
import Image from "next/image";
import crossIcon from "@/assets/svgs/cross_icon.svg";

const PasswordReset = ({
  onClose,
  passwordResetSuccessfully,
}: {
  onClose: () => void;
  passwordResetSuccessfully: Function;
}) => {
  const defaultClassName = "";
  const { fields, onSubmit, handleSubmit, errors, error, translate } =
    useEmployeePasswordReset(passwordResetSuccessfully);

  return (
    <>
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
          <p className="text-[#000] font-medium text-2xl py-5 px-6">
            {translate("employees.edit_password_modal.heading")}
          </p>
          <div className="pb-3 px-6">
            <Form
              formFields={fields}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              className={`${defaultClassName}`}
            />
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default PasswordReset;
