import { Field } from "@/enums/form";
import { FormField, GenerateContactSupportFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const ContactSupportFormField: GenerateContactSupportFormField = (
  register,
  loading,
  control,
  onClick,
  user
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid xMini:grid-cols-2 mlg:grid-cols-3 gap-3 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
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
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "fullName",
              name: "fullName",
              placeholder: "Rahal",
              register,
              disabled: true,
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
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "email",
              id: "email",
              name: "email",
              placeholder: "rahal.ahmad@gmail.com",
              register,
              disabled: true,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("contact_support.form_fields.phone_number")}`,
              htmlFor: "phoneNumber",
            },
            field: {
              type: Field.input,
              inputType: "tel",
              className: "!px-4 !border-[#BFBFBF] focus:!border-primary",
              id: "phoneNumber",
              name: "phoneNumber",
              register,
              value: "",
              disabled: false,
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-1 xMini:grid-cols-3 px-2 pb-5 bg-[#EDF4FF]",
        children: [
          {
            containerClass: "mb-0 col-span-2",
            label: {
              text: `${translate("contact_support.form_fields.reason")}`,
              htmlFor: "reason",
              className: "mb-[10px]",
            },
            field: {
              className: "pl-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              value: "",
              id: "reason",
              name: "reason",
              options: [
                {
                  value: "General Inquiry",
                  label: `${translate("common.general_inquery")}`,
                },
                {
                  value: "Account Assistance",
                  label: `${translate("common.account_assist")}`,
                },
                {
                  value: "Billing or Payment Issues",
                  label: `${translate("common.payment_issues")}`,
                },
                {
                  value: "Technical Support",
                  label: `${translate("common.Technical_support")}`,
                },
                {
                  value: "Feedback or Suggestions",
                  label: `${translate("common.feedback_suggestion")}`,
                },
                {
                  value: "Report a Bug or Error",
                  label: `${translate("common.report_bug")}`,
                },
                {
                  value: "Website Feedback",
                  label: `${translate("common.website_feedback")}`,
                },
                {
                  value: "Complaint",
                  label: `${translate("common.complaint")}`,
                },
                { value: "Other", label: `${translate("common.other")}` },
              ],
              control,
            },
          },
        ],
      },
    },
    {
      containerClass: "mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("contact_support.form_fields.message")}`,
        htmlFor: "message",
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        rows: 2,
        id: "message",
        name: "message",
        placeholder: `${translate("common.type_message")}`,
        register,
      },
    },

    {
      containerClass: "my-5 xMini:my-[30px] flex justify-end",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("contact_support.form_fields.request_button")}`,
        inputType: "submit",
        className:
          "rounded-lg px-4 min-w-[152px] w-fit !h-10 xMini:!h-[50px] text-white hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
