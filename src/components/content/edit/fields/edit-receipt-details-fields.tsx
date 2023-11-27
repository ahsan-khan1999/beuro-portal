import { Field } from "@/enums/form";
import { FormField, GenerateContentFormField } from "@/types";

export const EditReceiptContentDetailsFormField: GenerateContentFormField = (
  register,
  loading,
  control,
  onClick,
  trigger,
  count,
  attachements, setAttachements, contentDetails
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-5",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-1 gap-4",
        children: [
          {
            containerClass: "mb-0 mt-5",
            label: {
              text: "Receipt Title",
              htmlFor: "title",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "title",
              name: "title",
              placeholder: "Text for Receipt",
              register,
            },
          },
          {
            containerClass: "mb-0 mt-5",
            label: {
              text: "Receipt Description",
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-dark focus:!border-primary ",
              id: "description",
              name: "description",

              control,
              value: contentDetails?.id && contentDetails?.receiptContent?.description
            },
          },

          {
            containerClass: "mb-0 mt-5",
            label: {
              text: "Email Body",
              htmlFor: "body",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-dark focus:!border-primary ",
              id: "body",
              name: "body",

              control,
              value: contentDetails?.id && contentDetails?.receiptContent?.body

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
              isOpenedFile: false,
              text: "Drop or attach your file here",
              fileSupported: "Files supported: PDF, JPG, PNG, GIF",
              control,
              attachements,
              setAttachements
            },
          },
        ],
      }
    },


    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex items-center space-x-[18px] ",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: "Back",
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              onClick: onClick,
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
