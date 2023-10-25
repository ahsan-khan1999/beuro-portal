import { DragAndDropPdfFieldProps } from "@/types";
import React from "react";
import { Controller } from "react-hook-form";
import { PdfFileUpload } from "./file-drag-and-drop-field";

export const DragAndDropPdfField = ({
  control,
  id,
  name,
}: DragAndDropPdfFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <PdfFileUpload id={id} field={field} />
      )}
    />
  );
};
