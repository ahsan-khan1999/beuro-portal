import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import useInvoiceCreatedModal from "@/hooks/auth/useInvoiceCreatedModal";
import crossIcon from "@/assets/svgs/cross_icon.svg";

const InvoiceCreated = () => {
  const defaultClassName = "mt-0  ";
  const { fields, onSubmit, handleSubmit, errors, error } =
    useInvoiceCreatedModal();
  return (
    <>
      <BaseModal
        onClose={() => false}
        containerClassName="max-w-[624px] min-h-auto max-h-auto"
      >
        <div className="relative flex flex-col px-[39px] pb-[40px] pt-[24px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
          />
          <p className="text-[#000] font-medium text-[24px] leading-7 mb-5">
            Create Invoice
          </p>

          <hr className="opacity-25 mb-[23px]" />
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

export default InvoiceCreated;
