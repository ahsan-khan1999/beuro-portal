import { Field } from "@/enums/form";
import { FormField, GenerateInvoiceormField } from "@/types";

export const CreateInvoiceFormField: GenerateInvoiceormField = (
  register,
  loading,
  control,
  onClick
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-2 gap-[23px] ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Total Amount",
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
              text: "Remaining Amount",
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
        children: [
          {
            containerClass:
              "!flex !flex-row !justify-between !items-center mb-0",
            label: {
              text: "Enter the amount ",
              htmlFor: "enterAmount",
              className: "mb-0",
            },
            field: {
              type: Field.div,
              className: "flex gap-[20px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.radio,
                    value: "Amount",
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
                    value: "Percentage",
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
        text: "Payment Method",
        htmlFor: "paymentMethod",
        className: "mb-[12px] text-[#8F8F8F] text-[14px] font-normal",
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
        description: "Make it Recurring",
        register,
      },
    },

    // fields shows after clicked the check button
    {
      containerClass: "mt-4",
      label: {
        text: "Date of next invoice",
        htmlFor: "date",
        className: "mb-[12px]",
      },
      field: {
        type: Field.date,
        className: "!p-4 !border-dark focus:!border-primary ",
        id: "date",
        name: "date",
        register,
      },
    },
    {
      containerClass: "mb-0 mt-4",
      label: {
        text: "Frequency",
        htmlFor: "frequency",
        className: "mb-[12px] text-[#8F8F8F] text-[14px] font-normal",
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
        text: "Create Invoice",
        inputType: "submit",
        loading,
        onClick: onClick
      },
    },
  ];

  return formField;
};
