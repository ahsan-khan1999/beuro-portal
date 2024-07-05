import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useAddPostPonedNote } from "@/hooks/follow-up/useAddPostPonedNote";
import { AddPostPonedNoteProps } from "@/types/follow-up";

const AddPostPonedNote = ({
  onClose,
  handleFollowUpsDetails,
}: AddPostPonedNoteProps) => {
  const { errors, fields, handleSubmit, onSubmit, translate } =
    useAddPostPonedNote(handleFollowUpsDetails);

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[480px] xl:max-w-[604px] min-h-fit"
    >
      <div className="relative flex flex-col px-[30px] py-6">
        <Image
          src={crossIcon}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />

        <p className="text-2xl font-normal mb-4">
          {translate("follow_up.add_postponed_note_heading")}
        </p>

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

export default AddPostPonedNote;
