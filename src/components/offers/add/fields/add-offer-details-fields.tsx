import { Field } from "@/enums/form";
import {
  DivProps,
  FormField,
  GenerateLeadsCustomerFormField,
  GenerateOfferDateFormField,
  GenerateOffersFormField,
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
import { OffersTableRowTypes } from "@/types/offers";
export const AddOfferDetailsFormField: GenerateLeadsCustomerFormField = (
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
    lead,
    content,
    handleContentSelect,
    selectedContent,
    offerDetails,
    leadID,
  },
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
                  ?.map((item, key) => ({
                    value: item,
                    label: translate(`customer_type.${item}`),
                  })) || [],

              control,
              value:
                (offerDetails && offerDetails.customerID?.customerType) || "",
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
              text: translate("offers.offer_details.full_name"),
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
              // value: leadDetails && leadDetails.customerDetail?.fullName
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
              value: offerDetails && offerDetails.customerID?.email,
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
              inputType: "tel",
              register,
              value:
                type === "New Customer"
                  ? ""
                  : offerDetails?.id
                  ? offerDetails?.leadID?.customerDetail?.phoneNumber
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
              register,
              value:
                type === "New Customer"
                  ? ""
                  : offerDetails?.id
                  ? offerDetails?.leadID?.customerDetail?.mobileNumber
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
                    label: item?.contentName,
                    value: item?.id,
                  }))) ||
                [],
              control,
              value: (offerDetails?.id && offerDetails?.content?.id) || "",
              // onItemChange: handleContentSelect && handleContentSelect,
            },
          },
          {
            containerClass: "mb-0 col-span-2",
            label: {
              text: `${translate("contracts.card_content.offer_title")}`,
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
          "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5 rounded-t-lg px-2 pt-5 bg-[#EDF4FF]",
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
                offerDetails && offerDetails?.customerID?.address?.streetNumber,
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
                "!p-4  !border-[#BFBFBF] focus:!border-primary focus:!border-primary",
              inputType: "text",
              id: "address.postalCode",
              name: "address.postalCode",
              placeholder: `${translate("offers.placeholders.post_code")}`,

              register,
              value:
                offerDetails && offerDetails?.customerID?.address?.postalCode,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.offer_details.country")}`,
              htmlFor: "address.country",
              className: "mb-[10px]",
            },
            // field: {
            //   className: "pl-4 !border-[#BFBFBF]",
            //   type: Field.select,
            //   id: "address.country",
            //   name: "address.country",

            //   options: Object.keys(staticEnums.Country).map((item) => ({
            //     value: item,
            //     label: translate(`countries.${item}`),
            //   })),
            //   control,
            //   value:
            //     (offerDetails && offerDetails?.customerID?.address?.country) ||
            //     Object.keys(staticEnums.Country)[0],
            // },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
              inputType: "text",
              id: "address.country",
              name: "address.country",
              register,
            },
          },
        ],
      },
    },
  ];
  // customer type
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
        placeholder: "Please Enter Company Name",
        register,
        setValue: setValue,
        value: offerDetails?.leadID?.customerDetail?.companyName || "",
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
        value: offerDetails?.id ? offerDetails?.leadID?.customerID : "",
        setValue,
      },
    };

    const divFieldCustomer = formField[fieldTypeIndex]?.field as DivProps;
    if (divFieldCustomer && Array.isArray(divFieldCustomer.children)) {
      divFieldCustomer.children.splice(fieldIndex + 1, 0, customerField as any);
    }
  }

  const fieldLeadIndex = formField.findIndex(
    (field: any) =>
      field?.field?.type === Field.div &&
      Array.isArray(field?.field?.children) &&
      field?.field?.children.some(
        (child: any) => child?.field?.id == "customerID"
      )
  );

  if (fieldLeadIndex !== -1 && type === "Existing Customer") {
    const leadField = {
      containerClass: "mb-0",
      label: {
        text: "Lead",
        htmlFor: "leadID",
        className: "mb-[10px]",
      },
      field: {
        className: `pl-4 !border-[#BFBFBF] focus:!border-primary`,
        type: Field.select,
        id: "leadID",
        name: "leadID",
        options: lead?.map((item) => ({
          value: item.id,
          label: item.refID,
        })),
        control,
        // value:""
        value:
          (offerDetails?.id && offerDetails?.leadID?.id) ||
          (lead && lead?.length > 0 && lead?.at(0)?.id) ||
          leadID ||
          leadID,
        // disabled: offerDetails?.leadID?.id ? true : false,
      },
    };
    const divField = formField[fieldLeadIndex]?.field as DivProps;
    if (divField && Array.isArray(divField.children)) {
      divField.children.splice(fieldLeadIndex + 2, 0, leadField as any);
    }
  }

  return formField;
};

export const AddDateFormField: GenerateOfferDateFormField = (
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
  offerDetails?: OffersTableRowTypes
) => {
  const { t: translate } = useTranslation();
  const dateformFields = [];

  for (let i = 0; i < count; i++) {
    dateformFields.push({
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
            containerClass: "mb-0",
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
    },
    field: {
      type: Field.select,
      className:
        "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
      name: "time",
      value: (offerDetails?.id && offerDetails?.time) || "08:00",
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
      control,
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

export const AddOfferDetailsSubmitFormField: GenerateOffersFormField = (
  register,
  loading,
  control,
  OnClick
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "float-right py-[30px]",
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

export const AddOfferDetailsDateFormField = (
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
      // remove: key > 0 && "Remove",
      // onRemove: () => handleRemoveDateField(key),
      register,
      dateType: "date",

      // value: offerDetails?.date?.length > 0 && offerDetails?.date[key]?.startDate
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
      // value: offerDetails?.date?.length > 0 && offerDetails?.date[key]?.endDate
    },
  };
  const fieldObj = { startDate: dateField, endDate: dateField2 };

  return fieldObj;
};
