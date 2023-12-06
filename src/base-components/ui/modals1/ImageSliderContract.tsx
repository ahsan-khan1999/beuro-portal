import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Slider } from "../slider/slider";
import { contractTableTypes } from "@/types/contract";

const ImageSliderContract = ({ onClose, details }: { onClose: () => void, details: contractTableTypes }) => {
  const SLIDER_IMAGES_DATA = {
    noOfThumbNails: 8,
    images: details?.offerID?.images?.map((item) => ({ imageSrc: item }))
  };

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[624px] min-h-auto max-h-fit"
      >
        <div className="relative flex flex-col px-[28px] py-5">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <p className="text-[24px] leading-6 font-medium text-[#000] mb-5">
            Uploaded Images
          </p>

          <hr className="opacity-25 mb-6" />

          <Slider {...SLIDER_IMAGES_DATA} />
        </div>
      </BaseModal>
    </>
  );
};

export default ImageSliderContract;
