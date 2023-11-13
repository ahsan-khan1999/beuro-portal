import { Field } from "@/enums/form";
import { FormField, GenerateChangeMailSettingFormField } from "@/types";

export const ChangeMailSettingFormField: GenerateChangeMailSettingFormField = (
  register,
  loading,
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
id:"div-field",
        className: "grid grid-cols-2 gap-x-[60px] ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Mail Driver",
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
              text: "Mail Host",
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
id:"div-field",
        className: "grid grid-cols-2 gap-x-[60px] ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Mail Port",
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
              text: "Mail Encryption",
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
id:"div-field",
        className: "grid grid-cols-2 gap-x-[60px] ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Mail Username",
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
              text: "Mail Password",
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
id:"div-field",
        className: "grid grid-cols-2 gap-x-[60px] ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Mail From Address",
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
              text: "Mail From Name",
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
      containerClass: "mb-0 mt-[25px]",
      label: {
        text: "Email",
        htmlFor: "mail",
        className: "mb-[10px]",
      },
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

    {
      containerClass: "mb-0 mt-[30px]",
      field: {
        type: Field.button,
id:"button",
        text: "Save Setting",
        inputType: "submit",
        className:
          "rounded-lg p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
