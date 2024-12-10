import { Field } from "@/enums/form";
import { FormField, GenerateContentFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const EditReceiptContentDetailsFormField: GenerateContentFormField = (
  register,
  loading,
  control,
  onClick,
  trigger,
  count,
  attachements,
  setAttachements
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-1 gap-y-5 rounded-lg px-2 py-3 bg-[#EDF4FF]",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: translate("content.details.receipt_title"),
              htmlFor: "receiptContent.title",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "receiptContent.title",
              name: "receiptContent.title",
              placeholder: translate("content.details.receipt_title"),
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: translate("content.details.receipt_description"),
              htmlFor: "receiptContent.description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              id: "receiptContent.description",
              name: "receiptContent.description",

              control,
              // value:
              //   contentDetails?.id &&
              //   contentDetails?.receiptContent?.description,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: translate("content.details.email_body"),
              htmlFor: "receiptContent.body",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              id: "receiptContent.body",
              name: "receiptContent.body",

              control,
              // value: contentDetails?.id && contentDetails?.receiptContent?.body,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: translate("content.details.attachments"),
              htmlFor: "receiptContent.attachments",
              className: "mb-[10px]",
            },
            field: {
              type: Field.dragAndDropPdfField,
              id: "receiptContent.attachments",
              name: "receiptContent.attachments",
              isOpenedFile: false,
              text: "Drop or attach your file here",
              fileSupported: "Files supported: PDF, JPG, PNG, GIF",
              control,
              attachements,
              setAttachements,
              isAttachement: true,
            },
          },
        ],
      },
    },

    {
      containerClass: "my-[30px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex items-center justify-end gap-x-[18px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("content.details.cancel_button")}`,
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px] text-dark hover:bg-none",
              onClick: onClick,
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
                "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
