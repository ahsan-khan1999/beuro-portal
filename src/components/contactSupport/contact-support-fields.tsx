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
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "email",
              id: "email",
              name: "email",
              placeholder: "rahal.ahmad@gmail.com",
              register,
              disabled: true,
            },
          },
          {
            containerClass: "mb-0 mt-5 lg:mt-0",
            label: {
              text: `${translate("contact_support.form_fields.phone_number")}`,
              htmlFor: "phoneNumber",
            },
            field: {
              type: Field.input,
              inputType:"number",
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
              className: "pl-4 !border-[#BFBFBF] focus:!border-primary ",
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
      containerClass: "mb-0 mt-[22px]",
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
      containerClass: "mt-[30px] flex justify-end",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("contact_support.form_fields.request_button")}`,
        inputType: "submit",
        className:
          "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
