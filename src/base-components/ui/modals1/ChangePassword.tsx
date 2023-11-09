import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import useChangePassword from "@/hooks/modals/useChangePassword";

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
  const defaultClassName = "";
  const { fields, onSubmit, handleSubmit, errors, error } =
  useChangePassword(onClose);
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[474.447px] min-h-auto max-h-auto"
      >
        <div className="relative flex flex-col px-[38px] pb-[40px] pt-[25px]">
          <Image src={crossIcon} alt="crossIcon" className="absolute right-5 top-5 cursor-pointer" onClick={onClose}/>
          <p className="text-[#000] font-medium text-[24px] leading-7 mb-[28px]">
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
