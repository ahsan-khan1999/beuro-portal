import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";
import downloadIcon from "@/assets/svgs/download_modal_icon.svg";

const DownloadModal = ({
  onClose,
  heading,
  subHeading,
  route,
  button,
}: {
  onClose: () => void;
  heading: string;
  subHeading: string;
  route: Function;
  button: string;
}) => {
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] lg:max-w-[624px] min-h-fit "
      >
        <div className="flex flex-col items-center lg:pt-[47px] lg:pb-[50px] p-5">
          <Image src={downloadIcon} alt="downloadIcon" />
          <p className="text-[#000] font-medium text-2xl mt-[31px] text-center ">
            {heading}
          </p>

          <span className="text-[#1E1E1E] font-normal text-sm mt-[30px] text-center">
            {subHeading}
          </span>

          <button
            onClick={() => route()}
            className="bg-[#4A13E7] cursor-pointer mt-[30px] w-[384px] rounded-lg p-4 text-white text-base font-medium"
          >
            {button}
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default DownloadModal;
