import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Button } from "../button/button";
interface AreYouSureInfo {
  image: StaticImageData;
  heading: string;
  text: string;
  noButton: string;
  yesButton: string;
  onSuccess: () => void;
  loading: boolean;
}
const AreYouSureOffer = ({
  onClose,
  info,
}: {
  onClose: () => void;
  info: AreYouSureInfo;
}) => {
  return (
    <BaseModal onClose={onClose} containerClassName="max-w-[564px] min-h-auto">
      <div className="relative flex flex-col items-center">
        <Image src={info.image} alt="delete_icon" className="mt-[59px]" />
        <p className="text-2xl font-medium mt-[40px] text-center">
          {info.heading}
        </p>

        <span className="text-[#1E1E1E] font-normal text-sm text-center mt-[6px]">
          {info.text}
        </span>
        <div className="flex gap-[36px] mt-[32px] mb-[67px]">
          <button
            className="p-4 !h-[50px] text-[#fff] min-w-[177px] w-fit bg-[#4A13E7] hover:bg-buttonHover rounded-md"
            onClick={onClose}
          >
            {info.noButton}
          </button>
          <Button
            className="p-4 min-w-[177px] w-fit text-[#fff] bg-[#BFBFBF] rounded-md"
            id="yes"
            inputType="button"
            onClick={info.onSuccess}
            text={info.yesButton}
            loading={info.loading}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default AreYouSureOffer;
