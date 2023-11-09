import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useAddFollowUp } from "@/hooks/modals/useAddFollowUp";

const FollowUpAdd = ({
  onClose,
  heading,
  subHeading,
  isShow
}: {
  onClose: () => void;
  heading: string;
  subHeading: string;
  isShow:boolean
}) => {
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useAddFollowUp(isShow);

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[604.966px] min-h-auto max-h-fit"
      >
        <div className="relative flex flex-col px-[52px] py-6">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <div className="flex flex-col">
            <p className="text-2xl font-normal text-[#000] ">{heading}</p>
            <p className="text-sm  font-normal text-[#1E1E1E] my-3">{subHeading}</p>
          </div>

          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        </div>
      </BaseModal>
    </>
  );
};

export default FollowUpAdd;
