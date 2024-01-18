import { Field } from "@/enums/form";
import { FormField, GenerateContractFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const ContractEmailPreviewFormField: GenerateContractFormField = (
  register,
  loading,
  control,
  onClick,
  onBack,
  content,
  contentDetails,
  onContentSelect,
  attachements,
  setAttachements,
  contractDetails
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-1 xl:grid-cols-3 gap-x-3 gap-y-5 xl:gap-y-0",
        children: [
          {
            containerClass: "mb-0 col-span-1",
            label: {
              text: `${translate("contracts.contract_email_preview.email")}`,
              htmlFor: "email",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#EBEBEB] focus:!border-primary ",
              inputType: "email",
              id: "email",
              name: "email",
              placeholder: "email@domain.com",
              register,
            },
          },
          {
            containerClass: "col-span-2",
            label: {
              text: `${translate("contracts.contract_email_preview.content")}`,
              htmlFor: "content",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-[#EBEBEB]  focus:!border-primary ",
              type: Field.select,
              id: "content",
              name: "content",
              options:
                content?.map((item) => ({
                  label: item.contentName,
                  value: item.id,
                })) || [],
              control,
              onItemChange: onContentSelect,
              value:
                (contentDetails?.id && contentDetails?.id) ||
                contractDetails?.offerID?.content?.id ||
                "",
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-5",
      label: {
        text: `${translate("contracts.contract_email_preview.subject")}`,
        htmlFor: "subject",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-[#EBEBEB] focus:!border-primary",
        inputType: "text",
        id: "subject",
        name: "subject",
        placeholder:
          "Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit g Dollar smith emit Lorem Ipum dor.",
        register,
      },
    },

    {
      containerClass: "mb-0 mt-5",
      label: {
        text: `${translate("contracts.contract_email_preview.description")}`,
        htmlFor: "description",
        className: "mb-[10px]",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        id: "description",
        name: "description",
        control,
        value:
          (contentDetails?.id && contentDetails?.confirmationContent?.body) ||
          contractDetails?.offerID?.content?.confirmationContent?.body,
      },
    },

    {
      containerClass: " mt-5",
      label: {
        text: `${translate("contracts.contract_email_preview.attachments")}`,
        htmlFor: "pdf",
        className: "mb-[10px]",
      },
      field: {
        type: Field.dragAndDropPdfField,
        id: "pdf",
        isOpenedFile: false,
        text: "Drop or Attach your files here",
        fileSupported: "Files supported: PDF,JPG, PNG,GIF",
        name: "pdf",
        control,
        attachements,
        setAttachements,
      },
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
              text: `${translate(
                "contracts.contract_email_preview.back_button"
              )}`,
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              onClick: onBack,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate(
                "contracts.contract_email_preview.next_button"
              )}`,
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
