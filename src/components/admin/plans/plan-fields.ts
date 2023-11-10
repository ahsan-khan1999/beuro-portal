import { Field } from "@/enums/form";
import { FormField, GeneratePlansFormField } from "@/types";

export const planDetailsFormField: GeneratePlansFormField = (
  register,
  loading,
  isUpdate,
  handleUpdateCancel,
  control
) => {
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-4 gap-x-3 ",
        children: [
          {
            label: {
              text: "Plan Name",
              htmlFor: "planName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "planName",
              name: "planName",

              placeholder: "Please Enter Your Plan Name",
              register,
              disabled: isUpdate,
            },
          },
          {
            label: {
              text: "Pricing Monthly",
              htmlFor: "price",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !!border-borderColor border border-dark focus:!border-primary ",
              inputType: "string",
              id: "price",
              name: "price",
              placeholder: "Please Enter Monthly Pricing",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-5",
            label: {
              text: "Annually Discount (%)",
              htmlFor: "anuallyDiscount",
            },
            field: {
              type: Field.input,
              className: "!p-4    !border-dark  focus:!border-primary",
              id: "anuallyDiscount",
              name: "anuallyDiscount",
              inputType: "string",

              placeholder: "Please Enter Anually Discount",
              register,
              disabled: isUpdate,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: "Number  of Employs",
              htmlFor: "employs",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "number",
              id: "employs",
              name: "employs",

              placeholder: "Enter Your Number Of Employs",

              register,
              disabled: isUpdate,
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-4 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "No of Requests",
              htmlFor: "requestsNo",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "number",
              id: "requestsNo",
              name: "requestsNo",

              placeholder: "Enter Number Of Requests",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Description ",
              htmlFor: "description",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "text",
              id: "description",
              name: "description",

              placeholder: "Enter Description",
              register,
              disabled: isUpdate,
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        className: "grid grid-cols-4 gap-x-3 mt-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Accounting Reports",
              htmlFor: "accountingReports",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "accountingReports",
              name: "accountingReports",

              placeholder: "Please Enter Accounting Reports",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Customize Emails",
              htmlFor: "customizeEmails",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !!border-borderColor border border-dark focus:!border-primary ",
              inputType: "string",
              id: "customizeEmails",
              name: "customizeEmails",
              placeholder: "Please Enter Customize Emails",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Water mark",
              htmlFor: "waterMark",
            },
            field: {
              type: Field.input,
              className: "!p-4    !border-dark  focus:!border-primary",
              id: "waterMark",
              name: "waterMark",
              inputType: "string",

              placeholder: "Please Enter Water mark",
              register,
              disabled: isUpdate,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: "API Feature ",
              htmlFor: "apiFeature",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "string",
              id: "apiFeature",
              name: "apiFeature",

              placeholder: "Enter Your API Feature ",

              register,
              disabled: isUpdate,
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        className: `flex space-x-[18px] mt-8 ${isUpdate && "hidden"}`,
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Back",
              inputType: "button",
              onClick: handleUpdateCancel,
              className: `px-4 py-[10px] w-[92px] font-medium border border-[#C7C7C7] hover:bg-none bg-white text-dark ${
                isUpdate && "hidden"
              }`,
              loading,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              text: "Save",
              inputType: "submit",
              className: `px-4 py-[10px] w-[152px] hover:bg-none ${
                isUpdate && "hidden"
              }`,
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
