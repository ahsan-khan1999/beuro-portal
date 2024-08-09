import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { FilterType } from "@/types";
import { useUpdateNote } from "@/hooks/modals/useUpdateNote";
import { useAppSelector } from "@/hooks/useRedux";

export const UpdateNote = ({
  onClose,
  handleNotes,
  handleFilterChange,
  filter,
  mainHeading,
}: {
  onClose: () => void;
  handleNotes: (id: string) => void;
  handleFilterChange?: (query: FilterType) => void;
  filter?: FilterType;
  mainHeading: string;
}) => {
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useUpdateNote({ handleNotes, handleFilterChange, filter });

  const { refID, name, heading } = useAppSelector(
    (state) => state.global.modal.data
  );

  return (
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

        <p className="font-medium text-base md:text-2xl ml-[38px]">
          {mainHeading}
        </p>

        <div className="border-y border-y-[#000] border-opacity-10 py-[10px] mx-10 my-5">
          <div className="flex items-center gap-x-[34px]">
            <div className="flex items-center gap-x-[14px]">
              <span className="text-sm font-normal text-[#4D4D4D]">ID:</span>
              <span className="text-sm font-medium text-primary">{refID}</span>
            </div>
            <div className="flex items-center gap-x-[14px]">
              <span className="text-sm font-normal text-[#4D4D4D]">
                {heading}:
              </span>
              <span className="text-sm font-medium text-primary">{name}</span>
            </div>
          </div>
        </div>

        <div className="xl:mx-[42px] mx-4 mt-3">
          <Form
            formFields={fields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        </div>
      </div>
    </BaseModal>
  );
};
