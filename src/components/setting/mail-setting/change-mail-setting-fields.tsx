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
              placeholder: "Mail Driver",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "setting.mail_setting.mail_form_fields.mail_driver"
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
              placeholder: "Mail Host",
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
              placeholder: "Mail Port",
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
              placeholder: "Mail Encryption",
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
              placeholder: "Mail Username",
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
              placeholder: "Mail Password",
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
              placeholder: "Mail From Address",
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
              placeholder: "Mail From Name",
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
        placeholder: "Mail From Address",
        register,
      },
    },

    {
      containerClass: "mb-0 mt-[30px]",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("setting.save_setting")}`,
        inputType: "submit",
        className:
          "rounded-lg px-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
