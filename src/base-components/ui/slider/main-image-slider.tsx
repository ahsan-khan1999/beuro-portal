import Image from "next/image";
import { IconOnlyButton } from "../button/icon-only-button";
import sliderLeftIcon from "@/assets/svgs/slider_left.svg";
import sliderRightIcon from "@/assets/svgs/slider_right.svg";
import { MainImageSliderProps } from "@/types";
import { combineClasses } from "@/utils/utility";

export const MainImageSlider = ({
  imageSrc,
  goToNext,
  goToPrev,
  containerClassName,
  isFirst,
  isLast,
}: MainImageSliderProps) => {
  const silderContainerClasses = combineClasses(
    `w-[670px] h-[453px] overflow-hidden relative rounded-lg`,
    containerClassName
  );

  const isSvg = imageSrc.endsWith(".svg");

  return (
    <div className={silderContainerClasses}>
      {!isFirst && (
        <IconOnlyButton
          onClick={goToPrev}
          buttonClassName="absolute left-[30px] top-2/4 transform -translate-y-2/4 text-white w-[50px] h-[50px] z-10"
          icon={
            <Image
              src={sliderLeftIcon}
              alt="left arrow icon"
              width={50}
              height={50}
            />
          }
        />
      )}
      <div>
        {isSvg ? (
          <object
            data={imageSrc}
            height={"100%"}
            width={"100%"}
            className={`bg-black rounded-lg`}
          />
        ) : (
          <Image
            src={imageSrc}
            alt="main image"
            id="mainImage"
            className="flex justify-center items-center align-middle mx-auto my-auto bg-black rounded-lg"
            objectFit="contain"
            layout="fill"
          />
        )}
      </div>
      {!isLast && (
        <IconOnlyButton
          onClick={goToNext}
          buttonClassName="absolute top-2/4 right-[30px] transform -translate-y-2/4 text-white"
          icon={
            <Image
              src={sliderRightIcon}
              alt="right arrow icon"
              width={50}
              height={50}
            />
          }
        />
      )}
    </div>
  );
};
