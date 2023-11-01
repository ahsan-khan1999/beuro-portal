import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import useAddTax from "@/hooks/modals/useAddTax";

const AddTax = ({ onClose }: { onClose: () => void }) => {
  const defaultClassName = "mt-0  ";
  const { fields, onSubmit, handleSubmit, errors, error } = useAddTax();
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[624px] min-h-auto max-h-auto"
      >
        <div className="relative flex flex-col px-[38px] pb-[40px] pt-[25px]">
          <Image
            src={crossIcon}
            alt="crossIcon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <p className="text-[#000] font-medium text-[24px] leading-7 mb-[50px]">
            Add New Tax
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

export default AddTax;
