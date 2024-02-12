import { Form } from "@/base-components/form/form";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { FormDataProps } from "@/types/employee";
import React from "react";
import { useTranslation } from "next-i18next";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import { PasswordIcon } from "@/assets/svgs/components/password-icon";

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
  const { t: translate } = useTranslation();

  return (
    <div
      className={`rounded-md bg-white py-[26px] pl-[32px] pr-[25px] border ${
        !isUpdate ? "border-primary" : "border-none"
      } w-full h-fit`}
    >
      <div className="flex flex-col mlg:flex-row justify-between mlg:items-center pb-5 border-b border-black border-opacity-10 gap-y-3">
        <h2 className="text-[#393939] text-lg font-medium">
          {translate("employees.details.main_heading")}
        </h2>
        {isUpdate ? (
          <div className="flex gap-x-5">
            <BaseButton
              buttonText={translate("employees.details.edit_password")}
              onClick={() => handlePasswordReset()}
              containerClassName="flex gap-x-3 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit whitespace-nowrap"
            >
              <PasswordIcon />
            </BaseButton>
            <BaseButton
              buttonText={translate("employees.details.edit_button")}
              onClick={() => setIsUpdate(!isUpdate)}
              containerClassName="flex gap-x-3 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 min-w-[161px] w-fit"
            >
              <EditIcon />
            </BaseButton>
          </div>
        ) : (
          <BaseButton
            buttonText={translate("employees.details.cancel_button")}
            onClick={() => setIsUpdate(!isUpdate)}
            containerClassName="flex  items-center justify-center text-[#4B4B4B] font-medium rounded-lg border border-[#4A13E7] py-[7px] px-4 max-w-[161px] w-full"
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
