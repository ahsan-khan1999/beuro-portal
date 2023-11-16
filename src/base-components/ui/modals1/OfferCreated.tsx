import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { useRouter } from "next/router";
import { CreateSuccessProps } from "@/types/global";

const RecordCreateSuccess = ({ onClose, modelHeading, modelSubHeading, routeHandler }: CreateSuccessProps) => {
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[564px] min-h-auto max-h-auto"
      >
        <div className="relative flex flex-col items-center">
          <Image src={createdIcon} alt="delete_icon" className="mt-[47px]" />
          <p className="text-[#000] font-medium text-[24px] leading-7 mt-[40px]  text-center ">
            {modelHeading}
          </p>

          <span className="text-[#1E1E1E] font-normal text-[14px] mt-[6px]">
            {modelSubHeading}
          </span>

          <button
            onClick={routeHandler}
            className="bg-[#4A13E7] cursor-pointer mt-[32px] mb-[66px] w-[384px] rounded-lg p-4 text-white text-base font-medium"
          >
            Done
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default RecordCreateSuccess;
