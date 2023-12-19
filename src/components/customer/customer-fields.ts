import { Field } from "@/enums/form";
import { DivProps, FormField, GenerateCustomerFormField } from "@/types";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";

export const customerDetailsFormField: GenerateCustomerFormField = (
  register,
  loading,
  isUpdate,
  handleUpdateCancel,
  { customer: customerDetails, customerType: customerType },
  control,
  setValue
) => {
  const { t: translate } = useTranslation();
  let formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          { containerClass:"mb-0",
            label: {
              text: `${translate("customers.details.customer_type")}`,
              htmlFor: "select",
              className: "mb-[10px] ",
            },
            field: {
              className: `!border-[#BFBFBF] ${
                !isUpdate && "!border-light"
              } focus:!border-primary `,
              type: Field.select,
              id: "customerType",
              name: "customerType",
              options: Object.keys(staticEnums.CustomerType).map(
                (item, key) => ({
                  value: item,
                  label: item,
                })
              ),

              control,
              disabled: isUpdate,
              value: "",
            },
          },
          {
            containerClass:"mb-0 w-full xl:col-span-2",
            label: {
              text: `${translate("customers.details.full_name")}`,
              htmlFor: "fullName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "fullName",
              name: "fullName",

              placeholder: "Please Enter Your Name",
              register,
              disabled: isUpdate,
              value: "",
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("customers.details.email_address")}`,
              htmlFor: "email",
            },
            field: {
              type: Field.input,
              className: "!p-4    !border-[#BFBFBF]  focus:!border-primary",
              id: "email",
              name: "email",
              inputType: "email",

              placeholder: "Please Enter Email Address",
              register,
              disabled: isUpdate,
              value: "",
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("customers.details.phone_number")}`,
              htmlFor: "phoneNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.phone,
              className: " !h-12  !border-[#BFBFBF]  focus:!border-primary",
              id: "phoneNumber",
              name: "phoneNumber",
              country: "ch",
              control,
              value: customerDetails && customerDetails.phoneNumber,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("customers.details.mobile_number")}`,
              htmlFor: "mobileNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.phone,
              className: " !h-12  !border-[#BFBFBF]  focus:!border-primary",
              id: "mobileNumber",
              name: "mobileNumber",
              country: "ch",
              control,
              value: customerDetails && customerDetails.mobileNumber,
              disabled: isUpdate,
            },
          },
        ],
      },
    },
    {
      containerClass:"my-5",
      label: {
        text: `${translate("customers.details.address_details")}`,
        htmlFor: "name",
        className: "mb-[10px] text-[#8F8F8F]",
      },

      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("customers.details.street_no")}`,
              htmlFor: "address.streetNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "address.streetNumber",
              name: "address.streetNumber",

              placeholder: "Please Enter Street Number",
              register,
              disabled: isUpdate,
              value: "",
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("customers.details.post_code")}`,
              htmlFor: "address.postalCode",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4  !border-[#BFBFBF] focus:!border-primary focus:!border-primary",

              inputType: "text",
              id: "address.postalCode",
              name: "address.postalCode",
              placeholder: "Enter Your Post Code",

              register,
              disabled: isUpdate,
              value: "",
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("customers.details.country")}`,
              htmlFor: "address.country",
              className: "mb-[10px]",
            },
            field: {
              className: "pl-4 !border-[#BFBFBF]",
              type: Field.select,
              id: "address.country",
              name: "address.country",
              options: Object.keys(staticEnums.Country).map((item) => ({
                value: item,
                label: item,
              })),
              control,
              disabled: isUpdate,
              value: "",
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
              text: `${translate("customers.details.cancel_button")}`,
              inputType: "button",
              onClick: handleUpdateCancel,
              className: `rounded-lg border border-[#C7C7C7] bg-white px-4 w-[92px] h-[50px]   text-dark hover:bg-none ${
                isUpdate && "hidden"
              }`,
            },
          },
          {
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("customers.details.save_changes_button")}`,
              inputType: "submit",
              className: `rounded-lg   px-4 w-[152px] h-[50px]  text-white hover:bg-none ${
                isUpdate && "hidden"
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
      //@ts-expect-error
      Array.isArray(field?.field?.children) &&
      //@ts-expect-error
      field?.field?.children.some((child) => child?.field?.id == "fullName")
  );

  if (fieldIndex !== -1 && customerType === "company") {
    const companyNameField = {
      containerClass: "mb-0",
      label: {
        text: translate("customers.details.company_name"),
        htmlFor: "companyName",
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
        value: customerDetails && customerDetails?.companyName,
        setValue: setValue,
      },
    };
    // formField[fieldIndex]?.field?.children?.splice(fieldIndex + 2, 0, companyNameField)
    const divField = formField[fieldIndex]?.field as DivProps; // Assert type
    if (divField && Array.isArray(divField.children)) {
      //@ts-expect-error
      divField.children.splice(fieldIndex + 2, 0, companyNameField);
    }
  }

  return formField;
};
