import { Field } from "@/enums/form";
import { DivProps, FormField, GenerateCustomerFormField } from "@/types";
import { GenderLabel, staticEnums } from "@/utils/static";
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
      containerClass: "mt-3",
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-3 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-lg px-2 py-3 bg-[#EDF4FF]",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("customers.details.customer_type")}`,
              htmlFor: "customerType",
              className: "mb-[10px] ",
            },
            field: {
              className: `!px-4 !border-[#BFBFBF] ${
                !isUpdate && "!border-light"
              } focus:!border-primary `,
              type: Field.select,
              id: "customerType",
              name: "customerType",
              options: Object.keys(staticEnums.CustomerType)
                ?.slice(1)
                .map((item, key) => ({
                  value: item,
                  label: translate(`customer_type.${item}`),
                })),

              control,
              disabled: isUpdate,
              value: "",
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("customers.details.gender")}`,
              htmlFor: "gender",
              className: "mb-[10px] ",
            },
            field: {
              className: `!px-4 !border-[#BFBFBF] ${
                !isUpdate && "!border-light"
              } focus:!border-primary `,
              type: Field.select,
              id: "gender",
              name: "gender",
              options: Object.keys(staticEnums.Gender).map((item) => ({
                value: staticEnums.Gender[item],
                label: translate(`gender.${item}`),
              })),

              control,
              disabled: isUpdate,
              value: "",
            },
          },
          {
            containerClass: "mb-0 w-full xl:col-span-1",
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

              placeholder: `${translate(
                "customers.add_customer_placeholders.name"
              )}`,
              register,
              disabled: isUpdate,
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
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              id: "email",
              name: "email",
              inputType: "email",
              placeholder: `${translate(
                "customers.add_customer_placeholders.email"
              )}`,
              register,
              disabled: isUpdate,
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
              type: Field.input,
              className:
                "!px-4 !border-[#BFBFBF] focus:!border-primary cursor-default",
              id: "phoneNumber",
              name: "phoneNumber",
              inputType: "tel",
              register,
              disabled: isUpdate,
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
              type: Field.input,
              inputType: "tel",
              className: "!px-4  !border-[#BFBFBF]  focus:!border-primary",
              id: "mobileNumber",
              name: "mobileNumber",
              register,
              value: customerDetails && customerDetails.mobileNumber,
              disabled: isUpdate,
            },
          },
        ],
      },
    },
    {
      containerClass: "mt-5",
      label: {
        text: `${translate("customers.details.address_details")}`,
        htmlFor: "div",
        className: "mb-[10px] text-[#1E1E1E] text-base font-semibold",
      },

      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-lg px-2 py-3 bg-[#EDF4FF]",
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
              placeholder: `${translate(
                "customers.add_customer_placeholders.street"
              )}`,
              register,
              disabled: isUpdate,
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
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",

              inputType: "text",
              id: "address.postalCode",
              name: "address.postalCode",
              placeholder: `${translate(
                "customers.add_customer_placeholders.post_code"
              )}`,

              register,
              disabled: isUpdate,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("customers.details.country")}`,
              htmlFor: "address.country",
              className: "mb-[10px]",
            },
            // field: {
            //   className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
            //   type: Field.select,
            //   id: "address.country",
            //   name: "address.country",
            //   options: Object.keys(staticEnums.Country).map((item) => ({
            //     value: item,
            //     label: translate(`countries.${item}`),
            //   })),
            //   control,
            //   disabled: isUpdate,
            //   value: Object.keys(staticEnums.Country)[0],
            // },

            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "address.country",
              name: "address.country",
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
        id: "div-field",
        className: "flex justify-end items-center space-x-[18px] mt-8",
        children: [
          {
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("customers.details.cancel_button")}`,
              inputType: "button",
              onClick: handleUpdateCancel,
              className: `rounded-lg border border-[#C7C7C7] bg-white px-4 min-w-[92px] h-[50px] text-dark hover:bg-none ${
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
              className: `rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none ${
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
        className: "!p-4 border border-[#BFBFBF] focus:!border-primary",
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
      //@ts-expect-error
      divField.children.splice(fieldIndex + 2, 0, companyNameField);
    }
  }

  return formField;
};
