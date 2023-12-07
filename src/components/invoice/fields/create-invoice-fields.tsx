import { Field } from "@/enums/form";
import { FormField, GenerateInvoiceFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const CreateInvoiceFormField: GenerateInvoiceFormField = (
  register,
  loading,
  control,
  markItRecuring
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
              placeholder: "20000 CHF",
              register,
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
              placeholder: "20000 CHF",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-4 mb-[12px]",
      field: {
        type: Field.div,
        id: "div-field",
        children: [
          {
            containerClass:
              "!flex !flex-row !justify-between !items-center mb-0",
            label: {
              text: `${translate("invoice.create_invoice_modal.enter_amount")}`,
              htmlFor: "enterAmount",
              className: "mb-0",
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
                    value: `${translate(
                      "invoice.create_invoice_modal.amount"
                    )}`,
                    label: "Amount",
                    id: "enterAmount",
                    name: "enterAmount",
                    register,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.radio,
                    value: `${translate(
                      "invoice.create_invoice_modal.percentage"
                    )}`,
                    label: "Percentage",
                    id: "enterAmount",
                    name: "enterAmount",
                    register,
                  },
                },
              ],
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0",
      field: {
        type: Field.input,
        className:
          "!p-4 !border-[#8F8F8F] focus:!border-primary text-[#8F8F8F] text-[16px] font-normal",
        inputType: "text",
        id: "enterAmount",
        name: "enterAmount",
        placeholder: "20000 CHF",
        register,
      },
    },

    {
      containerClass: "mb-0 mt-4",
      label: {
        text: `${translate("invoice.create_invoice_modal.payment_method")}`,
        htmlFor: "paymentMethod",
        className: "mb-[12px]",
      },
      field: {
        className:
          "!p-4 !border-[#8F8F8F] focus:!border-primary text-[#8F8F8F] text-[16px] font-normal",
        type: Field.select,
        value: "Online",
        id: "paymentMethod",
        name: "paymentMethod",
        options: [
          { value: "Online", label: "Online" },
          { value: "Cash", label: "Cash" },
        ],
        control,
      },
    },

    {
      containerClass: "mb-0 mt-[17px]",
      field: {
        className: "text-[#4B4B4B] text-[14px] font-normal",
        type: Field.checkbox,
        id: "markItRecuring",
        name: "markItRecuring",
        description: `${translate(
          "invoice.create_invoice_modal.mark_it_recuring"
        )}`,
        register,
      },
    },

    {
      containerClass: `mt-4  ${!markItRecuring && "hidden"}`,
      label: {
        text: `${translate("invoice.create_invoice_modal.date_of_invoice")}`,
        htmlFor: "date",
        className: "mb-[12px]",
      },
      field: {
        type: Field.date,
        className: "!p-4 !border-dark focus:!border-primary ",
        id: "date",
        name: "date",
        register,
        dateType:"datetime-local"

      },
    },
    {
      containerClass: `mb-0 mt-4 ${!markItRecuring && "hidden"}`,
      label: {
        text: `${translate("invoice.create_invoice_modal.frequency")}`,
        htmlFor: "frequency",
        className: "mb-[12px]",
      },
      field: {
        className:
          "!p-4 !border-[#8F8F8F] focus:!border-primary text-[#8F8F8F] text-[16px] font-normal",
        value: " ",
        type: Field.select,
        id: "frequency",
        name: "frequency",
        options: [{ value: "200GHZ", label: "200GHZ" }],
        control,
      },
    },

    {
      containerClass: "mb-0 mt-[13px]",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("invoice.create_invoice_modal.button")}`,
        inputType: "submit",
        className: "hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
