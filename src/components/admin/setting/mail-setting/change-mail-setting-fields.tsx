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
        className: "grid grid-cols-2 gap-x-[60px] ",
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
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "mailDriver",
              name: "mailDriver",
              placeholder: "Mail Driver",
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
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "mailHost",
              name: "mailHost",
              placeholder: "Mail Host",
              register,
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
        className: "grid grid-cols-2 gap-x-[60px] ",
        children: [
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
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "mailPort",
              name: "mailPort",
              placeholder: "Mail Port",
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
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "mailEncryption",
              name: "mailEncryption",
              placeholder: "Mail Encryption",
              register,
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
        className: "grid grid-cols-2 gap-x-[60px] ",
        children: [
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
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "mailUsername",
              name: "mailUsername",
              placeholder: "Mail Username",
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
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "mailPassword",
              name: "mailPassword",
              placeholder: "Mail Password",
              register,
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
        className: "grid grid-cols-2 gap-x-[60px] ",
        children: [
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
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "mailFormAddress",
              name: "mailFormAddress",
              placeholder: "Mail From Address",
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
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "mailFormName",
              name: "mailFormName",
              placeholder: "Mail From Name",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-8",
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
              containerClassName: "text-[14px] font-normal ",
              id: "spanfield",
            },
          },
          {
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "mail",
              name: "mail",
              placeholder: "Mail From Address",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-[30px]",
      field: {
        type: Field.button,
        text: `${translate(
          "admin.settings.mail_setting.mail_form_fields.save_button"
        )}`,
        inputType: "submit",
        className:
          "rounded-lg p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        id: "save",
        loading,
      },
    },
  ];

  return formField;
};
