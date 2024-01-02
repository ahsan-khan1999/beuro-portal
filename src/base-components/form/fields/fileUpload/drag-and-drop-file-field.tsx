import { DragAndDropFileFieldProps } from "@/types";
import React from "react";
import { Controller } from "react-hook-form";
import { ImageFileUpload } from "./custom-drag-and-drop-file-field";

export const DragAndDropFileField = ({
  control,
  id,
  name,
  value
}: DragAndDropFileFieldProps) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <ImageFileUpload id={id} field={field} value={value}/>
        )
      }}
    />
  );
};
