import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useAddRemarks } from "@/hooks/follow-up/useAddRemarks";
import { AddRemarksProps } from "@/types/follow-up";
import { useTranslation } from "next-i18next";

const AddRemarks = ({ onClose, handleFollowUpsDetails }: AddRemarksProps) => {
  const { errors, fields, handleSubmit, onSubmit } = useAddRemarks(
    handleFollowUpsDetails
  );

  const { t: translate } = useTranslation();

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
          {/* <div className="flex flex-col"> */}
          <p className="text-2xl font-normal my-3">
            {translate("follow_up.add_remarks_heading")}
          </p>

          {/* <span className="text-[#1E1E1E] text-sm font-normal my-3">
              Lorem Ipsum dollar smith
            </span> */}
          {/* </div> */}

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
