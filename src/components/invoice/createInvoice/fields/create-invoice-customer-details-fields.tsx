import { Field } from "@/enums/form";
import {
  DivProps,
  FormField,
  GenerateCreateInvoiceFormField,
  GenerateInvoiceCustomerFormField,
  GenerateInvoiceDateFormField,
} from "@/types";
import {
  Control,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { InvoiceTableRowTypes } from "@/types/invoice";
import { getKeyByValue } from "@/utils/auth.util";

export const CreateInvoiceCustomerDetailsFormField: GenerateInvoiceCustomerFormField =
  (
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
      lead,
      content,
      handleContentSelect,
      selectedContent,
      invoiceDetails,
      leadID,
    },
    setValue
  ) => {
    const { t: translate } = useTranslation();

    let formField: FormField[] = [
      {
        field: {
          type: Field.div,
          id: "div-field",
          className:
            "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
          children: [
            {
              label: {
                text: `${translate("offers.offer_details.select_customer")}`,
                htmlFor: "type",
                className: "mb-[10px]",
              },
              field: {
                type: Field.div,
                id: "div-field",
                className: "flex flex-col",
                children: [
                  {
                    containerClass: "mb-0 pb-[6px]",
                    field: {
                      type: Field.radio,
                      value: "New Customer",
                      label: `${translate(
                        "offers.offer_details.new_customer"
                      )}`,
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
                      label: `${translate(
                        "offers.offer_details.exit_customer"
                      )}`,
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
                text: `${translate("offers.customer_type")}`,
                htmlFor: "customerType",
                className: "mb-[10px]",
              },
              field: {
                className: `pl-4 !border-[#BFBFBF] focus:!border-primary`,
                type: Field.select,
                id: "customerType",
                name: "customerType",
                options:
                  Object.keys(staticEnums.CustomerType)
                    ?.slice(1)
                    ?.map((item) => ({
                      value: item,
                      label: translate(`customer_type.${item}`),
                    })) || [],

                control,
                value:
                  (invoiceDetails &&
                    getKeyByValue(
                      staticEnums["CustomerType"],
                      invoiceDetails?.customerDetail?.customerType
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
                options: Object.keys(staticEnums.Gender).map((item) => ({
                  value: staticEnums.Gender[item],
                  label: translate(`gender.${item}`),
                })),

                control,
                value: "",
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: translate("customers.details.full_name"),
                htmlFor: "fullName",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                inputType: "text",
                id: "fullName",
                name: "fullName",
                placeholder: `${translate("offers.placeholders.name")}`,
                register,
                // value: invoiceDetails && invoiceDetails.customerDetail?.fullName,
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: `${translate("follow_up.follow_up_details.email")}`,
                htmlFor: "email",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                id: "email",
                name: "email",
                inputType: "text",
                placeholder: `${translate("offers.placeholders.email")}`,
                register,
                value: invoiceDetails && invoiceDetails?.customerDetail?.email,
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: `${translate("offers.offer_details.phone_number")}`,
                htmlFor: "phoneNumber",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!px-4 !border-[#BFBFBF] focus:!border-primary",
                id: "phoneNumber",
                name: "phoneNumber",
                placeholder: `${translate(
                  "offers.placeholders.phone_placeholder"
                )}`,
                inputType: "tel",
                register,
                value:
                  type === "New Customer"
                    ? ""
                    : invoiceDetails?.id
                    ? invoiceDetails?.customerDetail?.phoneNumber
                    : customerDetails && customerDetails?.phoneNumber,
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: `${translate("offers.offer_details.mobile_number")}`,
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
                value:
                  type === "New Customer"
                    ? ""
                    : invoiceDetails?.id
                    ? invoiceDetails?.customerDetail?.mobileNumber
                    : customerDetails && customerDetails?.mobileNumber,
              },
            },
          ],
        },
      },

      {
        field: {
          type: Field.div,
          id: "div-field",
          className:
            "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
          children: [
            {
              containerClass: "mb-0 col-span-1",
              label: {
                text: `${translate("sidebar.customer.content")}`,
                htmlFor: "content",
                className: "mb-[10px]",
              },
              field: {
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                type: Field.select,
                id: "content",
                name: "content",
                options:
                  (content &&
                    content?.map((item, key) => ({
                      label: item?.invoiceContent.title,
                      value: item?.id,
                    }))) ||
                  [],
                control,
                value:
                  (invoiceDetails?.id && invoiceDetails?.content?.id) || "",
                // onItemChange: handleContentSelect && handleContentSelect,
              },
            },
            {
              containerClass: "mb-0 col-span-2",
              label: {
                text: `${translate("contracts.card_content.invoice_title")}`,
                htmlFor: "title",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                inputType: "text",
                id: "title",
                name: "title",
                placeholder: `${translate("offers.placeholders.offer_title")}`,
                register,
              },
            },
          ],
        },
      },

      {
        containerClass: "mt-5",
        label: {
          text: `${translate("offers.offer_details.customer_address")}`,
          htmlFor: "name",
          className: "mb-[10px] text-[#1E1E1E] text-base font-semibold",
        },

        field: {
          type: Field.div,
          id: "div-field",
          className:
            "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
          children: [
            {
              containerClass: "mb-0",
              label: {
                text: `${translate("offers.offer_details.street_no")}`,
                htmlFor: "address.streetNumber",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                inputType: "text",
                id: "address.streetNumber",
                name: "address.streetNumber",
                placeholder: `${translate("offers.placeholders.street")}`,
                register,
                value:
                  invoiceDetails &&
                  invoiceDetails?.customerDetail?.address?.streetNumber,
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: `${translate("offers.offer_details.post_code")}`,
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
                placeholder: `${translate("offers.placeholders.post_code")}`,
                register,
                value:
                  invoiceDetails &&
                  invoiceDetails?.customerDetail?.address?.postalCode,
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: `${translate("offers.offer_details.country")}`,
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
          placeholder: `${translate(
            "offers.placeholders.company_placeholder"
          )}`,
          register,
          setValue: setValue,
          value: invoiceDetails?.customerDetail?.companyName || "",
        },
      };
      const divField = formField[fieldIndex]?.field as DivProps;
      if (divField && Array.isArray(divField.children)) {
        divField.children.splice(fieldIndex + 3, 0, companyNameField as any);
      }
    }

    // type
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
            key: item.id,
          })),

          control,
          onItemChange: onCustomerSelect,
          isLocalCustomer: true,
          // onSearchCustomer: (value: string) => onSearchCustomer(value),
          value: invoiceDetails?.id ? invoiceDetails?.customerID : "",
          setValue,
        },
      };

      const divFieldCustomer = formField[fieldTypeIndex]?.field as DivProps;
      if (divFieldCustomer && Array.isArray(divFieldCustomer.children)) {
        divFieldCustomer.children.splice(
          fieldIndex + 1,
          0,
          customerField as any
        );
      }
    }

    return formField;
  };

export const CreateInvoiceDateFormField: GenerateInvoiceDateFormField = (
  register,
  OnClick,
  count,
  handleRemoveDateField,
  loading,
  control
) => {
  const formField: FormField[] = [
    {
      containerClass: "relative",
      //@ts-expect-error
      field: {
        type: Field.div,
        id: "div-field1",
        className:
          "grid grid-cols-1 xl:grid-cols-3 gap-x-3 items-center rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
        children: generateDateChildren(
          register,
          count,
          OnClick,
          handleRemoveDateField,
          control
        ),
      },
    },
  ];
  return formField;
};

export const generateDateChildren = (
  register: UseFormRegister<FieldValues>,
  count: number,
  OnClick: UseFieldArrayAppend<FieldValues, "date">,
  handleRemoveDateField: UseFieldArrayRemove,
  control?: Control<FieldValues>,
  invoiceDetails?: InvoiceTableRowTypes
) => {
  const { t: translate } = useTranslation();
  const dateformFields = [];
  for (let i = 0; i < count; i++) {
    dateformFields?.push({
      containerClass: "mb-0 pt-5",
      field: {
        type: Field.div,
        className: "grid grid-cols-2 gap-x-3",
        id: `date`,
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("common.start_date")}`,
              htmlFor: `date.${i}.startDate`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className:
                "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
              id: `date.${i}.startDate`,
              name: `date.${i}.startDate`,
              register,
              dateType: "date",
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: `${translate("common.end_date")}`,
              htmlFor: `date.${i}.endDate`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className:
                "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
              name: `date.${i}.endDate`,
              remove: i > 0 && `${translate("common.remove")}`,
              onRemove: () => handleRemoveDateField(i),
              register,
              dateType: "date",
            },
          },
        ],
      },
    });
  }
  dateformFields.push({
    containerClass: "pt-5",
    label: {
      text: `${translate("common.time")}`,
      htmlFor: "time",
      className: "",
    },
    field: {
      type: Field.select,
      className:
        "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
      name: "time",
      control,
      value: (invoiceDetails?.id && invoiceDetails?.time) || "08:00",
      options: [
        { label: "00:00", value: "00:00" },
        { label: "00:15", value: "00:15" },
        { label: "00:30", value: "00:30" },
        { label: "00:45", value: "00:45" },
        { label: "01:00", value: "01:00" },
        { label: "01:15", value: "01:15" },
        { label: "01:30", value: "01:30" },
        { label: "01:45", value: "01:45" },
        { label: "02:00", value: "02:00" },
        { label: "02:15", value: "02:15" },
        { label: "02:30", value: "02:30" },
        { label: "02:45", value: "02:45" },
        { label: "03:00", value: "03:00" },
        { label: "03:15", value: "03:15" },
        { label: "03:30", value: "03:30" },
        { label: "03:45", value: "03:45" },
        { label: "04:00", value: "04:00" },
        { label: "04:15", value: "04:15" },
        { label: "04:30", value: "04:30" },
        { label: "04:45", value: "04:45" },
        { label: "05:00", value: "05:00" },
        { label: "05:15", value: "05:15" },
        { label: "05:30", value: "05:30" },
        { label: "05:45", value: "05:45" },
        { label: "06:00", value: "06:00" },
        { label: "06:15", value: "06:15" },
        { label: "06:30", value: "06:30" },
        { label: "06:45", value: "06:45" },
        { label: "07:00", value: "07:00" },
        { label: "07:15", value: "07:15" },
        { label: "07:30", value: "07:30" },
        { label: "07:45", value: "07:45" },
        { label: "08:00", value: "08:00" },
        { label: "08:15", value: "08:15" },
        { label: "08:30", value: "08:30" },
        { label: "08:45", value: "08:45" },
        { label: "09:00", value: "09:00" },
        { label: "09:15", value: "09:15" },
        { label: "09:30", value: "09:30" },
        { label: "09:45", value: "09:45" },
        { label: "10:00", value: "10:00" },
        { label: "10:15", value: "10:15" },
        { label: "10:30", value: "10:30" },
        { label: "10:45", value: "10:45" },
        { label: "11:00", value: "11:00" },
        { label: "11:15", value: "11:15" },
        { label: "11:30", value: "11:30" },
        { label: "11:45", value: "11:45" },
        { label: "12:00", value: "12:00" },
        { label: "12:15", value: "12:15" },
        { label: "12:30", value: "12:30" },
        { label: "12:45", value: "12:45" },
        { label: "13:00", value: "13:00" },
        { label: "13:15", value: "13:15" },
        { label: "13:30", value: "13:30" },
        { label: "13:45", value: "13:45" },
        { label: "14:00", value: "14:00" },
        { label: "14:15", value: "14:15" },
        { label: "14:30", value: "14:30" },
        { label: "14:45", value: "14:45" },
        { label: "15:00", value: "15:00" },
        { label: "15:15", value: "15:15" },
        { label: "15:30", value: "15:30" },
        { label: "15:45", value: "15:45" },
        { label: "16:00", value: "16:00" },
        { label: "16:15", value: "16:15" },
        { label: "16:30", value: "16:30" },
        { label: "16:45", value: "16:45" },
        { label: "17:00", value: "17:00" },
        { label: "17:15", value: "17:15" },
        { label: "17:30", value: "17:30" },
        { label: "17:45", value: "17:45" },
        { label: "18:00", value: "18:00" },
        { label: "18:15", value: "18:15" },
        { label: "18:30", value: "18:30" },
        { label: "18:45", value: "18:45" },
        { label: "19:00", value: "19:00" },
        { label: "19:15", value: "19:15" },
        { label: "19:30", value: "19:30" },
        { label: "19:45", value: "19:45" },
        { label: "20:00", value: "20:00" },
        { label: "20:15", value: "20:15" },
        { label: "20:30", value: "20:30" },
        { label: "20:45", value: "20:45" },
        { label: "21:00", value: "21:00" },
        { label: "21:15", value: "21:15" },
        { label: "21:30", value: "21:30" },
        { label: "21:45", value: "21:45" },
        { label: "22:00", value: "22:00" },
        { label: "22:15", value: "22:15" },
        { label: "22:30", value: "22:30" },
        { label: "22:45", value: "22:45" },
        { label: "23:00", value: "23:00" },
        { label: "23:15", value: "23:15" },
        { label: "23:30", value: "23:30" },
        { label: "23:45", value: "23:45" },
      ],
    },
  });

  dateformFields.push({
    containerClass: "mt-[50px]",
    field: {
      type: Field.button,
      id: "button",
      text: `${translate("common.add_new_date")}`,
      inputType: "submit",
      className:
        "rounded-lg bg-[#4A13E7] px-4 min-w-[152px] w-fit !h-[48px] text-white hover-bg-none",
      onClick: () => OnClick({ startDate: "", endDate: "" }),
    },
  });

  return dateformFields;
};

export const CreateInvoiceDetailsSubmitFormField: GenerateCreateInvoiceFormField =
  (register, loading, control, OnClick) => {
    const { t: translate } = useTranslation();
    const formField: FormField[] = [
      {
        containerClass: "float-right mt-[30px]",
        field: {
          type: Field.button,
          id: "button",
          text: `${translate("offers.offer_details.next_button")}`,
          inputType: "submit",
          className:
            "rounded-lg bg-[#4A13E7] px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
          loading,
        },
      },
    ];

    return formField;
  };

export const CreateInvoiceDetailsDateFormField = (
  register: UseFormRegister<FieldValues>,
  OnClick: UseFieldArrayAppend<FieldValues, "date">,
  count: number,
  handleRemoveDateField: UseFieldArrayRemove
) => {
  const { t: translate } = useTranslation();
  const dateField = {
    containerClass: "mb-0",
    label: {
      text: "Start Date",
      htmlFor: `date.startDate`,
      className: "mb-[10px]",
    },
    field: {
      type: Field.date,
      className: "!p-4 !border-[#BFBFBF] focus:!border-primary w-full",
      id: `date.startDate`,
      name: `date.startDate`,
      register,
      dateType: "date",
    },
  };
  const dateField2 = {
    containerClass: "mb-0 w-full",
    label: {
      text: "End Date",
      htmlFor: `date.endDate`,
      className: "mb-[10px]",
    },
    field: {
      type: Field.date,
      className: "!p-4 !border-[#BFBFBF] focus:!border-primary w-full",
      id: `date.endDate`,
      name: `date.endDate`,
      remove: `${translate("common.remove")}`,
      onRemove: () => handleRemoveDateField(count),
      register,
      dateType: "date",
    },
  };
  const fieldObj = { startDate: dateField, endDate: dateField2 };

  return fieldObj;
};
