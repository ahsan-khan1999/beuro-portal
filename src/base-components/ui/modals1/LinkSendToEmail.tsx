import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import sendEmailIcon from "@/assets/svgs/send_email_icon.svg";

const LinkSendToEmail = ({
  onClose,
  createNewPswHandler,
}: {
  onClose: () => void;
  createNewPswHandler: Function;
}) => {
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[624px] min-h-auto max-h-[465px]"
      >
        <div className="flex items-center flex-col">
          <Image
            src={sendEmailIcon}
            alt="request_submitted"
            className="mb-[37px] mt-[43px]"
          />
          <p className="text-[#000] font-medium text-[24px] leading-7 text-center mb-[13px]">
            Link Send to Employee Email
          </p>
          <p className="text-[#1E1E1E] text-sm font-normal text-center ">
            Thanks for signing up to Buro we are happy to have you.
            <br /> Please take a second to make sure we have your correct email{" "}
            <br /> address
          </p>

          <button
            onClick={() => createNewPswHandler()}
            className="bg-[#4A13E7] cursor-pointer mt-[31px] mb-[59px] w-[384px] rounded-lg p-4 text-white text-base font-medium"
          >
            Done
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default LinkSendToEmail;
