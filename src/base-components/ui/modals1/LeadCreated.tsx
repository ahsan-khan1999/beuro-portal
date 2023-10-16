import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import leadCreatedIcon from "@/assets/svgs/created_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";

const LeadCreated = () => {
  return (
    <>
      <BaseModal
        onClose={() => false}
        containerClassName="max-w-[624px] min-h-auto max-h-[465px]"
      >
        <div className="relative flex items-center flex-col">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
          />
          <Image
            src={leadCreatedIcon}
            alt="request_submitted"
            className="mb-[40px] mt-[43px]"
          />
          <p className="text-[#000] font-medium text-[24px] leading-7 text-center mb-4">
            Lead Created Successful
          </p>
          <p className="text-[#1E1E1E] text-sm font-normal text-center mb-4">
            Thanks for creating offer we are happy to have you.
          </p>

          <div className="flex flex-col">
            <button className="bg-[#4A13E7] cursor-pointer mb-[21px] w-[384px] rounded-lg p-4 text-white text-base font-medium">
              Add Images
            </button>
            <button className="bg-[#BFBFBF] cursor-pointer w-[384px] rounded-lg p-4 mb-[33px] text-white text-base font-medium">
              Continue without Images
            </button>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default LeadCreated;
