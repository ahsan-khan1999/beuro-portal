import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import deleteConfirmIcon from "@/assets/svgs/delete_confirm_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Button } from "../button/button";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/hooks/useRedux";

export interface DeleteConfProps {
  onClose: () => void;
  modelHeading: string;
  routeHandler: Function;
  loading: boolean;
}

const DeleteConfirmation_2 = ({
  onClose,
  modelHeading,
  routeHandler,
  loading,
}: DeleteConfProps) => {
  const { t: translate } = useTranslation();
  const id = useAppSelector((state) => state.global.modal.data);

  const handleDelete = () => {
    routeHandler(id.id);
  };

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[300px] xMini:max-w-[480px] lg:max-w-[564.004px] min-h-fit"
    >
      <div className="relative flex flex-col items-center px-5">
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
        <p className="text-2xlfont-medium mt-5 xMini:mt-[44px] max-w-[290px] text-center">
          {modelHeading}
        </p>

        <div className="flex gap-x-5 xMini:gap-[33px] mt-[27px] mb-[38px]">
          <button
            onClick={onClose}
            className="py-[11px] px-[25px] text-[#fff] bg-[#BFBFBF] rounded-md hover:bg-buttonHover"
          >
            {translate("email_tracker.email_delete_modal.cancel_button")}
          </button>

          <Button
            id="Delete"
            inputType="submit"
            loading={loading}
            text={translate("email_tracker.email_delete_modal.delete_button")}
            onClick={() => {
              if (id) {
                handleDelete();
              } else {
                routeHandler();
              }
            }}
            className="px-[25px] !text-white bg-[#FF0000] rounded-md"
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteConfirmation_2;
