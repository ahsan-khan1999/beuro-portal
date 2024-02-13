import { ImageUploadFieldProps } from "@/types";
import React from "react";
import { Controller } from "react-hook-form";
import { ImageUpload } from "./image-upload-field";

export const ImageUploadField = ({
  control,
  id,
  name,
  text,
  fileSupported,
  onClick,
  value,index,
  setValue
}: ImageUploadFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <ImageUpload
          id={id}
          field={field}
          text={text}
          fileSupported={fileSupported}
          onClick={onClick}
          value={value}
          index={index}
          setValue={setValue}
        />
      )}
    />
  );
};
