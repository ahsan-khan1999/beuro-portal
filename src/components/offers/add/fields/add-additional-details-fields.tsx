import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const AddOfferAdditionalDetailsFormField: GenerateRegistrationFormField =
  (register, loading, control, setCurrentFormStage) => {
    const formField: FormField[] = [
      {
        containerClass: "mb-0",
        label: {
          text: "Choose Form Existing",
          htmlFor: "chooseFromExisting",
          className: "mb-[10px]",
        },
        field: {
          className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
          type: Field.select,
          id: "chooseFromExisting",
          name: "chooseFromExisting",
          options: [
            {
              value:
                "Office Cleaning Munich Lorem ipsum dollar smith emit typesetting industry Lorem Isum has...",
              label:
                "Office Cleaning Munich Lorem ipsum dollar smith emit typesetting industry Lorem Isum has...",
            },
          ],
          control,
        },
      },
      {
        containerClass: "mt-5",
        label: {
          text: "Add New",
          htmlFor: "additionlData",
          className: "mb-[10px] text-[#4D4D4D]",
        },
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
                text: "Back",
                inputType: "submit",
                className:
                  "rounded-lg  border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px] text-black",
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
                  "rounded-lg bg-[#4A13E7] p-4  w-[152px] h-[50px] text-white hover-bg-none",
                loading,
              },
            },
          ],
        },
      },
    ];

    return formField;
  };
