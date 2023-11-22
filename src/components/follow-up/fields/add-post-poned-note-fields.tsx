import { Field } from "@/enums/form";
import { FormField, GeneratePostPondFormField } from "@/types";

export const AddPostPonedFollowUpFormField: GeneratePostPondFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      containerClass: `mb-0`,
      field: {
        type: Field.date,
        className: `!p-4 !border-dark focus:!border-primary`,
        id: "dateTime",
        name: "dateTime",
        value: "12/12/2023",
        register,
        dateType:"datetime-local"

      },
    },

    {
      containerClass: "mt-3 mb-0 ",
      field: {
        type: Field.textArea,
        className: "!p-4 !border-dark  focus:!border-primary ",
        rows: 4,
        id: "postPonedNote",
        name: "postPonedNote",
        placeholder:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
        register,
      },
    },

    {
      containerClass: "mt-5 ",
      field: {
        id:"button",
        type: Field.button,
        text: "Next",
        inputType: "submit",
        className: "rounded-lg px-4 w-[174px] text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
