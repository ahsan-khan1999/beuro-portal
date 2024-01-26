import { Field } from "@/enums/form";
import { FormField, GenerateServicesFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const servicesDetailsFormField: GenerateServicesFormField = (
  register,
  loading,
  isUpdate,
  handleUpdateCancel
) => {
  const { t: translate } = useTranslation();
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
              text: `${translate("services.detail.title")}`,
              htmlFor: "serviceName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: `!p-4 !border-[#BFBFBF] ${
                !isUpdate && "!border-light"
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
              text: `${translate("services.detail.unit")}`,
              htmlFor: "unit",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !!border-borderColor border border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
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
              text: `${translate("services.detail.price")}`,
              htmlFor: "price",
              className: "mb-[10px] ",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "number",
              id: "price",
              name: "price",
              placeholder: "100CHF",
              register,
              disabled: isUpdate,
              step: "0.01",
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-5",
      label: {
        text: `${translate("services.detail.description")}`,
        htmlFor: "description",
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
        rows: 2,
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
        className: "flex items-center justify-end space-x-[18px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("services.detail.cancel_button")}`,
              inputType: "button",
              onClick: handleUpdateCancel,
              className: `rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px] text-dark hover:bg-none ${
                isUpdate && "hidden"
              }`,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("services.detail.save_changes_button")}`,
              inputType: "submit",
              className: `rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none ${
                isUpdate && "hidden"
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
