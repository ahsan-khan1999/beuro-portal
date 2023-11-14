import { Field } from "@/enums/form";
import { FormField, GenerateAddPostPonedNoteFormField } from "@/types";

export const AddRemarksFormField: GenerateAddPostPonedNoteFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-0 ",
      field: {
        type: Field.textArea,
        className: "!p-4 !border-dark  focus:!border-primary ",
        rows: 5,
        id: "description",
        name: "description",
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
        register,
      },
    },

    {
      containerClass: "mt-5 ",
      field: {
        type: Field.button,
        text: "Next",
        inputType: "submit",
        className: "rounded-lg p-4 w-[174px] text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
