import { Field } from "@/enums/form";
import { FormField, GenerateContentFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const OfferEditContentDetailsFormField: GenerateContentFormField = (
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
              text: translate("content.details.offer_title"),
              htmlFor: "offerContent.title",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "offerContent.title",
              name: "offerContent.title",
              placeholder: translate("common.content_text"),
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: translate("content.details.offer_description"),
              htmlFor: "offerContent.description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              id: "offerContent.description",
              name: "offerContent.description",
              control,
              // value:
              //   (contentDetails?.id &&
              //     contentDetails?.offerContent?.description) ||
              //   "",
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: translate("content.details.email_body"),
              htmlFor: "offerContent.body",
              className: "mb-[10px]",
            },
            field: {
              type: Field.ckEditor,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              id: "offerContent.body",
              name: "offerContent.body",
              control,
              // value:
              //   (contentDetails?.id && contentDetails?.offerContent?.body) ||
              //   "",
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: translate("content.details.attachments"),
              htmlFor: "offerContent.attachments",
              className: "mb-[10px]",
            },
            field: {
              type: Field.dragAndDropPdfField,
              id: "offerContent.attachments",
              name: "offerContent.attachments",
              isOpenedFile: false,
              text: `${translate("common.drop_or_attach")}`,
              fileSupported: `${translate("common.file_support")}`,
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
      containerClass: "my-[30px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex items-center justify-end space-x-[18px]",
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
              onClick: OnClick,
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
