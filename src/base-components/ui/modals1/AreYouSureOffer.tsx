import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image, { StaticImageData } from "next/image";
import React from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { useTranslation } from "next-i18next";
import { Button } from "../button/button";
interface AreYouSureInfo {
  image: StaticImageData;
  heading: string;
  text: string;
  noButton: string;
  yesButton: string;
  onSuccess: () => void;
  loading: boolean
}
const AreYouSureOffer = ({ onClose, info }: { onClose: () => void, info: AreYouSureInfo }) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[564px] min-h-auto"
      >
        <div className="relative flex flex-col items-center">
          <Image src={info.image} alt="delete_icon" className="mt-[59px]" />
          <p className="text-[#000] font-medium text-[24px] leading-7 mt-[40px]  text-center ">
            {info.heading}
          </p>

          <span className="text-[#1E1E1E] font-normal text-[14px] text-center mt-[6px]">
            {info.text}
          </span>
          <div className="flex gap-[36px] mt-[32px] mb-[67px]">
            <button className="p-4 text-[#fff] w-[177px] bg-[#4A13E7] rounded-md" onClick={onClose}>
              {info.noButton}
            </button>
            <Button
              className=" px-[25px] w-[177px] text-[#fff] bg-[#BFBFBF] rounded-md"
              id="yes"
              inputType="button"
              onClick={info.onSuccess}
              text={info.yesButton}
              loading={info.loading}
            />
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default AreYouSureOffer;
