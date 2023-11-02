import { Field } from "@/enums/form";
import { FormField, GenerateContentFormField } from "@/types";

export const EditInvoiceContentDetailsFormField: GenerateContentFormField = (
  register,
  loading,
  control,
  onClick
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-0",
      label: {
        text: "Invoice Title",
        htmlFor: "invoiceTitle",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-dark focus:!border-primary ",
        inputType: "text",
        id: "invoiceTitle",
        name: "invoiceTitle",
        placeholder: "Text for Invoice",
        register,
      },
    },
    {
      containerClass: "mb-0 mt-5",
      label: {
        text: "Invoice Description",
        htmlFor: "invoiceDescription",
        className: "mb-[10px]",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-dark focus:!border-primary ",
        id: "invoiceDescription",
        name: "invoiceDescription",
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
        text: "Drop or attach your file here",
        fileSupported: "Files supported: PDF, JPG, PNG, GIF",
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
              onClick: onClick
            },
          },
        ],
      },
    },
  ];

  return formField;
};