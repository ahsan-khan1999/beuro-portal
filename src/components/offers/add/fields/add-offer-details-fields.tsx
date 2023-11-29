import { Field } from "@/enums/form";
import { DivProps, FormField, GenerateLeadsCustomerFormField, GenerateOfferDateFormField, GenerateOffersFormField } from "@/types";
import icon from "@/assets/svgs/Vector.svg"
import { Control, FieldValue, FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import { staticEnums } from "@/utils/static";
export const AddOfferDetailsFormField: GenerateLeadsCustomerFormField = (
  register,
  loading,
  control,
  { customerType, type, customer, onCustomerSelect, customerDetails, onCancel, leadDetails, lead, content, handleContentSelect },
  setValue
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
              text: "Customer",
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
                    checked: leadDetails?.id && leadDetails?.type === "New Customer" || type === "New Customer"
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
                    checked: leadDetails?.id && leadDetails?.type === "Existing Customer" || type === "Existing Customer"
                  },
                },
              ],
            },
          },
          {
            label: {
              text: "Customer Type",
              htmlFor: "select",
              className: "mb-[10px]",
            },
            field: {
              className: `pl-4 !min-h-[54px] !border-dark  focus:!border-primary `,
              type: Field.select,
              id: "customerType",
              name: "customerType",
              options: Object.keys(staticEnums.CustomerType).map((item, key) => (
                {
                  value: item,
                  label: item
                }
              )),

              control,
              value: leadDetails && leadDetails.customerID?.customerType
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
              value: leadDetails && leadDetails.customerID?.email


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
              value: leadDetails?.id ? leadDetails?.customerID?.phoneNumber : customerDetails && customerDetails?.phoneNumber,


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
              value: leadDetails?.id ? leadDetails?.customerID?.phoneNumber : customerDetails && customerDetails?.mobileNumber
            },
          },

        ]
      }
    },
    {
      containerClass: "mt-5",
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-3 gap-x-3 ",
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
              options: content && content?.map((item, key) => (
                { label: item?.contentName, value: item?.id }
              )),
              control,
              // value:leadDetails && leadDetails?.
              onItemChange: handleContentSelect && handleContentSelect()
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
              value: leadDetails && leadDetails?.customerID?.address?.streetNumber

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

              inputType: "text",
              id: "address.postalCode",
              name: "address.postalCode",
              placeholder: "Enter Your Post Code",

              register,
              value: leadDetails && leadDetails?.customerID?.address?.postalCode


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
              options: Object.keys(staticEnums.Country).map((item) => (
                {
                  value: item,
                  label: item
                }
              )),
              control,
              value: leadDetails && leadDetails?.customerID?.address?.country


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
        setValue: setValue

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
        options: customer?.map((item, key) => (
          {
            value: item.id,
            label: item.fullName,
          }
        )),

        control,
        onItemChange: onCustomerSelect,
        value: leadDetails?.id ? leadDetails?.customerID?.id : customerDetails && customerDetails?.id,
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
        options: lead?.map((item, key) => (
          {
            value: item.id,
            label: item.refID,
          }
        )),

        control,
        // onItemChange: onCustomerSelect,
        value: lead?.length === 1 && lead[0]?.id,
        // setValue
      }
    }
    const divField = formField[fieldLeadIndex]?.field as DivProps; // Assert type
    if (divField && Array.isArray(divField.children)) {

      //@ts-expect-error
      divField.children.splice(fieldLeadIndex + 2, 0, leadField);
    }
  }


  return formField;
};


export const AddDateFormField: GenerateOfferDateFormField = (
  control,
  OnClick,
  count,
  handleRemoveDateField
) => {
  const formField: FormField[] = [
    {
      containerClass: "mt-5 relative",
      //@ts-expect-error
      field: {
        type: Field.div,
        id: "div-field",

        className: "grid grid-cols-3 gap-x-3 ",
        children: (count) && generateDateChildren(control, count, OnClick, handleRemoveDateField)

      },
    },
  ];
  return formField;
};

const generateDateChildren = (control: Control<FieldValues>, count: number, OnClick: () => void, handleRemoveDateField: (key:string) => void) => {
  return Array.from({ length: count }, (_, key) => {
    const isLastIndex = key === count - 1;

    const dateField = {
      containerClass: "mb-0 ",
      label: {
        text: "Date",
        htmlFor: `date.date_${key}`,
        className: "mb-[10px]",
      },
      field: {
        type: Field.dateRange,
        className: "!p-4 !border-dark focus:!border-primary w-full",
        id: `date.date_${key}`,
        name: `date.date_${key}`,
        remove: key > 0 && "Remove",
        onRemove: () => handleRemoveDateField(`date.date_${key}`),
        control,

      },
    };

    if (isLastIndex) {
      return [
        dateField,
        {
          containerClass: "mb-0 mt-[30px]",
          field: {
            type: Field.button,
            id: "button",
            text: "",
            inputType: "button",
            className:
              "rounded-lg border-[1px] border-[#4B4B4B] bg-[#fff] m-1 p-4  w-[40px] h-[40px] text-white hover-bg-none",
            onClick: OnClick,
            icon: icon,
          },

        },
      ];
    }

    return dateField;
  }).flat();

};


export const AddOfferDetailsSubmitFormField: GenerateOffersFormField = (
  register,
  loading,
  control,
  OnClick
) => {
  const formField: FormField[] = [
    {
      containerClass: "mb-0 mt-[30px]",
      field: {
        type: Field.button,
        id: "button",
        text: "Next",
        inputType: "submit",
        className:
          "rounded-lg bg-[#4A13E7] px-4  w-[152px] h-[50px] text-white hover-bg-none",
        loading,
      },
    },
  ];

  return formField;
};