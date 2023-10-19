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
        inputType: "text",
        id: "noteMessage",
        name: "noteMessage",
        placeholder:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s, when an unknown printer took is galley of type and scrambled it to make a type specimen book. It has survived not only five lorm centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
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
