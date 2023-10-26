import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import useModalPasswordReset from "@/hooks/auth/useModalPasswordReset";
import crossIcon from "@/assets/svgs/cross_icon.svg";

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
  const defaultClassName = "mt-0  ";
  const { fields, onSubmit, handleSubmit, errors, error } =
    useModalPasswordReset();
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[624px] min-h-auto max-h-auto"
      >
        <div className="relative flex flex-col px-[120px] pb-[45px] pt-[50px]">
          <Image src={crossIcon} alt="crossIcon" />
          <p className="text-[#000] font-medium text-[24px] leading-7 mb-[13px]">
            Change Password
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

export default ChangePassword;
