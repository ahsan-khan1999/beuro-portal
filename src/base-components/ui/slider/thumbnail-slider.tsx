import Image from "next/image";
import { BaseCard } from "../base-card";
import { IconOnlyButton } from "../button/icon-only-button";
import { Thumbnail } from "./thumbnail";

import sliderLeftIcon from "@/assets/svgs/slider_left.svg";
import sliderRightIcon from "@/assets/svgs/slider_right.svg";
import { ThumbnailSliderProps } from "@/types";

export const ThumbnailSlider = ({
  sliderImages,
  thumbnailStartIndex,
  noOfThumbnails,
  selectImage,
  goToNext,
  goToPrev,
}: ThumbnailSliderProps) => {
  const renderThumbnails = () =>
    sliderImages
      .slice(thumbnailStartIndex, thumbnailStartIndex + noOfThumbnails)
      .map(({ imageSrc }, index) => (
        <Thumbnail
          index={index}
          key={index}
          imageSrc={imageSrc}
          onClick={() => selectImage(thumbnailStartIndex + index)}
        />
      ));

  return (
    <BaseCard containerClassName="flex justify-between shadow-[0px_3px_6px_#00000029] rounded-tr-0 rounded-tl-0 min-h-[106px]">
      <IconOnlyButton
        onClick={goToPrev}
        buttonClassName="flex justify-start items-center w-[50px] h-[50px] z-10"
        icon={
          <Image
            src={sliderLeftIcon}
            alt="left arrow icon"
            width={10}
            height={10}
          />
        }
      />
      <div className="flex justify-center gap-x-3 relative">
        {renderThumbnails()}
      </div>
      <IconOnlyButton
        onClick={goToNext}
        buttonClassName="w-[50px] h-[50px] flex justify-end items-center text-white"
        icon={
          <Image
            src={sliderRightIcon}
            alt="right arrow icon"
            width={12}
            height={12}
          />
        }
      />
    </BaseCard>
  );
};
