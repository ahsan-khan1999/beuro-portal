import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";
import Image from "next/image";

export const AddLeadAdditionalDetailsFormField: GenerateRegistrationFormField =
  (register, loading, control, setCurrentFormStage) => {
    const formField: FormField[] = [
      {
        field: {
          type: Field.div,
          className: "w-full",
          children: [
            {
              containerClass: "mb-0",
              field: {
                type: Field.input,
                img: true,
                className: "!p-4 !border-dark focus:!border-primary mb-0",
                inputType: "text",
                id: "additionlData",
                name: "additionlData",
                placeholder:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s, when an unknown printer took is galley of type and scrambled it to make a type specimen book. It has survived not only five lorm centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                register,
              },
            },
          ],
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
