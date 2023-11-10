import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";

const CreationCreated = ({ onClose, heading, subHeading, route }: { onClose: () => void; heading:string; subHeading:string; route:Function }) => {
  
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[564px] min-h-auto"
      >
        <div className="relative flex flex-col items-center">
          <Image src={createdIcon} alt="delete_icon" className="mt-[47px]" />
          <p className="text-[#000] font-medium text-[24px] leading-7 mt-[40px]  text-center ">
           {heading}
          </p>

          <span className="text-[#1E1E1E] font-normal text-[14px] mt-[6px]">
            {subHeading}
          </span>

          <button
            onClick={() => route()}
            className="bg-[#4A13E7] cursor-pointer mt-[32px] mb-[68px] w-[384px] rounded-lg p-4 text-white text-base font-medium"
          >
            Done
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default CreationCreated;
