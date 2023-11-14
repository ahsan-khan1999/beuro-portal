import { Field } from "@/enums/form";
import { FormField, GenerateOffersFormField } from "@/types";

export const ServiceEditDetailsFormField: GenerateOffersFormField = (
  register,
  loading
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
id:"div-field",
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Service Name",
              htmlFor: "serviceName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "serviceName",
              name: "serviceName",
              placeholder: "Versicherung  Lorem Ipsum",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Price",
              htmlFor: "price",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "price",
              name: "price",
              placeholder: "1000 CHF",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Unit",
              htmlFor: "unit",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "unit",
              name: "unit",
              placeholder: "Loreipsum",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5 border-b border-black border-opacity-20 pb-[35px]",
      field: {
        type: Field.div,
id:"div-field",
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0 col-span-1",
            field: {
              type: Field.div,
id:"div-field",
              className: "mb-0 grid grid-cols-3 gap-3",
              children: [
                {
                  containerClass: "mb-0 col-span-1",
                  label: {
                    text: "Count",
                    htmlFor: "count",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-dark focus:!border-primary ",
                    inputType: "number",
                    id: "count",
                    name: "count",
                    placeholder: "10",
                    register,
                  },
                },
                {
                  containerClass: "mb-0 col-span-2",
                  label: {
                    text: "Total Price",
                    htmlFor: "totalPrice",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-dark focus:!border-primary ",
                    inputType: "text",
                    id: "totalPrice",
                    name: "totalPrice",
                    placeholder: "10000 CHF",
                    register,
                  },
                },
              ],
            },
          },
          {
            containerClass: "mb-0 col-span-2",
            label: {
              text: "Description",
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "description",
              name: "description",
              placeholder:
                "Kostenübernahme bei Lorem Ipsum dollar smith emit lorem.....",
              register,
            },
          },
        ],
      },
    },

    // second time start here
    {
      containerClass: "mt-[30px]",
      field: {
        type: Field.div,
id:"div-field",
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Service Name",
              htmlFor: "servcieName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "servcieName",
              name: "servcieName",
              placeholder: "Versicherung  Lorem Ipsum",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Price",
              htmlFor: "price",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "price",
              name: "price",
              placeholder: "1000 CHF",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Unit",
              htmlFor: "unit",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "unit",
              name: "unit",
              placeholder: "Loreipsum",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5 border-b border-black border-opacity-20 pb-[35px]",
      field: {
        type: Field.div,
id:"div-field",
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0 col-span-1",
            field: {
              type: Field.div,
id:"div-field",
              className: "mb-0 grid grid-cols-3 gap-3",
              children: [
                {
                  containerClass: "mb-0 col-span-1",
                  label: {
                    text: "Count",
                    htmlFor: "count",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-dark focus:!border-primary ",
                    inputType: "number",
                    id: "count",
                    name: "count",
                    placeholder: "10",
                    register,
                  },
                },
                {
                  containerClass: "mb-0 col-span-2",
                  label: {
                    text: "Total Price",
                    htmlFor: "totalPrice",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-dark focus:!border-primary ",
                    inputType: "text",
                    id: "totalPrice",
                    name: "totalPrice",
                    placeholder: "10000 CHF",
                    register,
                  },
                },
              ],
            },
          },
          {
            containerClass: "mb-0 col-span-2",
            label: {
              text: "Description",
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "description",
              name: "description",
              placeholder:
                "Kostenübernahme bei Lorem Ipsum dollar smith emit lorem.....",
              register,
            },
          },
        ],
      },
    },

    // description field is here
    {
      containerClass: "mt-[30px]",
      field: {
        type: Field.div,
id:"div-field",
        className: "grid grid-cols-2 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Discount Description",
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.textArea,
              className: "!p-4 !border-dark focus:!border-primary ",
              rows: 4,
              id: "description",
              name: "description",
              placeholder:
                "Lorem Ipsum is simply dummy text of the isp ispu printing and typesetting industry. Lorem Ipsum ie has  a been the industry's standard dummyalesl...",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-[30px]",
      field: {
        type: Field.button,
id:"button",
        text: "Save",
        inputType: "submit",
        className:
          "rounded-lg   p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
