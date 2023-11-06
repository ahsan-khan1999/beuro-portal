import { Field } from "@/enums/form";
import { FormField, GenerateEmployeeFormField } from "@/types";

export const employeeEditDetailsFormField: GenerateEmployeeFormField = (
  register,
  loading,
  onClick
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-0",
      field: {
        type: Field.div,
        className: "flex justify-between items-center gap-3",
        children: [
          {
            containerClass: "w-[67%] mb-0",
            label: {
              text: "Employ Name",
              htmlFor: "employName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "name",
              name: "name",
              placeholder: "Rahal",
              register,
            },
          },
          {
            containerClass: "w-[33%] mb-0",
            label: {
              text: "Designation",
              htmlFor: "designation",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !!border-borderColor border border-dark focus:!border-primary ",
              inputType: "text",
              id: "designation",
              name: "designation",
              placeholder: "Manager",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5",
      field: {
        type: Field.div,
        className: "grid grid-cols-3 gap-4",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Email Address",
              htmlFor: "email",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "email",
              name: "email",
              placeholder: "rahal.ahmad@gmail.com",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Phone Number",
              htmlFor: "phoneNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "number",
              id: "phone",
              name: "phone",
              placeholder: "+49 124354 2111",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Mobile Number",
              htmlFor: "mobileNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "number",
              id: "phone",
              name: "phone",
              placeholder: "+49 124354 2111",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        className: "flex items-center space-x-[18px] ",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Cancel",
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white px-4 py-[10px] w-fit h-auto   text-dark hover:bg-none",
              loading,
              onClick: onClick,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Save Changes",
              inputType: "submit",
              className:
                "rounded-lg px-4 py-[10px] w-fit h-auto  text-white hover:bg-none ",
              loading,
              onClick: onClick,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
