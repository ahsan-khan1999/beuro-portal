import { Field } from "@/enums/form";
import { FormField, GenerateLeadsFormField } from "@/types";
import Image from "next/image";
import { ComponentsType } from "../add/AddNewLeadsData";

export const AddLeadAdditionalDetailsFormField: GenerateLeadsFormField =
  (register, loading, control, onHandleBack) => {
    const formField: FormField[] = [
      {
        containerClass: "mb-0 mt-6",
        field: {
          type: Field.ckEditor,
          className: "!p-4 !border-dark focus:!border-primary",
          id: "additionalDetails",
          name: "additionalDetails",
          control,
        },
      },

      {
        containerClass: "mt-6",
        field: {
          type: Field.div,
          id: "div-field",
          className: "flex space-x-[18px]",
          children: [
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                id: "button",
                text: "Back",
                inputType: "button",
                onClick: () => onHandleBack && onHandleBack(ComponentsType.serviceEdit),
                className:
                  "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              },
            },
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                id: "button",
                text: "Save",
                inputType: "submit",
                className:
                  "rounded-lg   px-4 w-[152px] h-[50px]  text-white hover:bg-none ",
                loading,
              },
            },
          ],
        },
      },
    ];

    return formField;
  };
