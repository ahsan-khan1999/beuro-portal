import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import useChangePassword from "@/hooks/modals/useChangePassword";

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
  const defaultClassName = "mt-0";
  const { fields, onSubmit, handleSubmit, errors, error, translate } =
    useChangePassword(onClose);

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[474.447px] min-h-auto max-h-auto"
    >
      <div className="relative flex flex-col">
        <Image
          src={crossIcon}
          alt="crossIcon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />
        <p className="text-2xl font-medium px-6 py-5">
          {translate("setting.account_setting.change_password")}
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
  );
};

export default ChangePassword;
