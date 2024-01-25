import { Field } from "@/enums/form";
import { FormField, GenerateEditDateFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const EditDateFormField: GenerateEditDateFormField = (
  register,
  loading
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "pt-8",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 gap-x-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("common.start_date")}`,
              htmlFor: `startDate`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className:
                "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
              id: `startDate`,
              name: `startDate`,
              register,
              dateType: "date",
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("common.end_date")}`,
              htmlFor: `endDate`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className:
                "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
              id: `endDate`,
              name: `endDate`,
              register,
              dateType: "date",
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-6 pb-8 float-right",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("content.details.save_changes_button")}`,
        inputType: "submit",
        className:
          "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
