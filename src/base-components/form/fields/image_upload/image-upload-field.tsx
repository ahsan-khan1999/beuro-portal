import Image from "next/image";
import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import fileUploadIcon from "@/assets/svgs/file_uplaod.svg";
import imgDelete from "@/assets/svgs/img_delete.svg";

export const ImageUpload = ({
  id,
  field,
  text,
  fileSupported,
  onClick,
}: {
  id: string;
  field: ControllerRenderProps<FieldValues, string>;
  text?: string;
  fileSupported?: string;
  onClick?: Function;
}) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setUploadedImages([...uploadedImages, file.name]);
      field.onChange(file.name);
    }
  };

  const deleteImage = (index: number) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {uploadedImages.map((item, index) => (
        <div className="relative cursor-pointer" key={index}>
          <Image
            src={item}
            alt={`img${index}`}
            width={100}
            height={100}
            onClick={() => {
              onClick && onClick();
            }}
          />
          <Image
            src={imgDelete}
            alt="imgDelete"
            className="absolute top-[5px] right-[5px] "
            onClick={() => deleteImage(index)}
          />
        </div>
      ))}

      <div className="col-span-1">
        <label htmlFor={id}>
          <div className="flex flex-col items-center border border-[#8F8F8F] border-dashed rounded-lg w-full h-auto cursor-pointer px-[25px] pt-6 pb-3">
            <Image src={fileUploadIcon} alt="fileUploadIcon" />
            <span className="text-[#4B4B4B] text-center font-medium text-[10px] mt-3 mb-2">
              {text}
            </span>
            <span className="text-[#8F8F8F] font-normal text-[12px]">
              {fileSupported}
            </span>
            <input
              id={id}
              type="file"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        </label>
      </div>
    </div>
  );
};
