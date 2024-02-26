export const ImagePreview = () => {
  return (
    <div style={{ position: "relative" }}>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-[14px] max-h-[500px] overflow-y-scroll">
        {/* {images?.images?.map((item, index) => (
          <Image
            src={item}
            key={index}
            alt="leads_images"
            className="w-full h-auto rounded-lg"
            height={106}
            width={106}
          />
        ))} */}
      </div>
    </div>
  );
};
