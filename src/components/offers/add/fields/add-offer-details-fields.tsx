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
                    label: "New Customer",
                    id: "type",
                    name: "type",
                    register,
                    checked:
                      (offerDetails?.id &&
                        offerDetails?.type === "New Customer") ||
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
                      (offerDetails?.id &&
                        offerDetails?.type === "Existing Customer") ||
                      type === "Existing Customer",
                  },
                },
              ],
            },
          },
          {
            label: {
              text: "Customer Type",
              htmlFor: "customerType",
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
                  label: item,
                })
              ),

              control,
              value: offerDetails && offerDetails.customerID?.customerType,
            },
          },
          {
            label: {
              text: translate("offers.offer_details.offer_number"),
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
            containerClass: "mb-5",
            label: { text: "Email Address", htmlFor: "email" },
            field: {
              type: Field.input,
              className: "!p-4    !border-dark  focus:!border-primary",
              id: "email",
              name: "email",
              inputType: "text",

              placeholder: "Please Enter Email Address",
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
              className: " !h-12  !border-dark  focus:!border-primary",
              id: "phoneNumber",
              name: "phoneNumber",
              country: "ch",
              control,
              value: offerDetails?.id
                ? offerDetails?.customerID?.phoneNumber
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
              className: " !h-12  !border-dark  focus:!border-primary",
              id: "mobileNumber",
              name: "mobileNumber",
              country: "ch",
              control,
              value: offerDetails?.id
                ? offerDetails?.customerID?.phoneNumber
                : customerDetails && customerDetails?.mobileNumber,
            },
          },
        ],
      },
    },
    {
      containerClass: "mt-5",
      // @ts-ignore
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2  xl:grid-cols-3 gap-x-3 gap-y-5 ",
        children: [
          {
            containerClass: "mb-0 col-span-1",
            label: {
              text: "Content ",
              htmlFor: "content",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4 !h-[54px] !border-dark  focus:!border-primary ",
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
              value: (offerDetails?.id && offerDetails?.content) || "",

              onItemChange: handleContentSelect && handleContentSelect(),
            },
          },
          {
            containerClass: "mb-0 col-span-2",
            label: {
              text: "Offer Title",
              htmlFor: "title",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "title",
              name: "title",
              placeholder: "Offer Title",
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
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "text",
              id: "address.streetNumber",
              name: "address.streetNumber",

              placeholder: "Please Enter Street Number",
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
                "!p-4  !border-dark focus:!border-primary focus:!border-primary",
              inputType: "text",
              id: "address.postalCode",
              name: "address.postalCode",
              placeholder: "Enter Your Post Code",

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
              className: "pl-4  min-h-[54px] !border-dark  ",
              type: Field.select,
              id: "address.country",
              name: "address.country",
              options: Object.keys(staticEnums.Country).map((item) => ({
                value: item,
                label: item,
              })),
              control,
              value: offerDetails && offerDetails?.customerID?.address?.country,
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
        value: offerDetails?.id
          ? offerDetails?.customerID?.id
          : customerDetails && customerDetails?.id,
        setValue,
      },
    };
    // formField[fieldIndex]?.field?.children?.splice(fieldIndex + 2, 0, companyNameField)

    const divFieldCustomer = formField[fieldTypeIndex]?.field as DivProps; // Assert type
    if (divFieldCustomer && Array.isArray(divFieldCustomer.children)) {
      //@ts-expect-error
      divFieldCustomer.children.splice(fieldIndex + 1, 0, customerField);
    }
  }

  const fieldLeadIndex = formField.findIndex(
    (field) =>
      field?.field?.type === Field.div &&
      //@ts-expect-error
      Array.isArray(field?.field?.children) &&
      //@ts-expect-error
      field?.field?.children.some((child) => child?.field?.id == "customerID")
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
        className: `pl-4 !min-h-[54px] !border-dark  focus:!border-primary `,
        type: Field.select,
        id: "leadID",
        name: "leadID",
        options: lead?.map((item, key) => ({
          value: item.id,
          label: item.refID,
        })),

        control,
        // onItemChange: onCustomerSelect,
        value: offerDetails?.id && offerDetails?.leadID?.id || (lead?.length === 1 && customerDetails?.id) && lead[0]?.id,
        // setValue
      },
    };
    const divField = formField[fieldLeadIndex]?.field as DivProps; // Assert type
    if (divField && Array.isArray(divField.children)) {
      //@ts-expect-error
      divField.children.splice(fieldLeadIndex + 2, 0, leadField);
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
        className: "grid grid-cols-1 xl:grid-cols-3 gap-x-3",
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
  const dateformFields = [];
  for (let i = 0; i < count; i++) {
    dateformFields.push({
      containerClass: "mb-0 ",

      field: {
        type: Field.div,
        className: "grid grid-cols-2 gap-x-3",
        id: `date`,
        children: [
          {
            containerClass: "mb-0 ",
            label: {
              text: "Start Date",
              htmlFor: `date.${i}.startDate`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className: "!p-4 !border-dark focus:!border-primary w-full",
              id: `date.${i}.startDate`,
              name: `date.${i}.startDate`,

              register,
              dateType: "date",
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: "End Date",
              htmlFor: `date.${i}.endDate`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className: "!p-4 !border-dark focus:!border-primary w-full",
              id: `date.${i}.endDate`,
              name: `date.${i}.endDate`,
              remove: i > 0 && "Remove",
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
    containerClass: "mb-0 mt-3 maxSize:mt-[33px]",
    field: {
      type: Field.button,
      id: "button",
      text: "",
      inputType: "submit",
      className:
        "rounded-lg border-[1px] border-[#4B4B4B] bg-[#fff] m-1 p-4 w-[40px] h-[40px] text-white",
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
      containerClass: "mb-0 mt-[30px]",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("offers.offer_details.next_button")}`,
        inputType: "submit",
        className:
          "rounded-lg bg-[#4A13E7] px-4  w-[152px] h-[50px] text-white hover-bg-none",
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
  const dateField = {
    containerClass: "mb-0 ",
    label: {
      text: "Start Date",
      htmlFor: `date.startDate`,
      className: "mb-[10px]",
    },
    field: {
      type: Field.date,
      className: "!p-4 !border-dark focus:!border-primary w-full",
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
      className: "!p-4 !border-dark focus:!border-primary w-full",
      id: `date.endDate`,
      name: `date.endDate`,
      remove: "Remove",
      onRemove: () => handleRemoveDateField(count),
      register,
      dateType: "date",
      // value: offerDetails?.date?.length > 0 && offerDetails?.date[key]?.endDate
    },
  };
  const fieldObj = { startDate: dateField, endDate: dateField2 };

  return fieldObj;
};
