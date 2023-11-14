import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useAddRemarks } from "@/hooks/follow-up/useAddRemarks";

const AddRemarks = ({ onClose, handleFollowUpsDetails}: { onClose: () => void; handleFollowUpsDetails:Function }) => {
  const { errors, fields, handleSubmit, onSubmit } = useAddRemarks(handleFollowUpsDetails);

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
            <p className="text-2xl font-normal text-[#000] ">Add Remarks</p>

            <span className="text-[#1E1E1E] text-sm font-normal my-3">
              Lorem Ipsum dollar smith
            </span>
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

export default AddRemarks;
