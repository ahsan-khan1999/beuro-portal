import { Field } from "@/enums/form";
import { FormField, GenerateInvoiceFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const CreateInvoiceFormField: GenerateInvoiceFormField = (
  register,
  loading,
  control,
  markItRecuring,
  invoiceDetails,
  type,
  data
) => {
  const { t: translate } = useTranslation();
  const totalAmount =
    Number(invoiceDetails?.paidAmount) +
    Number(invoiceDetails?.remainingAmount);
  const formField: FormField[] = [
    {
      containerClass: "mt-3",
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-2 gap-[23px] rounded-t-lg px-2 pt-3 bg-[#EDF4FF]",
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
              value: invoiceDetails?.total?.toFixed(2),
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
              value: totalAmount?.toFixed(2),
              register,
              disabled: true,
            },
          },
        ],
      },
    },

    {
      containerClass: "px-2 pt-4 bg-[#EDF4FF]",
      field: {
        type: Field.div,
        id: "div-field",
        children: [
          {
            containerClass:
              "!flex !flex-row !justify-between !items-center mb-0",
            label: {
              text: `${translate("invoice.create_invoice_modal.enter_amount")}`,
              htmlFor: "type",
              className: "mb-0 text-sm",
            },
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex gap-[20px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.radio,
                    value: "0",
                    label: `${translate(
                      "invoice.create_invoice_modal.amount"
                    )}`,
                    id: "type",
                    name: "type",
                    register,
                    className: "text-sm",
                    colorClasses: "bg-transparent",
                  },
                },
                {
                  containerClass: "mb-0 ",
                  field: {
                    type: Field.radio,
                    value: "1",
                    label: `${translate(
                      "invoice.create_invoice_modal.percentage"
                    )}`,
                    id: "type",
                    name: "type",
                    register,
                    className: "text-sm",
                    colorClasses: "bg-transparent",
                  },
                },
              ],
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex flex-col gap-y-5 rounded-b-lg px-2 py-3 bg-[#EDF4FF]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.input,
              className:
                "!p-4 !border-[#8F8F8F] focus:!border-primary text-[#8F8F8F] text-base font-normal",
              inputType: "number",
              id: "amount",
              name: "amount",
              register,
              percentage: (type === "1" && "%") || "",
              step: "0.01",
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "invoice.create_invoice_modal.payment_method"
              )}`,
              htmlFor: "paymentType",
              className: "mb-[12px]",
            },
            field: {
              className:
                "!p-4 !border-[#8F8F8F] focus:!border-primary text-[#8F8F8F] text-base font-normal",
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
        ],
      },
    },

    {
      containerClass: "mb-0 mt-[13px]",
      field: {
        type: Field.button,
        id: "button",
        text: data
          ? `${translate("invoice.create_invoice_modal.update_invoice")}`
          : `${translate("invoice.create_invoice_modal.button")}`,
        inputType: "submit",
        className: "hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
