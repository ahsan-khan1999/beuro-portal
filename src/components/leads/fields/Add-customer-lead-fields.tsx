import { Field } from "@/enums/form";
import { DivProps, FormField, GenerateLeadsCustomerFormField } from "@/types";
import { getKeyByValue } from "@/utils/auth.util";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";

export const AddNewCustomerLeadFormField: GenerateLeadsCustomerFormField = (
  register,
  loading,
  control,
  {
    customerType,
    type,
    customer,
    onCustomerSelect,
    customerDetails,
    onCancel,
    leadDetails,
  },
  setValue
) => {

  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 xl:grid-cols-3 gap-x-3",
        children: [
          {
            label: {
              text: `${translate("leads.customer_details.customer")}`,
              htmlFor: "type",
              className: "mb-[10px]",
            },
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex flex-col mb-0",
              children: [
                {
                  containerClass: "mb-0 pb-[6px]",
                  field: {
                    type: Field.radio,
                    value: "New Customer",
                    label: "New Customer",
                    id: "type",
                    name: "type",
                    register,
                    checked:
                      (leadDetails?.id &&
                        leadDetails?.type === "New Customer") ||
                      type === "New Customer",
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.radio,
                    value: "Existing Customer",
                    label: "Existing Customer",
                    id: "type",
                    name: "type",
                    register,
                    checked:
                      (leadDetails?.id &&
                        leadDetails?.type === "Existing Customer") ||
                      type === "Existing Customer",
                  },
                },
              ],
            },
          },
          {
            label: {
              text: `${translate("leads.customer_details.customer_type")}`,
              htmlFor: "select",
              className: "mb-[10px]",
            },
            field: {
              className: `pl-4 !min-h-[54px] !border-dark  focus:!border-primary `,
              type: Field.select,
              id: "customerType",
              name: "customerType",
              options: Object.keys(staticEnums.CustomerType).map(
                (item, key) => ({
                  value: item,
                  label: item
                }
              )) || [],

              control,
              value: leadDetails && getKeyByValue(staticEnums["CustomerType"], leadDetails.customerDetail?.customerType) || ""
            },
          },
          {
            label: {
              text: `${translate("leads.customer_details.full_name")}`,
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
              // value: leadDetails && leadDetails.customerID?.fullName
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.email_address")}`,
              htmlFor: "email",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark  focus:!border-primary",
              id: "email",
              name: "email",
              inputType: "text",

              placeholder: "Please Enter Email Address",
              register,
              value: leadDetails && leadDetails.customerDetail?.email


            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.phone_number")}`,
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
              value: leadDetails?.id ? leadDetails?.customerDetail?.phoneNumber : customerDetails && customerDetails?.phoneNumber,


            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.mobile_number")}`,
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
              value: leadDetails?.id ? leadDetails?.customerDetail?.phoneNumber : customerDetails && customerDetails?.mobileNumber
            },
          },
        ],
      },
    },
    {
      containerClass: "mt-5",
      label: {
        text: `${translate("leads.customer_details.address_details")}`,
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
              text: `${translate("leads.customer_details.street_no")}`,
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
              value: leadDetails && leadDetails?.customerDetail?.address?.streetNumber

            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.post_code")}`,
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
              value: leadDetails && leadDetails?.customerDetail?.address?.postalCode


            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.country")}`,
              htmlFor: "address.country",
              className: "mb-[10px]",
            },
            field: {
              className: "pl-4  min-h-[54px] !border-dark  ",
              type: Field.select,
              id: "address.country",
              name: "address.country",
              options: Object.keys(staticEnums.Country).map((item) => ({
                value: item,
                label: item,
              })),
              control,
              value: leadDetails && leadDetails?.customerDetail?.address?.country


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
              onClick: onCancel,
              className: `rounded-lg border border-[#C7C7C7] bg-white px-4 w-[92px] h-[50px]   text-dark hover:bg-none `,
            },
          },
          {
            field: {
              type: Field.button,
              id: "button",
              text: translate("leads.customer_details.next_button"),
              inputType: "submit",
              className: `rounded-lg   px-4 w-[152px] h-[50px]  text-white hover:bg-none `,
              loading,
            },
          },
        ],
      },
    },
  ];
  // customer type
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
        text: "Company Name",
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
        setValue: setValue,
      },
    };
    // formField[fieldIndex]?.field?.children?.splice(fieldIndex + 2, 0, companyNameField)
    const divField = formField[fieldIndex]?.field as DivProps; // Assert type
    if (divField && Array.isArray(divField.children)) {
      //@ts-expect-error
      divField.children.splice(fieldIndex + 3, 0, companyNameField);
    }
  }

  // type
  const fieldTypeIndex = formField.findIndex(
    (field) =>
      field?.field?.type === Field.div &&
      //@ts-expect-error
      Array.isArray(field?.field?.children) &&
      //@ts-expect-error
      field?.field?.children.some((child) => child?.field?.id == "customerType")
  );

  if (fieldIndex !== -1 && type === "Existing Customer") {
    const customerField = {
      containerClass: "mb-0",
      label: {
        text: "Customer",
        htmlFor: "customerID",
        className: "mb-[10px]",
      },
      field: {
        className: `pl-4 !min-h-[54px] !border-dark  focus:!border-primary `,
        type: Field.select,
        id: "customerID",
        name: "customerID",
        options: customer?.map((item, key) => ({
          value: item.id,
          label: item.fullName,
        })),

        control,
        onItemChange: onCustomerSelect,
        value: leadDetails?.id ? leadDetails?.customerID : customerDetails && customerDetails?.id,
        setValue
      },
    };
    // formField[fieldIndex]?.field?.children?.splice(fieldIndex + 2, 0, companyNameField)

    const divFieldCustomer = formField[fieldTypeIndex]?.field as DivProps; // Assert type
    if (divFieldCustomer && Array.isArray(divFieldCustomer.children)) {
      //@ts-expect-error
      divFieldCustomer.children.splice(fieldIndex + 1, 0, customerField);
    }
  }

  return formField;
};
