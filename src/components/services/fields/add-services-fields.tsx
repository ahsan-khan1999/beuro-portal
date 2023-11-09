import { Field } from "@/enums/form";
import { FormField, GenerateServicesFormField } from "@/types";

export const servicesAddDetailsFormField: GenerateServicesFormField = (
  register,
  loading,
  onClick
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "flex justify-between items-center gap-3",
        children: [
          {
            containerClass: "w-[65%]",
            label: {
              text: "Service/Product Title",
              htmlFor: "serviceTitle",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "serviceTitle",
              name: "serviceTitle",
              placeholder: "Product Name...",
              register,
            },
          },
          {
            containerClass: "w-[35%]",
            label: {
              text: "Unit",
              htmlFor: "unit",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !!border-borderColor border border-dark focus:!border-primary ",
              inputType: "text",
              id: "unit",
              name: "unit",
              placeholder: "Std. ",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "max-w-[260px]",
      label: {
        text: "Price",
        htmlFor: "price",
        className: "mb-[10px] ",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-dark focus:!border-primary ",
        inputType: "text",
        id: "price",
        name: "price",
        placeholder: "100CHF",
        register,
      },
    },

    {
      containerClass: "mb-0 mt-5",
      label: {
        text: "Description",
        htmlFor: "description",
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-dark focus:!border-primary ",
        rows:4,
        id: "description",
        name: "description",
        placeholder: "Lorem Ipsum, sometimes referred to as 'lipsum'..",
        register,
      },
    },

    {
      containerClass: "mt-[30px]",
      field: {
        type: Field.div,
        className: "flex space-x-[18px] ",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Cancel",
              inputType: "button",
              onClick: onClick,
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              loading,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Save",
              inputType: "submit",
              className:
                "rounded-lg   p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
