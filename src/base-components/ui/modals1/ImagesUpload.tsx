import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import img1 from "@/assets/pngs/leads_detail_img1.png";
import img2 from "@/assets/pngs/leads_detail_img2.png";
import img3 from "@/assets/pngs/leads_detail_img3.png";
import img4 from "@/assets/pngs/leads_detail_img4.png";
import img5 from "@/assets/pngs/leads_detail_img1.png";
import img6 from "@/assets/pngs/leads_detail_img2.png";
import img7 from "@/assets/pngs/leads_detail_img3.png";
import img8 from "@/assets/pngs/leads_detail_img4.png";
import img9 from "@/assets/pngs/leads_detail_img3.png";
import img10 from "@/assets/pngs/leads_detail_img4.png";
import img11 from "@/assets/pngs/leads_detail_img1.png";
import imgDelete from "@/assets/svgs/img_delete.svg";
import { useUploadImage } from "@/hooks/modals/useUploadImage";

const ImagesUpload = ({ onClose }: { onClose: () => void }) => {
  const { fields, control, onSubmit, handleSubmit, errors, error } =
    useUploadImage();

  const static_images: StaticImageData[] = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
  ];

  const [images, setImages] = useState(static_images);

  const deleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    console.log("clicked!");
    setImages(updatedImages);
    console.log("Updated Images:", updatedImages);
  };

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[624px] min-h-auto max-h-fit"
      >
        <div className="relative flex flex-col px-[26px] pt-5 pb-[36px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <div className="flex justify-between items-center mb-5 ">
            <p className="text-[24px] leading-6 font-medium text-[#000]">
              Images
            </p>
          </div>
          <hr className="opacity-10 " />

          <div className="flex flex-col gap-y-2 mt-5">
            <h2 className="text-base font-medium text-[#393939]">
              7 images uploaded
            </h2>
            <p className="text-xs font-normal text-[#8F8F8F]">
              Images should be max 20, file size up to 10MB.
            </p>
          </div>

          <section className="mt-4 grid grid-cols-4 gap-3">
            {images.map((item, index) => (
              <div className="relative" key={index}>
                <Image
                  src={item}
                  alt={`img${index}`}
                  className="w-full"
                />
                <Image
                  src={imgDelete}
                  alt="imgDelete"
                  className="absolute top-[5px] right-[5px] cursor-pointer"
                  onClick={() => deleteImage(index)}
                />
              </div>
            ))}
            <Form
              formFields={fields}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
            />
          </section>
        </div>
      </BaseModal>
    </>
  );
};

export default ImagesUpload;
