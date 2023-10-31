import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const ImageUploadFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control,
  setCurrentFormStage
) => {
  const formField: FormField[] = [
    {
      containerClass:"",
      field: {
        type: Field.dragAndDropPdfField,
        id: "upload_image",
        text: "Drop or Attach your files here",
        name: "upload_image",
        control,
      },
    },
  ];

  return formField;
};
