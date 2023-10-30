import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";
import Image from "next/image";

export const AddLeadAdditionalDetailsFormField: GenerateRegistrationFormField =
  (register, loading, control, setCurrentFormStage) => {
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
        containerClass: "mt-6",
        field: {
          type: Field.div,
          className: "flex space-x-[18px]",
          children: [
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                text: "Back",
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
                text: "Save",
                inputType: "submit",
                className:
                  "rounded-lg   p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
                loading,
              },
            },
          ],
        },
      },
    ];

    return formField;
  };
