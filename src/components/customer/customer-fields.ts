import { Field } from "@/enums/form";
import { FormField, GenerateCustomerFormField } from "@/types";

export const customerDetailsFormField: GenerateCustomerFormField = (
  register,
  loading,
  isUpdate,
  handleUpdateCancel,
  control
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            label: {
              text: "Customer Type",
              htmlFor: "select",
              className: "mb-[10px]",
            },
            field: {
              className: `!p-4 !border-dark ${
                !isUpdate && "!border-light"
              } focus:!border-primary `,
              type: Field.select,
              id: "customerType",
              name: "customerType",
              value: "",
              options: [
                { value: "Individual", label: "Individual" },
                { value: "Riyal", label: "Riyal" },
                { value: "Dollar", label: "Dollar" },
              ],
              // trigger,
              control,
              disabled: isUpdate,
            },
          },
          {
            label: {
              text: "Your Name",
              htmlFor: "name",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "name",
              name: "name",

              placeholder: "Please Enter Your Name",
              register,
              disabled: isUpdate,
            },
          },
          {
            label: {
              text: "Company Name",
              htmlFor: "name",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4 !!border-borderColor border border-dark focus:!border-primary ",
              inputType: "text",
              id: "companyName",
              name: "companyName",
              placeholder: "Please Enter Company Name",
              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-5",
            label: { text: "Email Address", htmlFor: "email" },
            field: {
              type: Field.input,
              className: "!p-4    !border-dark  focus:!border-primary",
              id: "email",
              name: "email",
              inputType: "email",

              placeholder: "Please Enter Email Address",
              register,
              disabled: isUpdate,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: "Phone Number",
              htmlFor: "number",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "number",
              id: "phone",
              name: "phone",

              placeholder: "Enter Your Phone Number",

              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Mobile Number",
              htmlFor: "number",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "number",
              id: "mobile",
              name: "mobile",

              placeholder: "Enter Your Mobile Number",
              register,
              disabled: isUpdate,
            },
          },
        ],
      },
    },
    {
      containerClass: "mt-5",
      label: {
        text: "Address Details*",
        htmlFor: "name",
        className: "mb-[10px] text-[#8F8F8F]",
      },

      field: {
        type: Field.div,
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Street NO.",
              htmlFor: "address.streetNo",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "text",
              id: "address.streetNo",
              name: "address.streetNo",

              placeholder: "Please Enter Street Number",
              register,
              disabled: isUpdate,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: "Post Code",
              htmlFor: "address.postCode",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4  !border-dark focus:!border-primary focus:!border-primary",
              inputType: "number",
              id: "address.postCode",
              name: "address.postCode",
              placeholder: "Enter Your Post Code",

              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Country",
              htmlFor: "address.country",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-dark  ",
              type: Field.select,
              id: "address.country",
              name: "address.country",
              value: "",
              options: [
                { value: "Switzerland", label: "Switzerland" },
                { value: "Germany", label: "Germany" },
                { value: "Pakistan", label: "Pakistan" },
              ],
              // trigger,
              control,
              disabled: isUpdate,
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        className: "flex space-x-[18px] mt-8",
        children: [
          {
            field: {
              type: Field.button,
              text: "Cancel",
              inputType: "button",
              onClick: handleUpdateCancel,
              className: `rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none ${
                isUpdate && "hidden"
              }`,
              loading,
            },
          },
          {
            field: {
              type: Field.button,
              text: "Save Changes",
              inputType: "submit",
              className: `rounded-lg   p-4 w-[152px] h-[50px]  text-white hover:bg-none ${
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
