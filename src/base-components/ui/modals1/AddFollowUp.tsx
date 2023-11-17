import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useAddFollowUp } from "@/hooks/follow-up/useAddFollowUp";
import { AddFollowUpProps } from "@/types/follow-up";

const AddFollowUp = ({
  onClose,
  handleFollowUps,
  handleAllCustomers,
  handleAllLeads,
}: AddFollowUpProps) => {
  const { fields, control, onSubmit, handleSubmit, errors, error,customer } =
    useAddFollowUp(handleFollowUps, handleAllCustomers, handleAllLeads);

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[960px] min-h-auto max-h-fit"
      >
        <div className="relative flex flex-col px-[76px] pt-[30px] pb-[47px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <div className="flex justify-between items-center">
            <p className="text-2xl font-medium text-[#000] mb-5">
              Add Followup
            </p>
          </div>

          <hr className="opacity-10 mb-[30px]" />

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

export default AddFollowUp;
