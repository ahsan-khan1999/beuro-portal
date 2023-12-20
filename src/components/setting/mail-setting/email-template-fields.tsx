import { Field } from "@/enums/form";
import { FormField, GenerateEmailTemplateFormField } from "@/types";

export const EmailTemplateFormField: GenerateEmailTemplateFormField = (
  register,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      label: {
        text: "Change the logo",
        htmlFor: "logo",
        className: "mb-[10px] text-sm font-normal text-[#393939]",
      },
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
        text: "Contact settings(Footer)",
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
              text: "Email",
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
              text: "Phone Number",
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
              value: "+49 324 3455 34",
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Mobile Number",
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
              value: "088 46546 45",
            },
          },
        ],
      },
    },

    {
      containerClass: "my-8",
      field: {
        type: Field.span,
        text: "Color settings",
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
              text: "Footer Color",
              htmlFor: "FooterColour",
              className: "mb-[10px] text-sm font-normal text-[#393939]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "FooterColour",
              name: "FooterColour",
              placeholder: "#45Dkk6",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Text Color(Footer)",
              htmlFor: "textColour",
              className: "mb-[10px] text-sm font-normal text-[#393939]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "textColour",
              name: "textColour",
              placeholder: "#45Dkk6",
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
        id: "button",
        text: "Save Setting",
        inputType: "submit",
        className:
          "rounded-lg px-4 w-[152px] h-[50px] text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
