import { BaseModal } from "@/base-components/ui/modals/base-modal";
import React from "react";
import { Form } from "@/base-components/form/form";
import { SuccessIcon } from "@/assets/svgs/components/success-icon";
import usePaidInvoice from "@/hooks/invoice/usePaidInvoice";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import Image from "next/image";

export interface PaidInvoiceDateProps {
  onClose: () => void;
  onSuccess: () => void;
  modelHeading: string;
  modelSubHeading: string;
}

export const SuccessPaidInvoice = ({
  onClose,
  modelHeading,
  modelSubHeading,
  onSuccess,
}: PaidInvoiceDateProps) => {
  const { fields, onSubmit, handleSubmit, errors } = usePaidInvoice({
    onSuccess,
  });

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[360px] md:max-w-[480px] lg:max-w-[564px] min-h-auto max-h-auto"
    >
      <div className="relative flex flex-col items-center px-[51px] pt-[56px] pb-[47px]">
        <Image
          src={crossIcon}
          onClick={onClose}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
        />

        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center flex-col">
            <SuccessIcon />
            <p className="font-medium text-base md:text-2xl mt-[35px] text-center">
              {modelHeading}
            </p>

            <span className="text-[#1E1E1E] font-normal text-sm mt-[6px] mb-6 text-center">
              {modelSubHeading}
            </span>
          </div>

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
