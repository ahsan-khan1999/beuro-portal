import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import leadCreatedIcon from "@/assets/svgs/created_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";

export interface LeadCreatedProps {
  imageUploadHandler: Function;
  onClose: () => void;
  routeHandler: Function;
  heading: string;
  subHeading: string;
}

const LeadCreated = ({
  imageUploadHandler,
  onClose,
  routeHandler,
  heading,
  subHeading,
}: LeadCreatedProps) => {
  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[360px] md:max-w-[480px] lg:max-w-[624.862px] min-h-fit"
    >
      <div className="relative flex items-center flex-col">
        <Image
          src={crossIcon}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />
        <Image
          src={leadCreatedIcon}
          alt="request_submitted"
          className="mb-[40px] mt-[43px] w-[70px] h-[70px] md:w-fit md:h-fit"
        />
        <div className="flex flex-col items-center justify-center px-10">
          <p className="font-medium text-base md:text-2xl text-center mb-4">
            {heading}
          </p>
          <p className="text-[#1E1E1E] text-sm font-normal text-center mb-4">
            {subHeading}
          </p>
        </div>

        <div className="flex flex-col">
          <button
            onClick={() => imageUploadHandler()}
            className="bg-[#4A13E7] cursor-pointer mb-[21px] hover:bg-buttonHover w-full md:w-[384px] rounded-lg p-4 text-white text-base font-medium"
          >
            {translate("leads.leads_created_modal.add_button")}
          </button>
          <button
            onClick={() => routeHandler()}
            className="bg-[#BFBFBF] cursor-pointer w-full md:w-[384px] rounded-lg p-4 mb-[33px] text-dark text-base font-medium hover:bg-buttonHover hover:text-white"
          >
            {translate("leads.leads_created_modal.without_images")}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default LeadCreated;
