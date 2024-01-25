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
        containerClassName="max-w-[400px] lg:max-w-[624px] min-h-auto max-h-[600px] overflow-y-scroll "
      >
        <main className="relative pt-[26px] pb-[47px] pl-[32px] pr-[25px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <div className="flex flex-col">
            <h2 className="font-medium text-[18px] text-[#393939] mb-[26px]">
              {translate("modals.date")}
            </h2>

            <hr className="opacity-10" />
            <Form
              formFields={fields}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
            />
          </div>
        </main>
      </BaseModal>
    </>
  );
};
