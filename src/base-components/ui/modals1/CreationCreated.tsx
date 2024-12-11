import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image, { StaticImageData } from "next/image";
import React from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { useTranslation } from "next-i18next";

export interface SuccessCreationModalProps {
  onClose: () => void;
  heading: string;
  subHeading?: string;
  route: () => void;
  imgSrc?: StaticImageData;
}

const CreationCreated = ({
  onClose,
  heading,
  subHeading,
  route,
  imgSrc,
}: SuccessCreationModalProps) => {
  const { t: translate } = useTranslation();
  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[360px] md:max-w-[480px] lg:max-w-[624.862px] min-h-fit"
    >
      <div className="relative flex flex-col items-center px-6 md:px-0">
        <Image
          src={imgSrc || createdIcon}
          alt="delete_icon"
          className="mt-10 md:mt-[82px] w-[70px] h-[70px] md:w-fit md:h-fit"
        />
        <p className="font-medium mt-5 text-base md:text-2xl md:mt-10 text-center">
          {heading}
        </p>

        <span className="text-[#1E1E1E] font-normal text-sm mt-[6px] px-5 md:px-[60px] text-center">
          {subHeading}
        </span>

        <button
          onClick={route}
          className="bg-[#4A13E7] cursor-pointer mt-[32px] mb-6 lg:mb-[68px] w-full md:w-[384px] rounded-lg p-4 text-white text-base font-medium hover:bg-buttonHover"
        >
          {translate("common.done_button")}
        </button>
      </div>
    </BaseModal>
  );
};

export default CreationCreated;
