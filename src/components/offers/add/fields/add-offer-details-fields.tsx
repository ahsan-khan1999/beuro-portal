import { Field } from "@/enums/form";
import {
  DivProps,
  FormField,
  GenerateLeadsCustomerFormField,
  GenerateOfferDateFormField,
  GenerateOffersFormField,
} from "@/types";
import icon from "@/assets/svgs/Vector.svg";
import {
  Control,
  FieldValue,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { staticEnums } from "@/utils/static";
import { OffersTableRowTypes } from "@/types/offers";
import { useTranslation } from "next-i18next";
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
      containerClass: "mt-6",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5",
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
              className: `pl-4 !border-[#BFBFBF]  focus:!border-primary `,
              type: Field.select,
              id: "customerType",
              name: "customerType",
              options:
                Object.keys(staticEnums.CustomerType)
                  ?.slice(1)
                  ?.map((item, key) => ({
                    value: item,
                    label: item,
                  })) || [],

              control,
              value:
                (offerDetails && offerDetails.customerID?.customerType) || "",
            },
          },
          {
            label: {
              text: translate("offers.offer_details.full_name"),
              htmlFor: "fullName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "fullName",
              name: "fullName",

              placeholder: `${translate("offers.placeholders.name")}`,
              register,
              // value: leadDetails && leadDetails.customerDetail?.fullName
            },
          },

          {
            containerClass: "mb-5",
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
              type: Field.phone,
              className: "!border-[#BFBFBF] focus:!border-primary",
              id: "phoneNumber",
              name: "phoneNumber",
              country: "ch",
              control,
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
              type: Field.phone,
              className: "!border-[#BFBFBF] focus:!border-primary",
              id: "mobileNumber",
              name: "mobileNumber",
              country: "ch",
              control,
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
      containerClass: "mt-5",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2  xl:grid-cols-3 gap-x-3 gap-y-5 ",
        children: [
          {
            containerClass: "mb-0 col-span-1",
            label: {
              text: `${translate("sidebar.customer.content")}`,
              htmlFor: "content",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !border-[#BFBFBF]  focus:!border-primary ",
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
              className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
            field: {
              className: "pl-4 !border-[#BFBFBF]",
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
                (offerDetails && offerDetails?.customerID?.address?.country) ||
                Object.keys(staticEnums.Country)[0],
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
        className: `pl-4 !border-[#BFBFBF]  focus:!border-primary `,
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
        value: offerDetails?.id
          ? offerDetails?.leadID?.customerID
          : "",
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
        className: `pl-4 !border-[#BFBFBF]  focus:!border-primary `,
        type: Field.select,
        id: "leadID",
        name: "leadID",
        options: lead?.map((item) => ({
          value: item.id,
          label: item.refID,
        })),
        control,
        // value:""
        value: offerDetails?.id && offerDetails?.leadID?.id ||
          (lead && lead?.length > 0 && lead?.at(0)?.id || leadID) ||
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
  offerDetails
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-5 relative",
      //@ts-expect-error
      field: {
        type: Field.div,
        id: "div-field1",
        className: "grid grid-cols-1 xl:grid-cols-3 gap-x-3 items-center",
        children: generateDateChildren(
          register,
          count,
          OnClick,
          handleRemoveDateField,
          offerDetails
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
  offerDetails: OffersTableRowTypes
) => {
  const { t: translate } = useTranslation();
  const dateformFields = [];
  for (let i = 0; i < count; i++) {
    dateformFields.push({
      containerClass: "mb-0 ",

      field: {
        type: Field.div,
        className: "grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5 mb-5",
        id: `date`,
        children: [
          {
            containerClass: "mb-0 ",
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
                "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full ",
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
    containerClass: "-mb-4 mlg:mt-0",
    field: {
      type: Field.button,
      id: "button",
      text: "",
      inputType: "submit",
      className:
        "rounded-lg border !border-[#BFBFBF] bg-[#fff] m-1 p-4 w-[40px] !h-[48px] text-white",
      onClick: () => OnClick({ startDate: "", endDate: "" }),
      icon: icon,
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
      containerClass: "mb-0 mt-5",
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
    containerClass: "mb-0 ",
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
