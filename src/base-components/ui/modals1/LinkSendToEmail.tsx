import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import sendEmailIcon from "@/assets/svgs/send_email_icon.svg";

const LinkSendToEmail = () => {
  return (
    <>
      <BaseModal
        onClose={() => false}
        containerClassName="max-w-[624px] min-h-[465px] max-h-[465px]"
      >
        <div className="flex items-center flex-col">
          <Image
            src={sendEmailIcon}
            alt="request_submitted"
            className="mb-[37px] mt-[43px]"
          />
          <p className="text-[#000] font-medium text-[24px] leading-7 text-center mb-4">
            Link Send to Employ Email
          </p>
          <p className="text-[#1E1E1E] text-sm font-normal text-center " >
            Thanks for signing up to Buro we are happy to have you.<br/> Please take
            a second to make sure we have your correct email <br/> address
          </p>

          <button className="bg-[#4A13E7] cursor-pointer mt-[31px] w-[384px] rounded-lg p-4 text-white text-base font-medium">
            Done
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default LinkSendToEmail;
