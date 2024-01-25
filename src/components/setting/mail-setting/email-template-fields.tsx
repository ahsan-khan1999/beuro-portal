import { Field } from "@/enums/form";
import { FormField, GenerateEmailTemplateFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const EmailTemplateFormField: GenerateEmailTemplateFormField = (
  register,
  loading,
  emailSettings,
  control,
  setValue,
  data
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      label: {
        text: `${translate(
          "setting.mail_setting.template_form_fields.change_logo"
        )}`,
        htmlFor: "logo",
        className: "mb-[10px] text-sm font-normal text-[#393939]",
      },
      containerClass: "!w-[187px]",
      field: {
        type: Field.profileUploadField,
        id: "logo",
        iconClasses: "-right-2 -bottom-2",
        className: "!h-[89px] !w-[187px] !rounded-lg border border-[#BFBFBF]",
        name: "logo",
        control,
      },
    },

    {
      containerClass: "mt-[35px]",
      field: {
        type: Field.span,
        text: `${translate(
          "setting.mail_setting.template_form_fields.contact_setting_heading"
        )}`,
        name: Field.span,
        containerClassName: "text-[#4B4B4B] text-base font-medium",
        id: "",
      },
    },
    {
      containerClass: "mt-8",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-[42px]",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "setting.mail_setting.template_form_fields.email"
              )}`,
              htmlFor: "email",
              className: "mb-[10px] text-sm font-normal text-[#393939]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "email",
              id: "email",
              name: "email",
              placeholder: "test@gmail.com",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "setting.mail_setting.template_form_fields.phone_number"
              )}`,
              htmlFor: "phoneNumber",
              className: "mb-[10px] text-sm font-normal text-[#393939]",
            },
            field: {
              type: Field.phone,
              id: "phoneNumber",
              name: "phoneNumber",
              className: "!border-[#BFBFBF] focus:!border-primary",
              control,
              country: "ch",
              value: emailSettings?.phoneNumber || "",
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "setting.mail_setting.template_form_fields.mobile_number"
              )}`,
              htmlFor: "mobileNumber",
              className: "mb-[10px] text-sm font-normal text-[#393939]",
            },
            field: {
              type: Field.phone,
              id: "mobileNumber",
              name: "mobileNumber",
              className: "!border-[#BFBFBF] focus:!border-primary",
              control,
              country: "ch",
              value: emailSettings?.mobileNumber || "",
            },
          },
        ],
      },
    },

    {
      containerClass: "my-8",
      field: {
        type: Field.span,
        text: `${translate(
          "setting.mail_setting.template_form_fields.color_setting"
        )}`,
        name: Field.span,
        containerClassName: "text-[#4B4B4B] text-base font-medium",
        id: "",
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-[42px]",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "setting.mail_setting.template_form_fields.footer_color"
              )}`,
              htmlFor: "FooterColour",
              className: "mb-[10px] text-sm font-normal text-[#393939]",
            },
            field: {
              type: Field.colorPicker,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              id: "FooterColour",
              name: "FooterColour",
              placeholder: "45Dkk6",
              register,
              setValue,
              value: data?.footerColor,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate(
                "setting.mail_setting.template_form_fields.text_color"
              )}`,
              htmlFor: "textColour",
              className: "mb-[10px] text-sm font-normal text-[#393939]",
            },
            field: {
              type: Field.colorPicker,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              id: "textColour",
              name: "textColour",
              placeholder: "45Dkk6",
              value: data?.textColor,
              register,
              setValue,
            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-[30px] flex justify-end items-center",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate(
          "setting.mail_setting.template_form_fields.save_setting"
        )}`,
        inputType: "submit",
        className:
          "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
