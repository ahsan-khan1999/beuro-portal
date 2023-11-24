import { Field } from "@/enums/form";
import { FormField, GenerateServicesFormField } from "@/types";

export const servicesDetailsFormField: GenerateServicesFormField = (
  register,
  loading,
  isUpdate,
  handleUpdateCancel
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-3 gap-x-3",
        children: [
          {
            containerClass: "col-span-2 mb-0",
            label: {
              text: "Service/Product Title",
              htmlFor: "serviceName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: `!p-4 !border-dark ${!isUpdate && "!border-light"
                } focus:!border-primary `,
              inputType: "text",
              id: "serviceName",
              name: "serviceName",
              placeholder: "Product Name...",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "col-span-1 mb-0",
            label: {
              text: "Unit",
              htmlFor: "unit",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !!border-borderColor border border-dark focus:!border-primary ",
              inputType: "number",
              id: "unit",
              name: "unit",
              placeholder: "Std. ",
              register,
              disabled: isUpdate,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-3",
        children: [
          {
            containerClass: "col-span-1 mb-0",
            label: {
              text: "Price",
              htmlFor: "price",
              className: "mb-[10px] ",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "number",
              id: "price",
              name: "price",
              placeholder: "100CHF",
              register,
              disabled: isUpdate,
            },
          },
        ],
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
        rows: 4,
        id: "description",
        name: "description",
        placeholder: "Lorem Ipsum, sometimes referred to as 'lipsum'..",
        register,
        disabled: isUpdate,
      },
    },

    {
      containerClass: "mt-[30px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex space-x-[18px] ",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: "Cancel",
              inputType: "button",
              onClick: handleUpdateCancel,
              className: `rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none ${isUpdate && "hidden"
                }`,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: "Save Changes",
              inputType: "submit",
              className: `rounded-lg   px-4 w-[152px] h-[50px]  text-white hover:bg-none ${isUpdate && "hidden"
                }`,
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
