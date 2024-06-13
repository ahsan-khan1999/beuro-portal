import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import warningIcon from "@/assets/svgs/warning_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import useEnterComponayName from "@/hooks/modals/useEnterComponayName";

const WarningModal = ({
  onClose,
  handleCreated,
}: {
  onClose: () => void;
  handleCreated: () => void;
}) => {
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useEnterComponayName({ onClose, handleCreated });

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[400px] md:max-w-[480px] lg:max-w-[570.56px] min-h-fit"
      >
        <div className="relative flex flex-col items-center p-6 lg:pt-[69px] lg:pb-[67px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <Image src={warningIcon} alt="delete_icon" className="w-16 h-16 md:w-fit md:h-fit"/>
          <p className="text-base md:text-2xl font-medium mt-6 text-center mb-2">
            {translate("common.are_you_sure_modal.confirm_heading")}
          </p>

          <div className="mx-4">
            <Form
              formFields={fields}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
            />
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default WarningModal;
