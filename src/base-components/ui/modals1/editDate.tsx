import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";

import { useEditDate } from "@/hooks/contract/useEditDate";

export const EditDate = ({ onClose }: { onClose: () => void }) => {
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useEditDate();

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[400px] lg:max-w-[624px] min-h-auto max-h-fit "
      >
        <div className="relative px-6">
          <Image
            src={crossIcon}
            alt="cancle"
            onClick={onClose}
            className="absolute right-4 top-4 cursor-pointer"
          />
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
