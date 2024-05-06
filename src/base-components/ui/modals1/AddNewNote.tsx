import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useAddNewNote } from "@/hooks/modals/useAddNewNote";
import { FilterType } from "@/types";

export interface AddNoteProps {
  onClose: () => void;
  handleNotes: (id: string) => void;
  handleFilterChange?: (query: FilterType) => void;
  filter?: FilterType;
  heading: string;
}

const AddNewNote = ({
  onClose,
  handleNotes,
  handleFilterChange,
  filter,
  heading,
}: AddNoteProps) => {
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useAddNewNote({ handleNotes, handleFilterChange, filter });

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
          <div className="flex justify-between items-center mb-[19px] border-b border-b-[#000] border-opacity-10 pb-5">
            <p className="text-2xl font-medium text-[#000] ml-[38px]">
              {heading}
            </p>
          </div>

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
