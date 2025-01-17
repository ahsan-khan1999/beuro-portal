import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import deleteConfirmIcon from "@/assets/svgs/delete_confirm_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Button } from "../button/button";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/hooks/useRedux";

export const ConfirmDeleteNote = ({
  onClose,
  modelHeading,
  onDeleteNote,
  loading,
  onCancel,
}: {
  onClose: () => void;
  modelHeading: string;
  onDeleteNote: (id: string) => void;
  loading: boolean;
  onCancel: () => void;
}) => {
  const { t: translate } = useTranslation();
  const id = useAppSelector((state) => state.global.modal.data);

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[480px] lg:max-w-[564.004px] min-h-fit"
    >
      <div className="relative flex flex-col items-center">
        <Image
          src={crossIcon}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />
        <Image
          src={deleteConfirmIcon}
          alt="delete_icon"
          className="mt-[59px]"
        />
        <p className="text-2xl font-medium mt-[44px] max-w-[290px] text-center">
          {modelHeading}
        </p>

        <div className="flex gap-[33px] mt-[27px] mb-[38px]">
          <button
            onClick={onCancel}
            className="py-[11px] px-[25px] text-[#fff] bg-[#BFBFBF] rounded-md"
          >
            {translate("email_tracker.email_delete_modal.cancel_button")}
          </button>

          <Button
            id="Delete"
            inputType="submit"
            loading={loading}
            text={translate("email_tracker.email_delete_modal.delete_button")}
            onClick={() => onDeleteNote(id)}
            className=" px-[25px] !text-white bg-[#FF0000] rounded-md"
          />
        </div>
      </div>
    </BaseModal>
  );
};
