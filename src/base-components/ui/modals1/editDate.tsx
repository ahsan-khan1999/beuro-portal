import Image from "next/image";
import React, { SetStateAction } from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useEditDate } from "@/hooks/contract/useEditDate";
import { EmailHeaderProps, PdfProps } from "@/types";

export interface EditContractDateProps {
  onClose: () => void;
  setOfferData?: SetStateAction<any>;
  pdfData?: PdfProps<EmailHeaderProps>;
}

export const EditDate = ({
  onClose,
  setOfferData,
  pdfData,
}: EditContractDateProps) => {
  const { fields, onSubmit, handleSubmit, errors, translate } = useEditDate(
    setOfferData,
    pdfData
  );

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[380px] md:max-w-[480px] lg:max-w-[624px] min-h-auto max-h-[600px] overflow-y-scroll"
    >
      <main className="relative px-2 py-3 md:pt-[18px] md:pb-[47px] md:pl-[32px] md:pr-[25px]">
        <Image
          src={crossIcon}
          alt="cross_icon"
          className="absolute right-5 top-6 cursor-pointer"
          onClick={onClose}
        />

        <div className="flex flex-col">
          <h2 className="text-base font-normal md:font-medium md:text-lg text-[#393939] mb-[10px] border-b border-b-[#000] border-opacity-10 pb-4">
            {translate("common.modals.date")}
          </h2>

          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        </div>
      </main>
    </BaseModal>
  );
};
