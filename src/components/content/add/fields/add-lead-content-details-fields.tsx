import { Field } from "@/enums/form";
import { FormField, GenerateContentFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const AddLeadContentDetailsFormField: GenerateContentFormField = (
  register,
  loading,
  control,
  OnClick,
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
              text: `${translate("content.details.content_name")}`,
              htmlFor: "contentName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "contentName",
              name: "contentName",
              placeholder: translate("common.content_name"),
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: translate("content.details.lead_title"),
              htmlFor: "leadContent.title",
              className: "mb-2",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "leadContent.title",
              name: "leadContent.title",
              placeholder: translate("common.content_text"),
              register,
            },
          },
          {
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex flex-col gap-y-1",
              children: [
                {
                  containerClass: "mb-0",
                  label: {
                    text: translate("content.details.lead_description"),
                    htmlFor: "leadContent.description",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.ckEditor,
                    id: "leadContent.description",
                    name: "leadContent.description",
                    control,
                  },
                },
              ],
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: translate("content.details.email_body"),
              htmlFor: "leadContent.body",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              id: "leadContent.body",
              name: "leadContent.body",
              control,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: translate("content.details.attachments"),
              htmlFor: "leadContent.attachments",
              className: "mb-[10px]",
            },
            field: {
              type: Field.dragAndDropPdfField,
              id: "leadContent.attachments",
              name: "leadContent.attachments",
              isOpenedFile: false,
              text: "Drop or attach your file here",
              fileSupported: "Files supported: PDF, JPG, PNG, GIF",
              control,
              attachements: attachements,
              setAttachements: setAttachements,
              isAttachement: true,
            },
          },
        ],
      },
    },

    {
      containerClass: "my-[30px] float-right",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("content.details.next_button")}`,
        inputType: "submit",
        className:
          "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
