import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import requestSUbIcon from "@/assets/svgs/created_icon.svg";
import { useRouter } from "next/router";

const RequestSubmitted = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[606px] min-h-auto max-h-[465px]"
      >
        <div className="flex items-center flex-col">
          <Image
            src={requestSUbIcon}
            alt="request_submitted"
            className="mb-10 mt-[47px]"
          />
          <p className="text-black text-[24px] leading-7 font-medium mb-4">
            Your Request has been sent
          </p>
          <p className="text-[#1E1E1E] text-sm font-normal">
            Thanks for sending your request to Buro we are happy to have you.
          </p>

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-[#4A13E7] cursor-pointer mt-[32px] mb-[68px] w-[384px] rounded-lg p-4 text-white text-base font-medium"
          >
            Done
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default RequestSubmitted;
