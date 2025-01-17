import { Field } from "@/enums/form";
import { FormField, GenerateInvoiceFormField } from "@/types";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";

export const CreateRecurringInvoiceFormField: GenerateInvoiceFormField = (
  register,
  loading,
  control,
  markItRecuring,
  invoiceDetails
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex flex-col gap-y-5 rounded-lg px-2 py-3 bg-[#EDF4FF]",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("invoice.create_invoice_modal.total_amount")}`,
              htmlFor: "totalAmount",
              className: "mb-[12px] text-[#8F8F8F] text-[14px] font-normal",
            },
            field: {
              type: Field.span,
              containerClassName:
                "!p-4 rounded-lg !border-[1px] !border-[#8F8F8F] focus:!border-primary  text-[#8F8F8F] text-base font-normal",
              id: "totalAmount",
              text: `${invoiceDetails?.total}`,
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
              value: "Online",
              id: "paymentType",
              name: "paymentType",
              options: [
                { value: "Online", label: `${translate("common.online")}` },
                { value: "Cash", label: `${translate("common.cash")}` },
                {
                  value: "Twint",
                  label: `${translate("payment_method.Twint")}`,
                },
              ],
              control,
            },
          },

          {
            containerClass: `mb-0`,
            label: {
              text: `${translate(
                "invoice.create_invoice_modal.date_of_invoice"
              )}`,
              htmlFor: "dateOfNextInvoice",
              className: "mb-[12px]",
            },
            field: {
              type: Field.date,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              id: "dateOfNextInvoice",
              name: "dateOfNextInvoice",
              register,
              dateType: "date",
            },
          },
          {
            containerClass: `mb-0`,
            label: {
              text: `${translate("invoice.create_invoice_modal.frequency")}`,
              htmlFor: "frequency",
              className: "mb-[12px]",
            },
            field: {
              className:
                "!p-4 !h-[58px] !border-[#8F8F8F] focus:!border-primary text-[#8F8F8F] text-base font-normal",
              value: " ",
              type: Field.select,
              id: "frequency",
              name: "frequency",
              options: Object.keys(staticEnums["Frequency"]).map((item) => ({
                label: translate(`frequency.${item}`),
                value: staticEnums["Frequency"][item],
              })),

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
        text: `${translate("invoice.create_invoice_modal.recurring_button")}`,
        inputType: "submit",
        className: "hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
