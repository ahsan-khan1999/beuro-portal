import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/hooks/useRedux";

export const OfferAccepted = ({
  onClose,
  heading,
  subHeading,
  route,
  onFileUpload,
}: {
  onClose: () => void;
  heading: string;
  subHeading: string;
  route: () => void;
  onFileUpload: (id: string) => void;
}) => {
  const { t: translate } = useTranslation();
  const id = useAppSelector((state) => state.global.modal.data);

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[480px] lg:max-w-[624.862px] min-h-fit"
    >
      <div className="relative flex flex-col items-center">
        <Image src={createdIcon} alt="delete_icon" className="mt-[47px]" />
        <p className="font-medium text-base md:text-2xl mt-[40px] text-center">
          {heading}
        </p>

        <span className="text-[#1E1E1E] font-normal text-sm mt-[6px] px-[60px] text-center">
          {subHeading}
        </span>

        <div className="flex items-center gap-x-6">
          <button
            onClick={route}
            className="bg-[#4A13E7] hover:bg-purple-600 cursor-pointer mt-[32px] mb-6 lg:mb-[68px] w-[200px] rounded-lg p-4 text-white text-base font-medium"
          >
            {translate("common.done_button")}
          </button>
          <button
            onClick={() => onFileUpload(id)}
            className="bg-[#4A13E7] hover:bg-purple-600 cursor-pointer mt-[32px] mb-6 lg:mb-[68px] w-[200px] rounded-lg p-4 text-white text-base font-medium"
          >
            {translate("common.upload_file")}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
