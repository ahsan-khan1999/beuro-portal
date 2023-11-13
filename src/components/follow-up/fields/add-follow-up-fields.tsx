import { Field } from "@/enums/form";
import { FormField,  GenerateAddPostPonedNoteFormField } from "@/types";

export const PostPonedFollowUpFormField: GenerateAddPostPonedNoteFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      containerClass: `mb-0 `,
      field: {
        type: Field.date,
        className: `!p-4 !border-dark focus:!border-primary `,
        id: "noteMessage",
        name: "noteMessage",
        value: "12/12/2023",
        register,
      },
    },

    {
      containerClass: "mt-3 mb-0 ",
      field: {
        type: Field.textArea,
        className: "!p-4 !border-dark  focus:!border-primary ",
        rows: 4,
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
id:"button",
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
