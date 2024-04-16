import { Field } from "@/enums/form";
import {
  FormField,
  GenerateLeadsAdditionalDetailsFormField,
  GenerateLeadsFormField,
} from "@/types";
import { useTranslation } from "next-i18next";

export const LeadAdditionalDetailsFormField: GenerateLeadsAdditionalDetailsFormField =
  (loading, control, onClick, leadDetails) => {
    const { t: translate } = useTranslation();
    const formField: FormField[] = [
      {
        containerClass: "mb-0 mt-3 rounded-lg px-2 py-3 bg-[#EDF4FF]",
        field: {
          type: Field.ckEditor,
          className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
          id: "additionalDetails",
          name: "additionalDetails",
          control,
          value: leadDetails?.id && leadDetails?.additionalDetails,
        },
      },

      {
        field: {
          type: Field.div,
          id: "div-field",
          className: "flex items-center justify-end space-x-[18px] my-[30px]",
          children: [
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                id: "button",
                text: `${translate("leads.additional.cancel_button")}`,
                inputType: "button",

                className:
                  "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px] text-dark hover:bg-none",
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
                  "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none ",
                loading,
              },
            },
          ],
        },
      },
    ];

    return formField;
  };
