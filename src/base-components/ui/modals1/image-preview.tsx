import Image from "next/image";
import { useState } from "react";
import { Slider } from "../slider/slider";

export const ImagePreview = ({ images }: { images: string[] }) => {
  const [isZoomed, setIsZoomed] = useState({
    zoomed: false,
    currentImage: "",
    sliderImageData: [],
    currentIndex: 0,
  });

  const toggleZoom = (image: string, index: number) => {
    const imageList = [
      { imageSrc: image },
      ...images?.map((item) => ({ imageSrc: item })),
    ] as unknown[];
    setIsZoomed({
      zoomed: !isZoomed.zoomed,
      currentImage: image,
      sliderImageData: imageList as never[],
      currentIndex: ++index,
    });
  };

  const SLIDER_IMAGES_DATA = {
    noOfThumbNails: 8,
    images: images?.map((item) => ({ imageSrc: item })),
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-[14px] max-h-[250px] overflow-y-scroll">
        {images?.map((item, index) => (
          <Image
            src={item}
            key={index}
            width={100}
            height={100}
            alt="Uploaded Preview"
            style={{ height: "80px", width: "80px" }}
            onClick={() => toggleZoom(item, index)}
            className="cursor-pointer"
          />
        ))}
      </div>

      {isZoomed.zoomed && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() =>
            toggleZoom(isZoomed.currentImage, isZoomed.currentIndex)
          }
        >
          <Slider
            {...SLIDER_IMAGES_DATA}
            images={isZoomed?.sliderImageData}
            activeIndex={isZoomed?.currentIndex}
            containerClasses="w-[80%]"
            mainImgSliderClasses="w-full h-[615px]"
          />
        </div>
      )}
    </div>
  );
};
