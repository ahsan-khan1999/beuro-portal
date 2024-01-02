import { useSlider } from "./useSlider";
import { SliderImagesDataProps } from "@/types";
import { MainImageSlider } from "./main-image-slider";
import { ThumbnailSlider } from "./thumbnail-slider";

export const Slider = ({ images, noOfThumbNails }: SliderImagesDataProps) => {
  const {
    selectedImage,
    thumbnailStartIndex,
    goToNext,
    goToPrev,
    selectImage,
    handleMouseLeave,
    handleMouseMove,
  } = useSlider({ images, noOfThumbNails });

  return (
    <div className="flex flex-col">
      <MainImageSlider
        goToNext={goToNext}
        goToPrev={goToPrev}
        handleMouseLeave={handleMouseLeave}
        handleMouseMove={handleMouseMove}
        imageSrc={selectedImage}
      />
      {/* <ThumbnailSlider
        sliderImages={images}
        thumbnailStartIndex={thumbnailStartIndex}
        noOfThumbnails={noOfThumbNails}
        selectImage={selectImage}
        goToNext={goToNext}
        goToPrev={goToPrev}
      /> */}
    </div>
  );
};
