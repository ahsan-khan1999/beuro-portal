import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useAddPostPonedNote } from "@/hooks/follow-up/useAddPostPonedNote";

const AddPostPonedNote = ({
  onClose,
  handleFollowUpsDetails,
}: {
  onClose: () => void;
  handleFollowUpsDetails: Function;
}) => {
  const { errors, fields, handleSubmit, onSubmit } = useAddPostPonedNote(
    handleFollowUpsDetails
  );

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
            <p className="text-2xl font-normal text-[#000] mb-4">
              Add a postponed Note
            </p>
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

export default AddPostPonedNote;
