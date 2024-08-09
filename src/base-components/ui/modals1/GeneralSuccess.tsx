import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import generalSuccessicon from "@/assets/pngs/general_success_icon.png";

export const GeneralSuccess = ({
  onClose,
  heading,
  description,
}: {
  onClose: () => void;
  heading: string;
  description: string;
}) => {
  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[400px] lg:max-w-[570px] min-h-fit"
    >
      <div className="relative flex flex-col px-6 py-5">
        <Image
          src={crossIcon}
          alt="crossIcon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex flex-col items-center lg:mb-[58px]">
          <Image
            src={generalSuccessicon}
            alt="generalSuccessicon"
            className="mt-20"
          />
          <h2 className="font-medium text-2xl mt-10">{heading}</h2>
          <p className="text-[#1E1E1E] text-sm font-normal mt-3">
            {description}
          </p>
          <button
            onClick={onClose}
            className="bg-[#4A13E7] cursor-pointer mt-10 w-[384px] rounded-lg p-4 text-white text-base font-medium hover:bg-buttonHover"
          >
            {translate("common.finish_button")}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
