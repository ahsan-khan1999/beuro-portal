import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const AddNoteFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control,
  setCurrentFormStage
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-0",
      label: {
        text: "Add your Note",
        htmlFor: "noteMessage",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-dark focus:!border-primary",
        id: "noteMessage",
        name: "noteMessage",
        
        control,
      },
    },

    {
      containerClass: "my-[30px] ",
      field: {
        type: Field.button,
        text: "Save",
        inputType: "submit",
        className:
          "rounded-lg  w-[200px] p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
