import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const CreateInvoiceFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control
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
      containerClass: "mb-[14px]",
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
      containerClass: "mb-4",
      field: {
        type: Field.div,
        children: [
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
        ],
      },
    },

    {
      containerClass: "mb-0",
      field: {
        type: Field.div,
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Payment Method",
              htmlFor: "paymentMethod",
              className: "mb-[12px] text-[#8F8F8F] text-[14px] font-normal",
            },
            field: {
              className:
                "!p-4 !border-[#8F8F8F] focus:!border-primary text-[#8F8F8F] text-[16px] font-normal",
              placeholder: "Please Select Payment Method",
              type: Field.select,
              id: "paymentMethod",
              name: "paymentMethod",
              options: [
                { value: "Online", label: "Online" },
                { value: "Cash", label: "Cash" },
              ],
              control,
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-[17px]",
      field: {
        type: Field.div,
        children: [
          {
            containerClass: "mb-0",
            field: {
              className: "text-[#4B4B4B] text-[14px] font-normal",
              type: Field.checkbox,
              id: "markItRecuring",
              name: "markItRecuring",
              description: "Make it Recurring",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-[13px]",
      field: {
        type: Field.div,
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Create Invoice",
              inputType: "submit",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
