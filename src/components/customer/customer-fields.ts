import { Field } from "@/enums/form";
import { DivProps, FormField, GenerateCustomerFormField } from "@/types";
import { staticEnums } from "@/utils/static";

export const customerDetailsFormField: GenerateCustomerFormField = (
  register,
  loading,
  isUpdate,
  handleUpdateCancel,
  { mobileNumber, phoneNumber, customerType },
  control,
) => {
  let formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-3 gap-x-3 ",
        children: [
          {
            label: {
              text: "Customer Type",
              htmlFor: "select",
              className: "mb-[10px]",
            },
            field: {
              className: `pl-4 !min-h-[54px] !border-dark ${!isUpdate && "!border-light"
                } focus:!border-primary `,
              type: Field.select,
              id: "customerType",
              name: "customerType",
              value: "",
              options: Object.keys(staticEnums.CustomerType).map((item, key) => (
                {
                  value: item,
                  label: item
                }
              )),

              control,
              disabled: isUpdate,
            },
          },
          {
            label: {
              text: "Your Name",
              htmlFor: "fullName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "fullName",
              name: "fullName",

              placeholder: "Please Enter Your Name",
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
              htmlFor: "phoneNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.phone,
              className: " !h-12  !border-dark  focus:!border-primary",
              id: "phoneNumber",
              name: "phoneNumber",
              country: "ch",
              control,
              value: phoneNumber,


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
              type: Field.phone,
              className: " !h-12  !border-dark  focus:!border-primary",
              id: "mobileNumber",
              name: "mobileNumber",
              country: "ch",
              control,
              value: mobileNumber,
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
              disabled: isUpdate,
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

              inputType: "number",
              id: "address.postalCode",
              name: "address.postalCode",
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
              className: "pl-4  min-h-[54px] !border-dark  ",
              type: Field.select,
              id: "address.country",
              name: "address.country",
              value: "",
              options: Object.keys(staticEnums.Country).map((item) => (
                {
                  value: item,
                  label: item
                }
              )),
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
        id: "div-field",
        className: "flex space-x-[18px] mt-8",
        children: [
          {
            field: {
              type: Field.button,
              id: "button",
              text: "Cancel",
              inputType: "button",
              onClick: handleUpdateCancel,
              className: `rounded-lg border border-[#C7C7C7] bg-white px-4 w-[92px] h-[50px]   text-dark hover:bg-none ${isUpdate && "hidden"
                }`,
            },
          },
          {
            field: {
              type: Field.button,
              id: "button",
              text: "Save Changes",
              inputType: "submit",
              className: `rounded-lg   px-4 w-[152px] h-[50px]  text-white hover:bg-none ${isUpdate && "hidden"
                }`,
              loading,
            },
          },
        ],
      },
    },
  ];
  const fieldIndex = formField.findIndex(
    (field) =>
      field?.field?.type === Field.div &&
      Array.isArray(field?.field?.children) &&
      field?.field?.children.some((child) => child?.field?.id == "fullName")
  );

  if (fieldIndex !== -1 && customerType === "company") {
    const companyNameField = {
      containerClass: "mb-0",
      label: {
        text: "Company Name",
        htmlFor: "name",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className:
          "!p-4 !!border-borderColor border border-dark focus:!border-primary",
        inputType: "text",
        id: "companyName",
        name: "companyName",
        placeholder: "Please Enter Company Name",
        register,
        disabled: isUpdate,
      },
    };
    // formField[fieldIndex]?.field?.children?.splice(fieldIndex + 2, 0, companyNameField)
    const divField = formField[fieldIndex]?.field as DivProps; // Assert type
    if (divField && Array.isArray(divField.children)) {
      divField.children.splice(fieldIndex + 2, 0, companyNameField);
    }
  }
  return formField
};
