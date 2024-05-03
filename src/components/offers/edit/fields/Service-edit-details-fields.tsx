import { Field } from "@/enums/form";
import { FormField, GenerateOffersFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const ServiceEditDetailsFormField: GenerateOffersFormField = (
  register,
  loading
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 2xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.service_details.service_name")}`,
              htmlFor: "serviceName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "serviceName",
              name: "serviceName",
              placeholder: "",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "offers.service_details.detail_headings.price"
              )}`,
              htmlFor: "price",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
              text: `${translate(
                "offers.service_details.detail_headings.unit"
              )}`,
              htmlFor: "unit",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
      containerClass: "mt-5 border-b border-black border-opacity-10 pb-[35px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 2xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0 2xl:col-span-1",
            field: {
              type: Field.div,
              id: "div-field",
              className: "mb-0 grid grid-cols-2 2xl:grid-cols-3 gap-3",
              children: [
                {
                  containerClass: "mb-0 2xl:col-span-1",
                  label: {
                    text: `${translate(
                      "offers.service_details.detail_headings.unit"
                    )}`,
                    htmlFor: "count",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                    inputType: "number",
                    id: "count",
                    name: "count",
                    placeholder: "10",
                    register,
                  },
                },
                {
                  containerClass: "mb-0 2xl:col-span-2",
                  label: {
                    text: `${translate(
                      "offers.service_details.detail_headings.total_price"
                    )}`,
                    htmlFor: "totalPrice",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
            containerClass: "mb-0 2xl:col-span-2",
            label: {
              text: `${translate(
                "offers.service_details.detail_headings.description"
              )}`,
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "description",
              name: "description",
              placeholder: "",
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
        id: "div-field",
        className: "grid grid-cols-2 2xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.service_details.service_name")}`,
              htmlFor: "servcieName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "servcieName",
              name: "servcieName",
              placeholder: "",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "offers.service_details.detail_headings.price"
              )}`,
              htmlFor: "price",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
              text: `${translate(
                "offers.service_details.detail_headings.unit"
              )}`,
              htmlFor: "unit",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "unit",
              name: "unit",
              placeholder: "",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5 border-b border-black border-opacity-10 pb-[35px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 2xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0 2xl:col-span-1",
            field: {
              type: Field.div,
              id: "div-field",
              className: "mb-0 grid grid-cols-2 2xl:grid-cols-3 gap-3",
              children: [
                {
                  containerClass: "mb-0 2xl:col-span-1",
                  label: {
                    text: `${translate(
                      "offers.service_details.detail_headings.unit"
                    )}`,
                    htmlFor: "count",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
                    inputType: "number",
                    id: "count",
                    name: "count",
                    placeholder: "10",
                    register,
                  },
                },
                {
                  containerClass: "mb-0 2xl:col-span-2",
                  label: {
                    text: `${translate(
                      "offers.service_details.detail_headings.total_price"
                    )}`,
                    htmlFor: "totalPrice",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
            containerClass: "mb-0 2xl:col-span-2",
            label: {
              text: `${translate(
                "offers.service_details.detail_headings.description"
              )}`,
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "description",
              name: "description",
              placeholder: "",
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
        id: "div-field",
        className: "grid grid-cols-1 2xl:grid-cols-2 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "offers.service_details.discount_description"
              )}`,
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.textArea,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              rows: 2,
              id: "description",
              name: "description",
              placeholder: "",
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
        id: "button",
        text: `${translate("offers.service_details.save_button")}`,
        inputType: "submit",
        className:
          "rounded-lg p-4 w-[152px] h-[50px] text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
