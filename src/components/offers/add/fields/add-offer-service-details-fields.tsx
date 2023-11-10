import { Field } from "@/enums/form";
import { FormField, GenerateOffersFormField } from "@/types";

export const AddOfferServiceDetailsFormField: GenerateOffersFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
id:"div-field",
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0 col-span-1",
            label: {
              text: "Service Type",
              htmlFor: "serviceType",
              className: "mb-[10px]",
            },
            field: {
              type: Field.div,
id:"div-field",
              className: "flex flex-col",
              children: [
                {
                  containerClass: "mb-0 pb-[6px]",
                  field: {
                    type: Field.radio,
                    value: "New Service",
                    label: "New Service",
                    id: "serviceType",
                    name: "serviceType",
                    register,
                  },
                },
                // {
                //   containerClass: "mb-0",
                //   field: {
                //     type: Field.radio,
                //     value: "Existing Service",
                //     label: "Existing Service",
                //     id: "serviceType",
                //     name: "serviceType",
                //     register,
                //   },
                // },
              ],
            },
          },
          {
            containerClass: "mb-0 col-span-2",
            label: {
              text: "Service Title/Product",
              htmlFor: "serviceTitle",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4  !border-dark  focus:!border-primary ",
              type: Field.select,
              value: "Versicherung  Lorem Ipsum",
              id: "serviceTitle",
              name: "serviceTitle",
              options: [
                {
                  value: "Versicherung  Lorem Ipsum",
                  label: "Versicherung  Lorem Ipsum",
                },
              ],
              control,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5 ",
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
                  containerClass: "mb-0 col-span-2",
                  label: {
                    text: "Price",
                    htmlFor: "totalPrice",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-dark focus:!border-primary ",
                    inputType: "text",
                    id: "price",
                    name: "price",
                    placeholder: "10000 CHF",
                    register,
                  },
                },
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
              ],
            },
          },
          {
            containerClass: "mb-0 col-span-2",
            field: {
              type: Field.div,
id:"div-field",
              className: "mb-0 grid grid-cols-2 gap-3",
              children: [
                {
                  containerClass: "mb-0 ",
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
                    placeholder: "Std. ",
                    register,
                  },
                },
                {
                  containerClass: "mb-0 ",
                  label: {
                    text: "Total Price",
                    htmlFor: "totalPrice",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-dark focus:!border-primary ",
                    inputType: "number",
                    id: "totalPrice",
                    name: "totalPrice",
                    placeholder: "1000CHF",
                    register,
                  },
                },
              ],
            },
          },
        ],
      },
    },

    {
      containerClass:
        "mt-5 mb-0 border-b border-black border-opacity-20 pb-[35px]",
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
        placeholder:
          "Kostenübernahme bei Lorem Ipsum dollar smith emit lorem.....",
        register,
      },
    },
    // second time start here
    {
      containerClass: "mt-[25px]",
      field: {
        type: Field.div,
id:"div-field",
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0 col-span-1",
            label: {
              text: "Service Type",
              htmlFor: "serviceType",
              className: "mb-[10px]",
            },
            field: {
              type: Field.div,
id:"div-field",
              className: "flex flex-col",
              children: [
                // {
                //   containerClass: "mb-0 pb-[6px]",
                //   field: {
                //     type: Field.radio,
                //     value: "New Service",
                //     label: "New Service",
                //     id: "serviceType",
                //     name: "serviceType",
                //     register,
                //   },
                // },
                // {
                //   containerClass: "mb-0",
                //   field: {
                //     type: Field.radio,
                //     value: "Existing Service",
                //     label: "Existing Service",
                //     id: "serviceType",
                //     name: "serviceType",
                //     register,
                //   },
                // },
              ],
            },
          },
          {
            containerClass: "mb-0 col-span-2",
            label: {
              text: "Service Title/Product",
              htmlFor: "serviceTitle",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4  !border-dark  focus:!border-primary ",
              type: Field.select,
              value: "Versicherung  Lorem Ipsum",
              id: "serviceTitle",
              name: "serviceTitle",
              options: [
                {
                  value: "Versicherung  Lorem Ipsum",
                  label: "Versicherung  Lorem Ipsum",
                },
              ],
              control,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5 ",
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
                  containerClass: "mb-0 col-span-2",
                  label: {
                    text: "Price",
                    htmlFor: "totalPrice",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-dark focus:!border-primary ",
                    inputType: "text",
                    id: "price",
                    name: "price",
                    placeholder: "10000 CHF",
                    register,
                  },
                },
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
              ],
            },
          },
          {
            containerClass: "mb-0 col-span-2",
            field: {
              type: Field.div,
id:"div-field",
              className: "mb-0 grid grid-cols-2 gap-3",
              children: [
                {
                  containerClass: "mb-0 ",
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
                    placeholder: "Std. ",
                    register,
                  },
                },
                {
                  containerClass: "mb-0 ",
                  label: {
                    text: "Total Price",
                    htmlFor: "totalPrice",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-dark focus:!border-primary ",
                    inputType: "number",
                    id: "totalPrice",
                    name: "totalPrice",
                    placeholder: "1000CHF",
                    register,
                  },
                },
              ],
            },
          },
        ],
      },
    },

    {
      containerClass:
        "mt-5 mb-0 border-b border-black border-opacity-20 pb-[35px]",
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
        placeholder:
          "Kostenübernahme bei Lorem Ipsum dollar smith emit lorem.....",
        register,
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
      containerClass: "mt-6",
      field: {
        type: Field.div,
id:"div-field",
        className: "flex items-center space-x-[18px] ",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
id:"button",
              text: "Back",
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              loading,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
id:"button",
              text: "Next",
              inputType: "submit",
              className:
                "rounded-lg p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
