import { Field } from "@/enums/form";
import { FormField, GenerateLeadsAdditionalDetailsFormField } from "@/types";
import { useTranslation } from "next-i18next";
import { ComponentsType } from "../add/AddNewLeadsData";

export const AddLeadAdditionalDetailsFormField: GenerateLeadsAdditionalDetailsFormField =
  (loading, control, onHandleBack, leadDetails) => {
    const { t: translate } = useTranslation();
    const formField: FormField[] = [
      {
        containerClass: "mb-0 rounded-lg px-2 py-3 bg-[#EDF4FF]",
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
        containerClass: "my-[30px]",
        field: {
          type: Field.div,
          id: "div-field",
          className: "flex justify-end items-center space-x-[18px]",
          children: [
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                id: "button",
                text: translate("leads.address_details.back_button"),
                inputType: "button",
                onClick: () =>
                  onHandleBack && onHandleBack(ComponentsType.serviceAdd),
                className:
                  "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px] text-dark hover:bg-none",
              },
            },
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                id: "button",
                text: translate("leads.additional.save_button"),
                inputType: "submit",
                className:
                  "rounded-lg px-4 w-[152px] h-[50px] text-white hover:bg-none",
                loading,
              },
            },
          ],
        },
      },
    ];

    return formField;
  };
