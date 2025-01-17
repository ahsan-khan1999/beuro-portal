import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import { Form } from "@/base-components/form/form";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import useAddTax from "@/hooks/modals/useAddTax";

const AddTax = ({
  onClose,
  heading,
}: {
  onClose: () => void;
  heading: string;
}) => {
  const { fields, onSubmit, handleSubmit, errors, error } = useAddTax(onClose);

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[480px] lg:max-w-[474.447px] min-h-fit"
    >
      <div className="relative flex flex-col px-6 py-5">
        <Image
          src={crossIcon}
          alt="crossIcon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />
        <p className="text-2xl font-medium mb-5">{heading}</p>

        <Form
          formFields={fields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </div>
    </BaseModal>
  );
};

export default AddTax;
