import { Field } from "@/enums/form";
import { FormField, ImageUploadFormFieldType } from "@/types";

export const ImageUploadFormField: ImageUploadFormFieldType = (register,control,onClick) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.imageUploadField,
        id: "upload_image",
        text: "Drop or Attach your files here",
        name: "upload_image",
        control,
        onClick: onClick
      },
    },
  ];

  return formField;
};
