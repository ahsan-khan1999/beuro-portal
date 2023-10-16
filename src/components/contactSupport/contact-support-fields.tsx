import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const ContactSupportFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control,
  handleRequestModal
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
              text: "First Name",
              htmlFor: "firstName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "firstName",
              name: "firstName",
              placeholder: "Rahal",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Last Name",
              htmlFor: "firstName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "lastName",
              name: "lastName",
              placeholder: "Ahmad",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: { text: "Email Address", htmlFor: "email" },
            field: {
              type: Field.input,
              className: "!p-4    !border-dark  focus:!border-primary",
              id: "email",
              name: "email",
              inputType: "email",
              placeholder: "rahal.ahmad@gmail.com",
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
        className: "flex justify-between items-center gap-3",
        children: [
          {
            containerClass: "mb-0 w-[33%]",
            label: {
              text: "Mobile Number",
              htmlFor: "mobileNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "number",
              id: "mobileNumber",
              name: "mobileNumber",
              placeholder: "- - - - - - - - - - - - - - - - - - -",

              register,
            },
          },

          {
            containerClass: "mb-0 w-[67%]",
            label: {
              text: "Reason for Contact",
              htmlFor: "select",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
              placeholder: "When is a convenient time for a consultation?",
              type: Field.select,
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
      containerClass: "mt-[22px]",
      field: {
        type: Field.div,
        className: "w-full",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Your Message",
              htmlFor: "message",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "text",
              id: "message",
              name: "message",
              placeholder: "Type your message here",
              register,
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        children: [
          {
            containerClass: "mt-[30px]",
            field: {
              type: Field.button,
              text: "Submit Request",
              inputType: "button",
              className:
                "rounded-lg p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
              loading,
              onClick: handleRequestModal,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
