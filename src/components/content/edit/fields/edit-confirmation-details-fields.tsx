import { Field } from "@/enums/form";
import { FormField, GenerateContentFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const EditConfirmationContentDetailsFormField: GenerateContentFormField =
  (register, loading, control, onClick, trigger, count, attachements, setAttachements, contentDetails) => {
    const { t: translate } = useTranslation()
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
                text: translate("content.details.confirmation_title"),
                htmlFor: "confirmationContent.title",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark focus:!border-primary ",
                inputType: "text",
                id: "confirmationContent.title",
                name: "confirmationContent.title",
                placeholder: "Text for Confirmation",
                register,
              },
            },
            {
              containerClass: "mb-0 mt-5",
              label: {
                text: translate("content.details.confirmation_description"),
                htmlFor: "confirmationContent.description",
                className: "mb-[10px]",
              },
              field: {
                type: Field.ckEditor,
                className: "!p-4 !border-dark focus:!border-primary ",
                id: "confirmationContent.description",
                name: "confirmationContent.description",

                control,
                value: contentDetails?.id && contentDetails?.confirmationContent?.description

              },
            },

            {
              containerClass: "mb-0 mt-5",
              label: {
                text: "Email Body",
                htmlFor: translate("content.details.email_body"),
                className: "mb-[10px]",
              },
              field: {
                type: Field.ckEditor,
                className: "!p-4 !border-dark focus:!border-primary ",
                id: "confirmationContent.body",
                name: "confirmationContent.body",

                control,
                value: contentDetails?.id && contentDetails?.confirmationContent?.body

              },
            },

            {
              containerClass: "mb-0 mt-5",
              label: {
                text: translate("content.details.attachments"),
                htmlFor: "confirmationContent.attachments",
                className: "mb-[10px]",
              },
              field: {
                type: Field.dragAndDropPdfField,
                id: "confirmationContent.attachments",
                isOpenedFile: false,
                name: "confirmationContent.attachments",
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
