import { Field } from "@/enums/form";
import { FormField, GenerateContactSupportFormField } from "@/types";

export const ContactSupportFormField: GenerateContactSupportFormField = (
  register,
  loading,
  control,
  onClick
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Full Name*",
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
              text: "Email Address*",
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
            containerClass: "mb-0",
            label: { text: "Phone Number", htmlFor: "phoneNumber" },
            field: {
              type: Field.input,
              className: "!p-4    !border-dark  focus:!border-primary",
              id: "phoneNumber",
              name: "phoneNumber",
              inputType: "number",
              placeholder: "-------------",
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
        className: "grid grid-cols-3",
        children: [
          {
            containerClass: "mb-0 col-span-2",
            label: {
              text: "Reason for Contact",
              htmlFor: "reasonForContact",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
              type: Field.select,
              value: "When is a convenient time for a consultation?",
              id: "reasonForContact",
              name: "reasonForContact",
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
        text: "Your Message",
        htmlFor: "message",
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-dark focus:!border-primary",
        inputType: "text",
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
        text: "Submit Request",
        inputType: "submit",
        className:
          "rounded-lg   p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        onClick: onClick,
        loading,
      },
    },
  ];

  return formField;
};
