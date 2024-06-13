import { BaseModal } from "@/base-components/ui/modals/base-modal";
import React from "react";
import { Button } from "../button/button";
import warningIcon from "@/assets/svgs/warning_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";

import Image from "next/image";

interface AreYouSureInfo {
  heading: string;
  sub_heading: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const AreYouSureMakeAccountFree = ({
  onClose,
  heading,
  onSuccess,
  sub_heading,
}: AreYouSureInfo) => {
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[360px] md:max-w-[480px] lg:max-w-[564px] min-h-fit"
      >
        <div className="relative flex flex-col items-center py-10">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <Image src={warningIcon} alt="delete_icon" />
          <p className="font-medium text-2xl mt-10 text-center">{heading}</p>
          <span className="text-[#1E1E1E] font-normal text-sm text-center mt-5">
            {sub_heading}
          </span>

          <div className="flex items-center gap-x-5 mt-5">
            <button
              className="p-4 w-[100px] md:w-[174px] text-black hover:text-white bg-[#BFBFBF] hover:bg-buttonHover flex items-center justify-center rounded-lg !h-[50px]"
              onClick={onClose}
            >
              {translate("common.cancel_button")}
            </button>
            <Button
              className="p-4 w-[100px] md:w-[174px] rounded-lg"
              id="yes"
              inputType="button"
              onClick={onSuccess}
              text={translate("common.are_you_sure_modal.yes_button")}
            />
          </div>
        </div>
      </BaseModal>
    </>
  );
};
