import { Field } from "@/enums/form";
import { FormField, GenerateChangeMailSettingFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const ChangeMailSettingFormField: GenerateChangeMailSettingFormField = (
  register,
  loading,
  control
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 lg:grid-cols-2 gap-x-[60px] gap-y-[25px] rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "admin.settings.mail_setting.mail_form_fields.mail_driver"
              )}`,
              htmlFor: "mailDriver",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "mailDriver",
              name: "mailDriver",
              placeholder: `${translate(
                "admin.settings.placeholders.mail_driver"
              )}`,
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "admin.settings.mail_setting.mail_form_fields.mail_host"
              )}`,
              htmlFor: "mailHost",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "mailHost",
              name: "mailHost",
              placeholder: `${translate(
                "admin.settings.placeholders.mail_host"
              )}`,
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "admin.settings.mail_setting.mail_form_fields.mail_port"
              )}`,
              htmlFor: "mailPort",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "mailPort",
              name: "mailPort",
              placeholder: `${translate(
                "admin.settings.placeholders.mail_port"
              )}`,
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "admin.settings.mail_setting.mail_form_fields.mail_encryption"
              )}`,
              htmlFor: "mailEncryption",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "mailEncryption",
              name: "mailEncryption",
              placeholder: `${translate(
                "admin.settings.placeholders.mail_encryption"
              )}`,
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "admin.settings.mail_setting.mail_form_fields.mail_user"
              )}`,
              htmlFor: "mailUsername",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "mailUsername",
              name: "mailUsername",
              placeholder: `${translate(
                "admin.settings.placeholders.mail_user"
              )}`,
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "admin.settings.mail_setting.mail_form_fields.mail_password"
              )}`,
              htmlFor: "mailPassword",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "mailPassword",
              name: "mailPassword",
              placeholder: `${translate(
                "admin.settings.placeholders.mail_password"
              )}`,
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "admin.settings.mail_setting.mail_form_fields.mail_from_address"
              )}`,
              htmlFor: "mailFormAddress",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "mailFormAddress",
              name: "mailFormAddress",
              placeholder: `${translate(
                "admin.settings.placeholders.mail_address"
              )}`,
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "admin.settings.mail_setting.mail_form_fields.mail_from_name"
              )}`,
              htmlFor: "mailFormName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "mailFormName",
              name: "mailFormName",
              placeholder: `${translate(
                "admin.settings.placeholders.mail_name"
              )}`,
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
      label: {
        text: `${translate(
          "admin.settings.mail_setting.mail_form_fields.email"
        )}`,
        htmlFor: "mail",
        className: "mb-[10px] !text-base",
      },

      field: {
        type: Field.div,
        id: "divfield",
        children: [
          {
            containerClass: "mb-3",
            field: {
              type: Field.span,
              text: `${translate(
                "admin.settings.mail_setting.mail_form_fields.mail_heading"
              )}`,
              containerClassName: "text-[14px] font-normal",
              id: "spanfield",
            },
          },
          {
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "mail",
              name: "mail",
              placeholder: `${translate(
                "admin.settings.placeholders.email_from_address"
              )}`,
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-[30px] flex items-center justify-end",
      field: {
        type: Field.button,
        text: `${translate(
          "admin.settings.mail_setting.mail_form_fields.save_button"
        )}`,
        inputType: "submit",
        className: "rounded-lg p-4 w-[152px] h-[50px] text-white hover:bg-none",
        id: "save",
        loading,
      },
    },
  ];

  return formField;
};
