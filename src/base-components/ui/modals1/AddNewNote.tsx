import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useAddNewNote } from "@/hooks/modals/useAddNewNote";

const AddNewNote = ({
  onClose,
  handleNotes,
}: {
  onClose: () => void;
  handleNotes: Function;
}) => {
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useAddNewNote(handleNotes);

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[624px] min-h-auto max-h-fit"
      >
        <div className="relative flex flex-col ">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <div className="flex justify-between items-center mb-[19px] mt-[30px] mx-[38px]">
            <p className="text-[24px] leading-6 font-medium text-[#000]">
              Add Notes
            </p>
          </div>
          <hr className="opacity-10 mb-[30px]" />

          <div className="mx-[42px]">
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

export default AddNewNote;
