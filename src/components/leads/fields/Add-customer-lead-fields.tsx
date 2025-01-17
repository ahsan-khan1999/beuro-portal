import { Field } from "@/enums/form";
import { getKeyByValue } from "@/utils/auth.util";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { DivProps, FormField, GenerateLeadsCustomerFormField } from "@/types";

export const AddNewCustomerLeadFormField: GenerateLeadsCustomerFormField = (
  register,
  loading,
  control,
  // onSearchCustomer,
  {
    customerType,
    type,
    customer,
    onCustomerSelect,
    customerDetails,
    onCancel,
    leadDetails,
    gender,
  },
  setValue
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-lg px-2 py-3 bg-[#EDF4FF]",
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
                    label: `${translate("offers.offer_details.new_customer")}`,
                    id: "type",
                    name: "type",
                    register,
                    colorClasses: "bg-transparent",
                    checked: type === "New Customer",
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.radio,
                    value: "Existing Customer",
                    label: `${translate("offers.offer_details.exit_customer")}`,
                    id: "type",
                    name: "type",
                    register,
                    colorClasses: "bg-transparent",
                    checked: type === "Existing Customer",
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
              className: `pl-4 !border-[#BFBFBF] focus:!border-primary`,
              type: Field.select,
              id: "customerType",
              name: "customerType",
              options:
                Object?.keys(staticEnums.CustomerType)
                  ?.slice(1)
                  ?.map((item) => ({
                    value: item,
                    label: translate(`customer_type.${item}`),
                  })) || [],

              control,
              value:
                (leadDetails?.id &&
                  getKeyByValue(
                    staticEnums["CustomerType"],
                    leadDetails.customerDetail?.customerType
                  )) ||
                customerType,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("customers.details.gender")}`,
              htmlFor: "gender",
              className: "mb-[10px]",
            },
            field: {
              className: "!px-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              id: "gender",
              name: "gender",
              options: Object?.keys(staticEnums.Gender).map((item) => ({
                value: staticEnums.Gender[item],
                label: translate(`gender.${item}`),
              })),

              control,
              value:
                (leadDetails?.id &&
                  staticEnums["Gender"][leadDetails?.customerDetail?.gender]) ||
                gender,
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
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "fullName",
              name: "fullName",
              placeholder: `${translate("leads.placeholders.name")}`,
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
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              id: "email",
              name: "email",
              inputType: "text",
              placeholder: `${translate("leads.placeholders.email")}`,
              register,
              value: leadDetails && leadDetails.customerDetail?.email,
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
              type: Field.input,
              className: "!px-4 !border-[#BFBFBF] focus:!border-primary",
              id: "phoneNumber",
              name: "phoneNumber",
              inputType: "tel",
              placeholder: `${translate(
                "offers.placeholders.phone_placeholder"
              )}`,
              register,
              value: leadDetails?.id
                ? leadDetails?.customerDetail?.phoneNumber
                : customerDetails && customerDetails?.phoneNumber,
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
              type: Field.input,
              inputType: "tel",
              className: "!px-4 !border-[#BFBFBF] focus:!border-primary",
              id: "mobileNumber",
              name: "mobileNumber",
              placeholder: `${translate(
                "offers.placeholders.mobile_placeholder"
              )}`,
              register,
              value: leadDetails?.id
                ? leadDetails?.customerDetail?.phoneNumber
                : customerDetails && customerDetails?.mobileNumber,
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
              text: `${translate("leads.customer_details.street_no")}`,
              htmlFor: "address.streetNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "address.streetNumber",
              name: "address.streetNumber",
              placeholder: `${translate("leads.placeholders.street")}`,
              register,
              value:
                leadDetails &&
                leadDetails?.customerDetail?.address?.streetNumber,
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
                "!p-4 !border-[#BFBFBF] focus:!border-primary focus:!border-primary",
              inputType: "text",
              id: "address.postalCode",
              name: "address.postalCode",
              placeholder: `${translate("leads.placeholders.post_code")}`,
              register,
              value:
                leadDetails && leadDetails?.customerDetail?.address?.postalCode,
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
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "address.country",
              name: "address.country",
              placeholder: `${translate(
                "offers.placeholders.country_placeholder"
              )}`,
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "my-[30px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex justify-end items-center space-x-[18px]",
        children: [
          {
            field: {
              type: Field.button,
              id: "button",
              text: `${translate("common.cancel_button")}`,
              inputType: "button",
              onClick: onCancel,
              className: `rounded-lg border border-[#C7C7C7] bg-white px-4 min-w-[92px] w-fit h-[50px] text-dark hover:bg-none `,
            },
          },
          {
            field: {
              type: Field.button,
              id: "button",
              text: translate("leads.customer_details.next_button"),
              inputType: "submit",
              className: `rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none`,
              loading,
            },
          },
        ],
      },
    },
  ];

  const fieldIndex = formField.findIndex(
    (field: any) =>
      field?.field?.type === Field.div &&
      Array.isArray(field?.field?.children) &&
      field?.field?.children.some(
        (child: any) => child?.field?.id == "fullName"
      )
  );

  if (fieldIndex !== -1 && customerType === "company") {
    const companyNameField = {
      containerClass: "mb-0",
      label: {
        text: `${translate("login_detail.company_details.company_name")}`,
        htmlFor: "companyName",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        inputType: "text",
        id: "companyName",
        name: "companyName",
        placeholder: `${translate("offers.placeholders.company_placeholder")}`,
        register,
        setValue: setValue,
        value: leadDetails?.customerDetail?.companyName || "",
      },
    };
    const divField = formField[fieldIndex]?.field as DivProps;
    if (divField && Array.isArray(divField.children)) {
      divField.children.splice(fieldIndex + 3, 0, companyNameField as any);
    }
  }

  const fieldTypeIndex = formField.findIndex(
    (field: any) =>
      field?.field?.type === Field.div &&
      Array.isArray(field?.field?.children) &&
      field?.field?.children.some(
        (child: any) => child?.field?.id == "customerType"
      )
  );

  if (fieldIndex !== -1 && type === "Existing Customer") {
    const customerField = {
      containerClass: "mb-0",
      label: {
        text: `${translate("offers.customer")}`,
        htmlFor: "customerID",
        className: "mb-[10px]",
      },
      field: {
        className: `pl-4 !border-[#BFBFBF] focus:!border-primary`,
        type: Field.select,
        id: "customerID",
        name: "customerID",
        options: customer?.map((item) => ({
          value: item.id,
          label: item.fullName,
        })),
        control,
        onItemChange: onCustomerSelect,
        isLocalCustomer: true,
        // onSearchCustomer: (value: string) => onSearchCustomer(value),
        value: leadDetails?.id
          ? leadDetails?.customerID
          : customerDetails && customerDetails?.id,
        setValue,
      },
    };

    const divFieldCustomer = formField[fieldTypeIndex]?.field as DivProps;
    if (divFieldCustomer && Array.isArray(divFieldCustomer.children)) {
      divFieldCustomer.children.splice(fieldIndex + 1, 0, customerField as any);
    }
  }

  return formField;
};
