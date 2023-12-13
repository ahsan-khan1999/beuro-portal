import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Slider } from "../slider/slider";
import { Lead } from "@/types/leads";
import { OffersTableRowTypes } from "@/types/offers";
import { contractTableTypes } from "@/types/contract";
import { useTranslation } from "next-i18next";

const ImageSlider = ({ onClose, details }: { onClose: () => void, details: string[] }) => {
  // const { leadDetails } = useAppSelector(state => state.lead)
  console.log(details,"de");
  
  const SLIDER_IMAGES_DATA = {
    noOfThumbNails: 8,
    images: details?.map((item) => ({ imageSrc: item }))
  };
  
  const { t: translate } = useTranslation();

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] xl:max-w-[624px] min-h-fit"
      >
        <div className="relative flex flex-col p-4 xl:px-[28px] xl:py-5">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <p className="text-[24px] leading-6 font-medium text-[#000] mb-5">
            {translate("common.images_modal.image_slider_heading")}
          </p>

          <hr className="opacity-25 mb-6" />

          <Slider {...SLIDER_IMAGES_DATA} />
        </div>
      </BaseModal>
    </>
  );
};

export default ImageSlider;
