import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const OfferEditAdditionalDetailsFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control,
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-0",
      label: {
        text: "Choose Form Existing",
        htmlFor: "chooseFromExisting",
        className: "mb-[10px]",
      },
      field: {
        className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
        placeholder: "Please Select Customer",
        type: Field.select,
        id: "chooseFromExisting",
        name: "chooseFromExisting",
        options: [
          {
            value:
              "Office Cleaning Munich Lorem ipsum dollar smith emit typesetting industry Lorem Isum has...",
            label:
              "Office Cleaning Munich Lorem ipsum dollar smith emit typesetting industry Lorem Isum has...",
          },
        ],
        control,
      },
    },
    {
      containerClass: "mt-5",
      label: {
        text: "Add New",
        htmlFor: "additionlData",
        className: "mb-[10px] text-[#4D4D4D]",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-dark focus:!border-primary",
        inputType: "text",
        id: "additionlData",
        name: "additionlData",
        placeholder:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s, when an unknown printer took is galley of type and scrambled it to make a type specimen book. It has survived not only five lorm centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        control,
      },
    },

    {
      containerClass: "mt-[30px] mb-0",
      field: {
        type: Field.button,
        text: "Save",
        inputType: "submit",
        className:
          "rounded-lg p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
