import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import passwordChangeIcon from "@/assets/svgs/password_change_icon.svg";

const PasswordChangeSuccessfully = ({onClose} : {onClose: () => void}) => {
  return (
    <>
      <BaseModal
       onClose={onClose}
        containerClassName="max-w-[624px] min-h-auto max-h-[465px]"
      >
        <div className="flex items-center flex-col">
          <Image
            src={passwordChangeIcon}
            alt="request_submitted"
            className="mb-[35px] mt-[61px]"
          />
          <p className="text-[#000] font-medium text-[24px] leading-7 text-center mb-4">
            Password has been changes <br /> successfully
          </p>
          <p className="text-[#1E1E1E] text-sm font-normal text-center">
            Lorem ipsum dolor sit amet consectetur. Non non <br /> sed sed
            mattis ac dictum.
          </p>

          <button onClick={onClose} className="bg-[#4A13E7] cursor-pointer mt-[19px] mb-[47px] w-[384px] rounded-lg p-4 text-white text-base font-medium">
            Done
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default PasswordChangeSuccessfully;
