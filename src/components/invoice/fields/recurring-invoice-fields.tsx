import { Field } from "@/enums/form";
import { FormField, GenerateInvoiceFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const RecurringInvoiceFormField: GenerateInvoiceFormField = (
  register,
  loading,
  control,
  markItRecuring,
  invoiceDetails,
  type,
  data
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 gap-[23px] ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("invoice.create_invoice_modal.total_amount")}`,
              htmlFor: "totalAmount",
              className: "mb-[12px] text-[#8F8F8F] text-[14px] font-normal",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !border-[#8F8F8F] focus:!border-primary  text-[#8F8F8F] text-[16px] font-normal",
              inputType: "text",
              id: "totalAmount",
              name: "totalAmount",
              value: invoiceDetails?.total?.toString(),
              register,
              disabled: true,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "invoice.create_invoice_modal.remaining_amount"
              )}`,
              htmlFor: "remainingAmount",
              className: "mb-[12px] text-[#8F8F8F] text-[14px] font-normal",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !border-[#8F8F8F] focus:!border-primary  text-[#8F8F8F] text-[16px] font-normal",
              inputType: "text",
              id: "remainingAmount",
              name: "remainingAmount",
              value: invoiceDetails?.remainingAmount,
              disabled: true,
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-4",
      label: {
        text: `${translate("invoice.create_invoice_modal.payment_method")}`,
        htmlFor: "paymentType",
        className: "mb-[12px]",
      },
      field: {
        className:
          "!p-4 !h-[54px] !border-[#8F8F8F] focus:!border-primary text-[#8F8F8F] text-[16px] font-normal",
        type: Field.select,
        value: data ? data?.paymentType : "",
        id: "paymentType",
        name: "paymentType",

        options: [
          { value: "Online", label: `${translate("common.online")}` },
          { value: "Cash", label: `${translate("common.cash")}` },
        ],
        control,
      },
    },

    {
      containerClass: "mb-0 mt-[13px]",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("invoice.create_invoice_modal.update_invoice")}`,
        inputType: "submit",
        className: "hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
