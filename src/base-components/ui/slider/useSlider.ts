import { ImageSliderHook, SliderImagesDataProps } from "@/types";
import { useState } from "react";

export const useSlider = ({
  images,
  noOfThumbNails,
  activeIndex,
}: SliderImagesDataProps): ImageSliderHook => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex || 0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const selectedImage = images[currentIndex]?.imageSrc;
  const moveThumbnails = (direction: "left" | "right") => {
    if (direction === "left") {
      setThumbnailStartIndex(Math.max(0, thumbnailStartIndex - 1));
    } else {
      if (thumbnailStartIndex < images.length - noOfThumbNails) {
        setThumbnailStartIndex(thumbnailStartIndex + 1);
      }
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      moveThumbnails("right");
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      moveThumbnails("left");
    }
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);

    const centerPosition = Math.floor(noOfThumbNails / 2);
    let newStartIndex = Math.max(0, index - centerPosition);

    // Make sure there are enough images to fill the remaining slots
    if (index > images.length - centerPosition - 1) {
      newStartIndex = images.length - noOfThumbNails;
    }

    setThumbnailStartIndex(newStartIndex);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el =
      event.currentTarget.querySelector<HTMLImageElement>("#mainImage");
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Relative position of the mouse within the container (from 0 to 1)
    const relativeX = x / rect.width;
    const relativeY = y / rect.height;

    // Maximum translation (considering the scale factor of 1.5)
    const maxTranslateX = (1.5 * rect.width - rect.width) / 2;
    const maxTranslateY = (1.5 * rect.height - rect.height) / 2;

    // Calculate the translation based on the relative mouse position, but invert the direction
    let translateX = maxTranslateX * (0.5 - relativeX) * 1;
    let translateY = maxTranslateY * (0.5 - relativeY) * 1;

    // Set limits on the translation values
    translateX = Math.min(Math.max(translateX, -maxTranslateX), maxTranslateX);
    translateY = Math.min(Math.max(translateY, -maxTranslateY), maxTranslateY);

    el.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const el =
      event.currentTarget.querySelector<HTMLImageElement>("#mainImage");
    if (el) el.style.transform = "scale(1)";
  };

  return {
    selectedImage,
    thumbnailStartIndex,
    goToNext,
    goToPrev,
    selectImage,
    handleMouseLeave,
    handleMouseMove,
    isFirst: currentIndex === 0,
    isLast: currentIndex === images.length - 1,
  };
};
