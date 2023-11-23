import { Field } from "@/enums/form";
import { FormField, GenerateNotesFormField } from "@/types";

export const AddNoteFormField: GenerateNotesFormField = (
  register,
  loading,
  control,
  onClick
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-0",
      label: {
        text: "Add your Note",
        htmlFor: "description",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-dark focus:!border-primary",
        id: "description",
        name: "description",

        control,
      },
    },

    {
      containerClass: "my-[30px] ",
      field: {
        type: Field.button,
id:"button",
        text: "Save",
        inputType: "submit",
        className:
          "rounded-lg  w-[200px] px-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
        
      },
    },
  ];

  return formField;
};
