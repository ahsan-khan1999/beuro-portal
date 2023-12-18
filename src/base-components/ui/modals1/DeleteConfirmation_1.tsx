import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import deleteConfirmIcon from "@/assets/svgs/delete_confirm_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";

const DeleteConfirmation_1 = ({
  handleDelete,
  onClose,
  modelHeading,
  subHeading,
}: {
  handleDelete: Function;
  onClose: () => void;
  modelHeading: string;
  subHeading: string;
}) => {
  const {
    modal: { data },
  } = useAppSelector((state) => state.global);

  const { t: translate } = useTranslation();
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
          className="mt-[66px]"
        />
        <p className="text-[#000] font-medium text-xl my-2">{modelHeading}</p>
        <p className="text-[#4D4D4D] font-normal text-sm ">{subHeading}</p>
        <div className="mt-[10px] w-[260px] p-4 rounded-lg border border-[#EBEBEB] text-[#4B4B4B] text-base font-medium">
          ID: &nbsp; {data?.refId}
        </div>

        <div className="flex gap-[33px] mt-[26px] mb-[38px]">
          <button
            onClick={onClose}
            className="py-[11px] px-[25px] text-[#fff] bg-[#BFBFBF] rounded-md"
          >
            {translate("email_tracker.email_confirmation_modal.cancel_button")}
          </button>
          <button
            onClick={() => handleDelete()}
            className="py-[11px] px-[25px] text-[#fff] bg-[#FF0000] rounded-md"
          >
            {translate("email_tracker.email_confirmation_modal.confirm_button")}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteConfirmation_1;
