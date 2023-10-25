import { DragAndDropFileFieldProps } from "@/types";
import React from "react";
import { Controller } from "react-hook-form";
import { ImageFileUpload } from "./file-drag-and-drop-field";

export const DragAndDropFileField = ({
  control,
  id,
  name,
}: DragAndDropFileFieldProps) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: {error} }) => (
        <ImageFileUpload id={id} field={field} />
      )}
    />
  );
};
