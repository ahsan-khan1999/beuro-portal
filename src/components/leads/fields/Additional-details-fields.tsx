import { Field } from "@/enums/form";
import { FormField, GenerateLeadsAdditionalDetailsFormField, GenerateLeadsFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const LeadAdditionalDetailsFormField: GenerateLeadsAdditionalDetailsFormField = (
  loading,
  control,
  onClick,
  leadDetails
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0 mt-6",
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        id: "additionalDetails",
        name: "additionalDetails",
        control,
        value: leadDetails?.id && leadDetails?.additionalDetails

      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex space-x-[18px] mt-[30px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("leads.additional.cancel_button")}`,
              inputType: "button",

              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              onClick: onClick,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("leads.additional.save_changes_button")}`,
              inputType: "submit",
              className:
                "rounded-lg px-4 w-[152px] h-[50px]  text-white hover:bg-none ",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
