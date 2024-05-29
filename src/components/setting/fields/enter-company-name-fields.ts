import { Field } from "@/enums/form";
import { FormField, GenerateEnterCompanyNameFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const EnterCompanyNameFormField: GenerateEnterCompanyNameFormField = (
  register,
  loading,
  control,
  onClick
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
      label: {
        text: `${translate("common.enter_company")}`,
        htmlFor: "companyName",
        className: "mb-[10px] text-center",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        inputType: "text",
        id: "companyName",
        name: "companyName",
        register,
      },
    },

    {
      containerClass: "mt-10",
      field: {
        className: "flex items-center gap-x-[18px]",
        type: Field.div,
        id: "div-field",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("common.are_you_sure_modal.cancel_button")}`,
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[174px] h-[50px] text-dark hover-bg-none",
              onClick: onClick && onClick,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("common.are_you_sure_modal.confirm_button")}`,
              inputType: "submit",
              className:
                "rounded-lg px-4 w-[174px] h-[50px] text-white hover-bg-none",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
