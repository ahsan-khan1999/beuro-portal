import { Field } from "@/enums/form";
import { FormField, GenerateLeadsFormField } from "@/types";

export const LeadAdditionalDetailsFormField: GenerateLeadsFormField = (
  register,
  loading,
  control,
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-0",
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-dark focus:!border-primary",
        id: "additionlData",
        name: "additionlData",
        control,
      },
    },

    {
      field: {
        type: Field.div,
        className: "flex space-x-[18px] mt-[30px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Cancel",
              inputType: "button",
              // onClick: () => setCurrentFormStage("locationDetails"),
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              loading,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Save Changes",
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
