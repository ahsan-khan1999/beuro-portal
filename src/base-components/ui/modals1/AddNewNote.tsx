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
  handleNotes: (id: string) => void;
}) => {
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useAddNewNote({ handleNotes });

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] xl:max-w-[624px] min-h-fit"
      >
        <div className="relative flex flex-col pt-[22px] pb-4 xl:pb-[32px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <div className="flex justify-between items-center mb-[19px] ml-[38px]">
            <p className="text-2xl font-medium text-[#000]">
              {translate("common.add_note")}
            </p>
          </div>
          <hr className="opacity-10 mb-[30px]" />

          <div className="xl:mx-[42px] mx-4">
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
