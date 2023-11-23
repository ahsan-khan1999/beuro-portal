import { Field } from "@/enums/form";
import { FormField, GenerateCustomerLeadFormField, GenerateLeadsFormField } from "@/types";
import { staticEnums } from "@/utils/static";

export const LeadsCustomerDetailsFormField: GenerateCustomerLeadFormField = (
  register,
  loading,
  control,
  onClick,
  leadDetails
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            label: {
              text: "Name",
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
            label: {
              text: "Customer Type",
              htmlFor: "select",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-dark  focus:!border-primary ",
              type: Field.select,
              id: "customerType",
              name: "customerType",
              options: Object.keys(staticEnums.CustomerType).map((item, key) => (
                {
                  value: item,
                  label: item
                }
              )),

              control,
              value: leadDetails?.id && leadDetails.customerID?.customerType || ""
            },
          },

          {
            containerClass: "mb-0",
            label: { text: "Email Address", htmlFor: "email" },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark  focus:!border-primary",
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
              type: Field.phone,
              className: " !h-[54px] !border-dark focus:!border-primary",
              id: "phoneNumber",
              name: "phoneNumber",

              control,
              value: leadDetails?.id && leadDetails?.customerID?.phoneNumber,
              country: 'ch'

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
              type: Field.phone,
              className: " !h-[54px] !border-dark focus:!border-primary",
              id: "mobileNumber",
              name: "mobileNumber",
              control,
              value: leadDetails?.id && leadDetails?.customerID?.mobileNumber,
              country: 'ch'

            },
          },
        ],
      },
    },
    {
      containerClass: "mt-5",
      label: {
        text: "Address 1 Details*",
        htmlFor: "name",
        className: "mb-[10px] text-[#8F8F8F]",
      },

      field: {
        type: Field.div,
        id: "div-field",

        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: "Street NO.",
              htmlFor: "address.streetNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "text",
              id: "address.streetNumber",
              name: "address.streetNumber",
              placeholder: "Please Enter Street Number",
              register,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: "Post Code",
              htmlFor: "address.postalCode",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4  !border-dark focus:!border-primary focus:!border-primary",
              inputType: "text",
              id: "address.postalCode",
              name: "address.postalCode",
              placeholder: "Enter Your Post Code",

              register,
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
              options: Object.keys(staticEnums.Country).map((item) => (
                {
                  value: item,
                  label: item
                }
              )),
              control,
              value: leadDetails?.id && leadDetails?.customerID?.address?.country || ""
            },
          },
        ],
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex space-x-[18px] mt-[30px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: "Cancel",
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
              onClick: onClick
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: "Save Changes",
              inputType: "submit",
              className:
                "rounded-lg   px-4 w-[152px] h-[50px]  text-white hover:bg-none ",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
