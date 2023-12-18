import { Field } from "@/enums/form";
import { FormField, GenerateContactSupportFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const ContactSupportFormField: GenerateContactSupportFormField = (
  register,
  loading,
  control,
  onClick
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 lg:grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("contact_support.form_fields.full_name")}`,
              htmlFor: "fullName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "fullName",
              name: "fullName",
              placeholder: "Rahal",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("contact_support.form_fields.email_address")}`,
              htmlFor: "email",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "email",
              id: "email",
              name: "email",
              placeholder: "rahal.ahmad@gmail.com",
              register,
            },
          },
          {
            containerClass: "mb-0 mt-5 lg:mt-0",
            label: {
              text: `${translate("contact_support.form_fields.phone_number")}`,
              htmlFor: "phoneNumber",
            },
            field: {
              type: Field.phone,
              className: "!border-dark focus:!border-primary",
              id: "phoneNumber",
              name: "phoneNumber",
              country: "ch",
              control,
              value: "",
              disabled: false,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-[25px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-3",
        children: [
          {
            containerClass: "mb-0 col-span-2",
            label: {
              text: `${translate("contact_support.form_fields.reason")}`,
              htmlFor: "reason",
              className: "mb-[10px]",
            },
            field: {
              className: "pl-4 !border-dark  focus:!border-primary ",
              type: Field.select,
              value: "When is a convenient time for a consultation?",
              id: "reason",
              name: "reason",
              options: [
                { value: "Individual", label: "Individual" },
                { value: "Random", label: "Random" },
              ],
              control,
            },
          },
        ],
      },
    },
    {
      containerClass: "mb-0 mt-[22px]",
      label: {
        text: `${translate("contact_support.form_fields.message")}`,
        htmlFor: "message",
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-dark focus:!border-primary",
        rows: 8,
        id: "message",
        name: "message",
        placeholder: "Type your message here",
        register,
      },
    },

    {
      containerClass: "mt-[30px]",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("contact_support.form_fields.request_button")}`,
        inputType: "submit",
        className:
          "rounded-lg   px-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
