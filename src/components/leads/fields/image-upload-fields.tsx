import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const ImageUploadFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control,
  handleImageSlider
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.imageUploadField,
        id: "upload_image",
        text: "Drop or Attach your files here",
        name: "upload_image",
        control,
        onClick: handleImageSlider
      },
    },
  ];

  return formField;
};
