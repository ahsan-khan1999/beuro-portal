import { Field } from "@/enums/form";
import {
  FormField,
  GenerateContractFormField,
  GenerateInvoiceEmailFormField,
} from "@/types";
import { useTranslation } from "next-i18next";

export const InvoiceEmailPreviewFormField: GenerateInvoiceEmailFormField = (
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
  invoiceDetails,
  isMoreEmail,
  setIsMoreEmail,
  setValue,
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 xl:grid-cols-12 gap-x-3 gap-y-5 xl:gap-y-0",
        children: [
          {
            containerClass: "mb-0 col-span-4",
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
            containerClass: "col-span-1 flex my-auto ",
            field: {
              type: Field.div,
              className: "flex space-x-2 items-center",
              id: "text",
              children: [
                {
                  containerClass: "mb-0  ",
                  field: {
                    type: Field.span,
                    text: `Cc`,
                    containerClassName:
                      "underline text-[14px] text-[#393939] font-normal cursor-pointer ",
                    id: "cc",
                    onClick: () => {
                      if (setValue) {
                        setValue("cc", "");
                      }
                      setIsMoreEmail({
                        ...isMoreEmail,
                        isCc: !isMoreEmail?.isCc,
                      });
                    },
                  },
                },

                {
                  containerClass: "mb-0  ",
                  field: {
                    type: Field.span,
                    text: `Bcc`,
                    containerClassName:
                      "underline text-[14px] text-[#393939] font-normal cursor-pointer ",
                    id: "bcc",
                    onClick: () => {
                      if (setValue) {
                        setValue("bcc", "");
                      }
                      setIsMoreEmail({
                        ...isMoreEmail,
                        isBcc: !isMoreEmail?.isBcc,
                      });
                    },
                  },
                },
              ],
            },
          },

          {
            containerClass: "col-span-7",
            label: {
              text: `${translate("contracts.contract_email_preview.content")}`,
              htmlFor: "content",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-[#EBEBEB] focus:!border-primary ",
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
                contentDetails?.id && contentDetails?.id as string ||
                invoiceDetails?.invoiceID?.contractID?.offerID?.content?.id as string
                ,
            },
          },
          (isMoreEmail?.isCc && {
            containerClass: "mb-0 mt-5 col-span-4",
            label: {
              text: `Cc`,
              htmlFor: "cc",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#EBEBEB] focus:!border-primary",
              inputType: "email",
              id: "cc",
              name: "cc",
              placeholder: "email@domain.com",
              register,
            },
          }) || {
            containerClass: "hidden",
            label: {
              text: `Cc`,
              htmlFor: "cc",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#EBEBEB] focus:!border-primary",
              inputType: "email",
              id: "cc",
              name: "cc",
              placeholder: "email@domain.com",
              register,
            },
          },
          (isMoreEmail?.isBcc && {
            containerClass: "mb-0 mt-5 col-span-4",
            label: {
              text: `Bcc`,
              htmlFor: "bcc",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#EBEBEB] focus:!border-primary",
              inputType: "email",
              id: "bcc",
              name: "bcc",
              placeholder: "email@domain.com",
              register,
            },
          }) || {
            containerClass: "hidden",
            label: {
              text: `Bcc`,
              htmlFor: "bcc",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#EBEBEB] focus:!border-primary",
              inputType: "email",
              id: "bcc",
              name: "bcc",
              placeholder: "email@domain.com",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "",
      field: {
        type: Field.div,
        id:"titlefield",
        className: "grid grid-cols-2 gap-x-3",
        children: [
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
              text: `${translate("contracts.contract_email_preview.title")}`,
              htmlFor: "title",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#EBEBEB] focus:!border-primary",
              inputType: "text",
              id: "title",
              name: "title",
              placeholder:
                "Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit Lorem Ipsum Dollar smith emit g Dollar smith emit Lorem Ipum dor.",
              register,
            },
          },
        ]
      }
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
        // value: contentDetails?.id && contentDetails?.receiptContent?.body || invoiceDetails?.invoiceID?.contractID?.offerID?.content?.receiptContent?.body
      },
    },
    {
      containerClass: "mb-0 mt-5",
      label: {
        text: `${translate("contracts.contract_email_preview.additional_details")}`,
        htmlFor: "additionalDetails",
        className: "mb-[10px]",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        id: "additionalDetails",
        name: "additionalDetails",
        control,

      },
    },

   
    {
      containerClass: " mt-5",
      label: {
        text: `${translate("contracts.contract_email_preview.attachments")}`,
        htmlFor: "attachments",
        className: "mb-[10px]",
      },
      field: {
        type: Field.dragAndDropPdfField,
        id: "attachments",
        isOpenedFile: false,
        text: "Drop or Attach your files here",
        fileSupported: "Files supported: PDF,JPG, PNG,GIF",
        name: "attachments",
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
