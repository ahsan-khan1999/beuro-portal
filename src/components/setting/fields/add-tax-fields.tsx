import { Field } from "@/enums/form";
import { FormField, GenerateAddTaxFormField } from "@/types";

export const addTaxFormField: GenerateAddTaxFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      containerClass: " mb-0",
      label: {
        text: " Name",
        htmlFor: "name",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-dark focus:!border-primary ",
        inputType: "text",
        id: "name",
        name: "name",
        placeholder: " ",
        register,
      },
    },
    {
      containerClass: "mt-5 mb-0",
      label: {
        text: " Tax Rate (%)",
        htmlFor: "taxRate",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-dark focus:!border-primary ",
        inputType: "text",
        id: "taxRate",
        name: "taxRate",
        placeholder: " ",
        register,
      },
    },

    {
      containerClass: "mb-0 mt-[48px]",
      field: {
        type: Field.button,
        text: "Add Tax",
        inputType: "submit",
        className: "rounded-lg  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
