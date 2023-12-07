import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { useTranslation } from "next-i18next";

const AreYouSureOffer = ({ onClose }: { onClose: () => void }) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[564px] min-h-auto"
      >
        <div className="relative flex flex-col items-center">
          <Image src={createdIcon} alt="delete_icon" className="mt-[59px]" />
          <p className="text-[#000] font-medium text-[24px] leading-7 mt-[40px]  text-center ">
            {translate("offers.are_you_modal.main_heading")}
          </p>

          <span className="text-[#1E1E1E] font-normal text-[14px] text-center mt-[6px]">
            {translate("offers.are_you_modal.sub_heading")}
          </span>
          <div className="flex gap-[36px] mt-[32px] mb-[67px]">
            <button className="p-4 text-[#fff] w-[177px] bg-[#4A13E7] rounded-md">
              {translate("offers.are_you_modal.yes_button")}
            </button>
            <button className="py-[11px] px-[25px] w-[177px] text-[#fff] bg-[#BFBFBF] rounded-md">
              {translate("offers.are_you_modal.cancel_button")}
            </button>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default AreYouSureOffer;
