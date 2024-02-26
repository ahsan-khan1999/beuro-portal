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
}: MainImageSliderProps) => {
  const silderContainerClasses = combineClasses(
    `w-[670px] h-[453px] overflow-hidden relative rounded-lg`,
    containerClassName
  );

  return (
    <div className={silderContainerClasses}>
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
      <div>
        <Image
          src={imageSrc}
          alt="main image"
          // fill={true}
          id="mainImage"
          className=" flex justify-center items-center align-middle mx-auto my-auto rounded-lg"
          height={500}
          width={500}
          
        />
      </div>
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
    </div>
  );
};
