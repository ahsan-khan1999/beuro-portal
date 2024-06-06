import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useAddNewNote } from "@/hooks/modals/useAddNewNote";
import { FilterType } from "@/types";
import { useAppSelector } from "@/hooks/useRedux";

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

  const { refID, name } = useAppSelector((state) => state.global.modal.data);

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
          <div className="flex justify-between items-center mb-[19px]">
            <p className="text-2xl font-medium text-[#000] ml-[38px]">
              {heading}
            </p>
          </div>
          <div className="border-y border-y-[#000] border-opacity-10 py-[10px] mx-10 mb-5">
            <div className="flex items-center gap-x-[34px]">
              <div className="flex items-center gap-x-[14px]">
                <span className="text-sm font-normal text-[#4D4D4D]">ID:</span>
                <span className="text-sm font-medium text-primary">
                  {refID}
                </span>
              </div>
              <div className="flex items-center gap-x-[14px]">
                <span className="text-sm font-normal text-[#4D4D4D]">
                  {translate("common.customer_name")}:
                </span>
                <span className="text-sm font-medium text-primary">{name}</span>
              </div>
            </div>
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
