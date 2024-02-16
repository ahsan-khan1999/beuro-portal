import { useSlider } from "./useSlider";
import { SliderImagesDataProps } from "@/types";
import { MainImageSlider } from "./main-image-slider";
import { ThumbnailSlider } from "./thumbnail-slider";
import { combineClasses, getFileNameFromUrl } from "@/utils/utility";
import { DownloadIcon } from "@/assets/svgs/components/download-icon";

export const Slider = ({
  images,
  noOfThumbNails,
  containerClasses,
  mainImgSliderClasses,
  activeIndex
}: SliderImagesDataProps) => {
  const {
    selectedImage,
    thumbnailStartIndex,
    goToNext,
    goToPrev,
    selectImage,
    handleMouseLeave,
    handleMouseMove,
  } = useSlider({ images, noOfThumbNails, activeIndex });

  const mainSliderContainer = combineClasses(`relative`, containerClasses);
  const downloadImage = (imageUrl:string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = "_blank";
    link.download = imageUrl;
    link.click();
  };
  return (
    <div className={mainSliderContainer}>
      <div className="absolute right-0 -top-12">
        <DownloadIcon onClick={() => {
          downloadImage(selectedImage)
        }} />
      </div>

      <MainImageSlider
        goToNext={goToNext}
        goToPrev={goToPrev}
        handleMouseLeave={handleMouseLeave}
        handleMouseMove={handleMouseMove}
        imageSrc={selectedImage}
        containerClassName={mainImgSliderClasses}
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
