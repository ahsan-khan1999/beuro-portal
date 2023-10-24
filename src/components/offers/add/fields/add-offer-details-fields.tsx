import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const AddOfferDetailsFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control
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
              text: "Select Customer",
              htmlFor: "selectCustomer",
              className: "mb-[10px]",
            },
            field: {
              type: Field.div,
              className: "flex flex-col",
              children: [
                {
                  containerClass: "mb-0 pb-[6px]",
                  field: {
                    type: Field.radio,
                    value: "New Customer",
                    label: "New Customer",
                    id: "selectCustomer",
                    name: "selectCustomer",
                    register,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.radio,
                    value: "New Customer",
                    label: "Existing Customer",
                    id: "selectCustomer",
                    name: "selectCustomer",
                    register,
                  },
                },
              ],
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Customer Type",
              htmlFor: "customerType",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
              placeholder: "Please Select Customer Type",
              type: Field.select,
              id: "customerType",
              name: "customerType",
              options: [{ value: "Individual", label: "Individual" }],
              control,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Customer Name",
              htmlFor: "customerName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "customerName",
              name: "customerName",
              placeholder: "Rahal Ahmed",
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
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0 col-span-2",
            label: {
              text: "Offer Title ",
              htmlFor: "offerTitle",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
              placeholder: "Please Select offer Title",
              type: Field.select,
              id: "offerTitle",
              name: "offerTitle",
              options: [
                {
                  value: "Office Cleaning Munich Lorem ipsum dollar smith emit",
                  label: "Office Cleaning Munich Lorem ipsum dollar smith emit",
                },
              ],
              control,
            },
          },
          {
            containerClass: "mb-0 col-span-1",
            label: {
              text: "Offer Number",
              htmlFor: "offerNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "offerNumber",
              name: "offerNumber",
              placeholder: "A-2000",
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
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Email",
              htmlFor: "email",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "email",
              id: "email",
              name: "email",
              placeholder: "Rahal1234@gmail.com",
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
              id: "phoneNumber",
              name: "phoneNumber",
              placeholder: "+49 445612 2112",
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
              id: "mobileNumber",
              name: "mobileNumber",
              placeholder: "+49 445612 2112",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5",
      label: {
        text: "Customer Address",
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
              htmlFor: "streetNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "text",
              id: "streetNumber",
              name: "streetNumber",
              placeholder: "Please Enter Street Number",
              register,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: "Post Code",
              htmlFor: "post code",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4  !border-dark focus:!border-primary focus:!border-primary",
              inputType: "number",
              id: "postCode",
              name: "postCode",
              placeholder: "Enter Your Post Code",

              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Country",
              htmlFor: "country",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4  !border-dark focus:!border-primary focus:!border-primary",
              inputType: "text",
              id: "country",
              name: "country",
              placeholder: "Switzerland",

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

        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Date",
              htmlFor: "date",
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "date",
              id: "date",
              name: "date",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: "Date",
              htmlFor: "date",
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "date",
              id: "date",
              name: "date",
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
        text: "Next",
        inputType: "submit",
        className:
          "rounded-lg bg-[#4A13E7] p-4  w-[152px] h-[50px] text-white hover-bg-none",
        loading,
      },
    },
  ];

  return formField;
};