import { Field } from "@/enums/form";
import { FormField, GenerateOffersFormField } from "@/types";

export const OfferEditAdditionalDetailsFormField: GenerateOffersFormField = (
  register,
  loading,
  control
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
        className: "!p-4  !border-dark  focus:!border-primary ",
        type: Field.select,
        value:
          "Office Cleaning Munich Lorem ipsum dollar smith emit typesetting industry Lorem Isum has...",
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
      containerClass: "mt-[30px] mb-0",
      field: {
        type: Field.button,
id:"button",
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
