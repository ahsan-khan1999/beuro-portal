import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import useEmployeeCreateNewPassword from "@/hooks/employee/useEmployeeCreateNewPassword";

const CreateNewPassword = ({
  onClose,
  passwordSetSuccessfully,
}: {
  onClose: () => void;
  passwordSetSuccessfully: Function;
}) => {
  const defaultClassName = "mt-0  ";
  const { fields, onSubmit, handleSubmit, errors, error, translate } =
    useEmployeeCreateNewPassword(passwordSetSuccessfully);

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[624px] min-h-auto px-[120px] !py-[45px] max-h-auto"
    >
      <div className="relative flex flex-col">
        <p className="text-2xl font-medium mb-[13px]">
          {translate("employees.create_new_password_modal.main_heading")}
        </p>
        <p className="text-[#1E1E1E] text-sm font-medium mb-[12px]">
          {translate("employees.create_new_password_modal.your_mail")}
        </p>

        {/* <div className="w-[380px] py-4 pl-[41px] border border-[#BFBFBF] rounded-lg mb-5">
          </div> */}
        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          className={`${defaultClassName}`}
        />
      </div>
    </BaseModal>
  );
};

export default CreateNewPassword;
