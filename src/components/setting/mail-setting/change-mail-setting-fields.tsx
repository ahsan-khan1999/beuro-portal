import { Field } from "@/enums/form";
import { FormField, GenerateChangeMailSettingFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const ChangeMailSettingFormField: GenerateChangeMailSettingFormField = (
  register,
  loading
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-1 lg:grid-cols-2 gap-y-5   lg:gap-x-[60px] ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "setting.mail_setting.mail_form_fields.mail_driver"
              )}`,
              htmlFor: "mailDriver",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
                "setting.mail_setting.mail_form_fields.mail_host"
              )}`,
              htmlFor: "mailHost",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
                "setting.mail_setting.mail_form_fields.mail_port"
              )}`,
              htmlFor: "mailPort",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
                "setting.mail_setting.mail_form_fields.mail_encryption"
              )}`,
              htmlFor: "mailEncryption",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
                "setting.mail_setting.mail_form_fields.mail_user"
              )}`,
              htmlFor: "mailUserName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "mailUserName",
              name: "mailUserName",
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
                "setting.mail_setting.mail_form_fields.mail_password"
              )}`,
              htmlFor: "mailPassword",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
                "setting.mail_setting.mail_form_fields.mail_address"
              )}`,
              htmlFor: "mailFromAddress",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "mailFromAddress",
              name: "mailFromAddress",
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
                "setting.mail_setting.mail_form_fields.mail_name"
              )}`,
              htmlFor: "mailFromName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "mailFromName",
              name: "mailFromName",
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
      containerClass: "mb-0 mt-[25px]",
      label: {
        text: `${translate("setting.mail_setting.mail_form_fields.email")}`,
        htmlFor: "testingMail",
        className: "mb-[10px]",
      },
      field: {
        type: Field.span,
        id: "",
        text: translate(
          "setting.mail_setting.mail_form_fields.mail_description"
        ),
        containerClassName: "",
      },
    },
    {
      containerClass: "mt-2",
      field: {
        type: Field.input,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
        inputType: "email",
        id: "testingMail",
        name: "testingMail",
        placeholder: `${translate(
          "admin.settings.placeholders.email_from_address"
        )}`,
        register,
      },
    },

    {
      containerClass: "mb-0 mt-[30px] flex items-center justify-end",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("setting.save_setting")}`,
        inputType: "submit",
        className:
          "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
