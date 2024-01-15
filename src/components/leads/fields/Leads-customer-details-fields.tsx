import { Field } from "@/enums/form";
import {
  DivProps,
  FormField,
  GenerateCustomerLeadFormField,
  GenerateLeadsFormField,
} from "@/types";
import { getKeyByValue, getValueByKey } from "@/utils/auth.util";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";

export const LeadsCustomerDetailsFormField: GenerateCustomerLeadFormField = (
  register,
  loading,
  control,
  onClick,
  leadDetails,
  customerType,
  setValue
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.first_name")}`,
              htmlFor: "fullName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "fullName",
              name: "fullName",
              placeholder: "Rahal",
              register,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.customer_type")}`,
              htmlFor: "customerType",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              type: Field.select,
              id: "customerType",
              name: "customerType",
              options: Object.keys(staticEnums.CustomerType)
                ?.slice(1)
                .map((item, key) => ({
                  value: item,
                  label: item,
                })),

              control,
              value:
                (leadDetails?.id &&
                  getKeyByValue(
                    staticEnums["CustomerType"],
                    leadDetails.customerDetail?.customerType
                  )) ||
                "",
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
              inputType: "email",
              placeholder: "Please Enter Email Address",
              register,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.phone_number")}`,
              htmlFor: "number",
              className: "mb-[10px]",
            },
            field: {
              type: Field.phone,
              className: "!border-[#BFBFBF] focus:!border-primary",
              id: "phoneNumber",
              name: "phoneNumber",

              control,
              value:
                leadDetails?.id && leadDetails?.customerDetail?.phoneNumber,
              country: "ch",
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("leads.customer_details.mobile_number")}`,
              htmlFor: "number",
              className: "mb-[10px]",
            },
            field: {
              type: Field.phone,
              className: " !border-[#BFBFBF] focus:!border-primary",
              id: "mobileNumber",
              name: "mobileNumber",
              control,
              value:
                leadDetails?.id && leadDetails?.customerDetail?.mobileNumber,
              country: "ch",
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
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
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
              text: `${translate("leads.customer_details.post_code")}`,
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
              className: "!p-4 !border-[#BFBFBF]",
              type: Field.select,
              id: "address.country",
              name: "address.country",
              options: Object.entries(staticEnums.Country).map(
                ([key, val]) => ({
                  value: key,
                  label: `${translate(val as string)}`,
                })
              ),
              control,
              value:
                (leadDetails?.id &&
                  leadDetails?.customerDetail?.address?.country) ||
                  Object.keys(staticEnums.Country)[0],
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
              text: `${translate("common.cancel_button")}`,
              inputType: "button",
              className:
                "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px]   text-dark hover:bg-none",
              onClick: onClick,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: `${translate(
                "leads.customer_details.save_changes_button"
              )}`,
              inputType: "submit",
              className:
                "rounded-lg px-4 min-w-[152px] w-fit h-[50px]  text-white hover:bg-none ",
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
        text: `${translate("login_detail.company_details.company_name")}`,
        htmlFor: "companyName",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className:
          "!p-4 !border-[#BFBFBF] border border-dark focus:!border-primary",
        inputType: "text",
        id: "companyName",
        name: "companyName",
        placeholder: `${translate("placeholders.company_name")}`,
        register,
        disabled: false,
        value: leadDetails?.id && leadDetails?.customerDetail?.companyName,
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
