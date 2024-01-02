import { Field } from "@/enums/form";
import { FormField, GenerateContentFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const EditInvoiceContentDetailsFormField: GenerateContentFormField = (
  register,
  loading,
  control,
  onClick
  , trigger, count, attachements, setAttachements, contentDetails
) => {
  const { t: translate } = useTranslation();
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
              text: translate("content.details.invoice_title"),
              htmlFor: "invoiceContent.title",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "invoiceContent.title",
              name: "invoiceContent.title",
              placeholder: "Text for Invoice",
              register,
            },
          },
          {
            containerClass: "mb-0 mt-5",
            label: {
              text: translate("content.details.invoice_description"),
              htmlFor: "invoiceContent.description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              id: "invoiceContent.description",
              name: "invoiceContent.description",

              control,
              value: contentDetails?.id && contentDetails?.invoiceContent?.description

            },
          },

          {
            containerClass: "mb-0 mt-5",
            label: {
              text: translate("content.details.email_body"),
              htmlFor: "invoiceContent.body",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              id: "invoiceContent.body",
              name: "invoiceContent.body",

              control,
              value: contentDetails?.id && contentDetails?.invoiceContent?.body
            },
          },

          {
            containerClass: "mb-0 mt-5",
            label: {
              text: translate("content.details.attachments"),
              htmlFor: "invoiceContent.attachments",
              className: "mb-[10px]",
            },
            field: {
              type: Field.dragAndDropPdfField,
              id: "invoiceContent.attachments",
              isOpenedFile: false,
              name: "invoiceContent.attachments",
              text: "Drop or attach your file here",
              fileSupported: "Files supported: PDF, JPG, PNG, GIF",
              control,
              attachements,
              setAttachements,
              isAttachement: true

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
              text: `${translate("content.details.cancel_button")}`,
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              loading,
              onClick: onClick
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("content.details.save_changes_button")}`,
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
