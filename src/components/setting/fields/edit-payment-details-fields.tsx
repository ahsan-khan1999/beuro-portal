import { Field } from "@/enums/form";
import { FormField, GenerateEditPaymentDetailsFormField } from "@/types";

export const editPaymentDetailsFormField: GenerateEditPaymentDetailsFormField =
  (register, loading, onClick) => {
    const formField: FormField[] = [
      {
        field: {
          type: Field.div,
          className: "grid grid-cols-3 gap-x-4 ",
          children: [
            {
              containerClass: "mb-0 col-span-2",
              label: {
                text: "Name on card",
                htmlFor: "nameOnCard",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark focus:!border-primary ",
                inputType: "text",
                id: "nameOnCard",
                name: "nameOnCard",
                placeholder: " ",
                register,
              },
            },
            {
              containerClass: "mb-0 col-span-1",
              label: {
                text: "Expiry",
                htmlFor: "expiry",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark focus:!border-primary ",
                inputType: "text",
                id: "expiry",
                name: "expiry",
                placeholder: " ",
                register,
              },
            },
          ],
        },
      },

      {
        containerClass: "mt-[14px]",
        field: {
          type: Field.div,
          className: "grid grid-cols-3 gap-x-4 ",
          children: [
            {
              containerClass: "mb-0 col-span-2",
              label: {
                text: "Card number",
                htmlFor: "cardNumber",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark focus:!border-primary ",
                inputType: "text",
                id: "cardNumber",
                name: "cardNumber",
                placeholder: " ",
                register,
              },
            },
            {
              containerClass: "mb-0 col-span-1",
              label: {
                text: "cvv",
                htmlFor: "cvv",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark focus:!border-primary ",
                inputType: "text",
                id: "cvv",
                name: "cvv",
                placeholder: " ",
                register,
              },
            },
          ],
        },
      },

      {
        field: {
          type: Field.div,
          className: "flex space-x-[18px] mt-5",
          children: [
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                text: "Cancel",
                inputType: "button",
                className:
                  "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
                loading,
                onClick:onClick
              },
            },
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                text: "Save Changes",
                inputType: "submit",
                className:
                  "rounded-lg   p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
                loading,
              },
            },
          ],
        },
      },
    ];

    return formField;
  };
