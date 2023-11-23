import { Field } from "@/enums/form";
import { FormField, GenerateLeadsAdditionalDetailsFormField, GenerateLeadsFormField } from "@/types";

export const LeadAdditionalDetailsFormField: GenerateLeadsAdditionalDetailsFormField = (
  loading,
  control,
  onClick,
  leadDetails
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-0 mt-6",
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-dark focus:!border-primary",
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
              text: "Cancel",
              inputType: "button",

              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              onClick: onClick
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: "Save Changes",
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
