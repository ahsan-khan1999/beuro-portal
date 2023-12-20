import { uploadFileToFirebase } from "@/api/slices/globalSlice/global";
// import { FileUploadIcon } from "@/assets/svgs/components/file-upload-icon";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Image from "next/image";
import { useState, useEffect, useMemo } from 'react';
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import uploadIcon from "@/assets/svgs/file-uploader.svg";

export const ImageFileUpload = ({
  id,
  field,
  value
}: {
  id: string;
  field: ControllerRenderProps<FieldValues, string>;
  value?: string
}) => {
  const dispatch = useAppDispatch();
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const formdata = new FormData();

    const file = e.dataTransfer.files[0];
    formdata.append("file", file);
    const res = await dispatch(uploadFileToFirebase(formdata));
    field.onChange(res?.payload);
  };

  const handleFileSelected = async (e: any) => {
    const formdata = new FormData();
    const file = e.target.files[0];

    formdata.append("file", file);
    const res = await dispatch(uploadFileToFirebase(formdata));

    field.onChange(res?.payload);
  };

  return (
    <label
      htmlFor={id}
      className="flex flex-col items-center justify-center
         border border-primary border-dashed rounded-lg 
        cursor-pointer bg-gray-50
        hover:bg-gray-100"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center w-full">
        {field.value ? (
          <Image
            src={field.value}
            key={Math.random()}
            width={300}
            height={148}
            alt="Uploaded Preview"
            style={{
              width: "100%",
              height: 148,
            }}
          />
        ) : (
          // <FileUploadIcon />
          ""
        )}
        {!field.value && (
          <div className="flex items-center">
            <div className="py-[10px] px-[14px]">
              <Image src={uploadIcon} alt="Uploader Icon" className="" />
            </div>

            <p className="text-sm text-primary py-[10px] px-[14px] ">
              Drag your logo here
            </p>
          </div>
        )}
      </div>

      <input
        id={id}
        type="file"
        className="hidden"
        onChange={handleFileSelected}
        key={value}
      />
    </label>
  );
};
