import { Field } from "@/enums/form";
import { FormField,  GenerateFollowUpFormField } from "@/types";

export const AddPostPonedFollowUpFormField: GenerateFollowUpFormField = (
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
        id: "date",
        name: "date",
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
        id: "detail",
        name: "detail",
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
        className: "rounded-lg p-4 w-[174px] text-white hover:bg-none ",
        loading,
        id:"Next"
      },
    },
  ];

  return formField;
};
