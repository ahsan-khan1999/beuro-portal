import { Field } from "@/enums/form";
import { FormField, GenerateAddTaxFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const addTaxFormField: GenerateAddTaxFormField = (
  register,
  loading,
  control
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex flex-col gap-y-5 rounded-lg px-2 py-3 bg-[#EDF4FF]",
        children: [
          {
            containerClass: " mb-0",
            label: {
              text: `${translate("setting.tax_modal.name")}`,
              htmlFor: "name",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "name",
              name: "name",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("setting.tax_modal.tax_rate")}`,
              htmlFor: "taxRate",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "number",
              id: "taxRate",
              name: "taxRate",
              register,
              step: "0.01",
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-5",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("setting.tax_modal.button")}`,
        inputType: "submit",
        className: "rounded-lg text-white hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
