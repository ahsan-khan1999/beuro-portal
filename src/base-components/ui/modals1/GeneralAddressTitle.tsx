import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import useAddGeneralAddress from "@/hooks/modals/useAddGeneralAddress";

export const AddGeneralAddress = ({
  onClose,
  onSuccess,
  heading,
}: {
  onClose: () => void;
  onSuccess: () => void;
  heading: string;
}) => {
  const defaultClassName = "mt-6";
  const { fields, onSubmit, handleSubmit, errors, error } =
    useAddGeneralAddress({ onSuccess });

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[400px] lg:max-w-[474.447px] min-h-fit"
      >
        <div className="relative flex flex-col px-6 py-5">
          <Image
            src={crossIcon}
            alt="crossIcon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <p className="font-medium text-2xl border-b border-b-[#000] border-opacity-10 pb-5">
            {heading}
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
