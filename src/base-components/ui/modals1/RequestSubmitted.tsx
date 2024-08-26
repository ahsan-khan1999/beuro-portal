import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import requestSUbIcon from "@/assets/svgs/created_icon.svg";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const RequestSubmitted = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

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
          <p className="text-black text-2xl font-medium mb-4">
            {translate("contact_support.request_modal.main_heading")}
          </p>
          <p className="text-[#1E1E1E] text-sm font-normal">
            {translate("contact_support.request_modal.sub_heading")}
          </p>

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-[#4A13E7] cursor-pointer mt-[32px] mb-[68px] w-[384px] rounded-lg p-4 text-white text-base font-medium"
          >
            {translate("contact_support.request_modal.button")}
          </button>
        </div>
      </BaseModal>
    </>
  );
};

export default RequestSubmitted;
