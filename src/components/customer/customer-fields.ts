import { Field } from "@/enums/form";
import { FormField, GenerateRegistrationFormField } from "@/types";

export const customerDetailsFormField: GenerateRegistrationFormField = (
  register,
  loading,
  control,
  setCurrentFormStage
  // trigger,
  // router
) => {
  const formField: FormField[] = [
    {
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
              className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
              type: Field.select,
              id: "customerType",
              name: "customerType",
              options: [
                { value: "Individual", label: "Individual" },
                { value: "Riyal", label: "Riyal" },
                { value: "Dollar", label: "Dollar" },
              ],
              // trigger,
              control,
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
              id: "Name",
              name: "Name",
              placeholder: "Please Enter Your Name",
              register,
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
              id: "phoneNumber",
              name: "phoneNumber",
              placeholder: "Enter Your Phone Number",

              register,
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
              id: "mobileNumber",
              name: "mobileNumber",
              placeholder: "Enter Your Mobile Number",
              register,
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
              htmlFor: "streetNo",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "text",
              id: "streetNo",
              name: "streetNo",
              placeholder: "Please Enter Street Number",
              register,
            },
          },

          // {
          //   label: {
          //     text: "Customer Type",
          //     htmlFor: "select",
          //     className: "mb-[10px]",
          //   },
          //   field: {
          //     placeholder: "Please Select Customer Type",
          //     type: Field.select,
          //     id: "customerType",
          //     name: "customerType",
          //     options: [
          //       { value: "Individual", label: "Individual" },
          //       { value: "Riyal", label: "Riyal" },
          //       { value: "Dollar", label: "Dollar" },
          //     ],
          //     // trigger,
          //     control,
          //   },
          // },

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
              htmlFor: "select",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  ",
              type: Field.select,
              id: "country",
              name: "country",
              options: [
                { value: "Switzerland", label: "Switzerland" },
                { value: "Germany", label: "Germany" },
                { value: "Pakistan", label: "Pakistan" },
              ],
              // trigger,
              control,
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
              // onClick: () => setCurrentFormStage("locationDetails"),
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              loading,
            },
          },
          {
            field: {
              type: Field.button,
              text: "Save Changes",
              inputType: "submit",
              className:
                "rounded-lg   p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
