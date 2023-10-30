import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const EditConfirmationContentDetailsFormField: GenerateRegistrationFormField =
  (register, loading, control) => {
    const formField: FormField[] = [
      {
        containerClass: "mb-0",
        label: {
          text: "Confirmation Title",
          htmlFor: "confirmationTitle",
          className: "mb-[10px]",
        },
        field: {
          type: Field.input,
          className: "!p-4 !border-dark focus:!border-primary ",
          inputType: "text",
          id: "confirmationTitle",
          name: "confirmationTitle",
          placeholder: "Text for Confirmation",
          register,
        },
      },
      {
        containerClass: "mb-0 mt-5",
        label: {
          text: "Confirmation Description",
          htmlFor: "confirmationDescription",
          className: "mb-[10px]",
        },
        field: {
          type: Field.ckEditor,
          className: "!p-4 !border-dark focus:!border-primary ",
          id: "confirmationDescription",
          name: "confirmationDescription",
          
          control,
        },
      },

      {
        containerClass: "mb-0 mt-5",
        label: {
          text: "Email Body",
          htmlFor: "emailBody",
          className: "mb-[10px]",
        },
        field: {
          type: Field.ckEditor,
          className: "!p-4 !border-dark focus:!border-primary ",
          id: "emailBody",
          name: "emailBody",
         
          control,
        },
      },

      {
        containerClass: "mb-0 mt-5",
        label: {
          text: "Attachments",
          htmlFor: "attachments",
          className: "mb-[10px]",
        },
        field: {
          type: Field.dragAndDropPdfField,
          id: "attachments",
          name: "attachments",
          control,
        },
      },

      {
        containerClass: "mt-6",
        field: {
          type: Field.div,
          className: "flex items-center space-x-[18px] ",
          children: [
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                text: "Cancel",
                inputType: "button",
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
