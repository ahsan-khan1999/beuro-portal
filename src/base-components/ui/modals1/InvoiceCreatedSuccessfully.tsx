import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import leadCreatedIcon from "@/assets/svgs/created_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import EmailPriview from "@/components/invoice/details/invoice/emailPriview";

const InvoiceCreatedSuccessfully = () => {
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
            Invoice Created Successful
          </p>
          <p className="text-[#1E1E1E] text-sm font-normal text-center mb-4">
            Thanks for creating Invoice we are happy to have you.
          </p>

          <button
            onClick={() => <EmailPriview />}
            className="bg-[#4A13E7] cursor-pointer mt-[31px] mb-[59px] w-[384px] rounded-lg p-4 text-white text-base font-medium"
          >
            Preview PDF
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default InvoiceCreatedSuccessfully;
