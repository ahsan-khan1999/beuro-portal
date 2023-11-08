import { Field } from "@/enums/form";
import { FormField, GenerateOffersFormField } from "@/types";

export const AddOfferAdditionalDetailsFormField: GenerateOffersFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-0 ",
      label: {
        text: "Choose Form Existing",
        htmlFor: "chooseFromExisting",
        className: "mb-[10px]",
      },

      field: {
        className: "!p-4 !border-dark focus:!border-primary ",
        type: Field.select,
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has...",
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
        id: "additionlData",
        name: "additionlData",

        control,
      },
    },

    {
      containerClass: "mb-0 mt-[30px]",
      field: {
        type: Field.button,
        text: "Save",
        inputType: "submit",
        className:
          "rounded-lg bg-[#4A13E7] p-4  w-[152px] h-[50px] text-white hover-bg-none",
        loading,
      },
    },
  ];

  return formField;
};
