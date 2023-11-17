import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Slider } from "../slider/slider";
import img1 from "@/assets/pngs/leads_detail_img1.png";
import img2 from "@/assets/pngs/leads_detail_img2.png";
import img3 from "@/assets/pngs/leads_detail_img3.png";
import img4 from "@/assets/pngs/leads_detail_img4.png";

const ImageSlider = ({ onClose }: { onClose: () => void }) => {
  const SLIDER_IMAGES_DATA = {
    noOfThumbNails: 8,
    images: [
      {
        imageSrc: img1,
      },
      {
        imageSrc: img2,
      },
      {
        imageSrc: img3,
      },
      {
        imageSrc: img4,
      },
      {
        imageSrc: img1,
      },
      {
        imageSrc: img2,
      },
      {
        imageSrc: img3,
      },
      {
        imageSrc: img4,
      },
    ],
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
            Image Name
          </p>

          <hr className="opacity-25 mb-6" />

          <Slider {...SLIDER_IMAGES_DATA} />
        </div>
      </BaseModal>
    </>
  );
};

export default ImageSlider;
