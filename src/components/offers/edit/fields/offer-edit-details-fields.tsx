import { Field } from "@/enums/form";
import { FormField, GenerateOffersFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const OfferEditDetailsFormField: GenerateOffersFormField = (
  register,
  loading,
  control
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 2xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.offer_details.select_customer")}`,
              htmlFor: "selectCustomer",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4  !border-dark  focus:!border-primary ",
              type: Field.select,
              value: "Rahal Ahmed Ali",
              id: "selectCustomer",
              name: "selectCustomer",
              options: [{ value: "Rahal Ahmed Ali", label: "Rahal Ahmed Ali" }],
              control,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.offer_details.customer_name")}`,
              htmlFor: "customerName",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "customerName",
              name: "customerName",
              placeholder: "Rahal Ahmed",
              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.offer_details.email")}`,
              htmlFor: "email",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "email",
              id: "email",
              name: "email",
              placeholder: "Rahal1234@gmail.com",
              register,
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
        className: "grid grid-col-1 2xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0 2xl:col-span-2",
            label: {
              text: `${translate("offers.offer_details.offer_title")}`,
              htmlFor: "offerTitle",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4  !border-dark  focus:!border-primary ",
              type: Field.select,
              id: "offerTitle",
              value: "Office Cleaning Munich Lorem ipsum dollar smith emit",
              name: "offerTitle",
              options: [
                {
                  value: "Office Cleaning Munich Lorem ipsum dollar smith emit",
                  label: "Office Cleaning Munich Lorem ipsum dollar smith emit",
                },
              ],
              control,
            },
          },
          {
            containerClass: "mb-0 2xl:col-span-1",
            label: {
              text: `${translate("offers.offer_details.offer_number")}`,
              htmlFor: "offerNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "text",
              id: "offerNumber",
              name: "offerNumber",
              placeholder: "A-2000",
              register,
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
        className: "grid grid-cols-2 2xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.offer_details.customer_type")}`,
              htmlFor: "customerType",
              className: "mb-[10px]",
            },
            field: {
              className: "!p-4  !border-dark  focus:!border-primary ",
              type: Field.select,
              id: "customerType",
              name: "customerType",
              value: "Individual",
              options: [{ value: "Individual", label: "Individual" }],
              control,
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
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "number",
              id: "phoneNumber",
              name: "phoneNumber",
              placeholder: "+49 445612 2112",
              register,
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
              className: "!p-4 !border-dark focus:!border-primary ",
              inputType: "number",
              id: "mobileNumber",
              name: "mobileNumber",
              placeholder: "+49 445612 2112",
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
        className: "grid grid-cols-2 2xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.offer_details.street_no")}`,
              htmlFor: "streetNumber",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark focus:!border-primary",
              inputType: "text",
              id: "streetNumber",
              name: "streetNumber",
              placeholder: "Please Enter Street Number",
              register,
            },
          },

          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.offer_details.post_code")}`,
              htmlFor: "post code",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4  !border-dark focus:!border-primary focus:!border-primary",
              inputType: "number",
              id: "postCode",
              name: "postCode",
              placeholder: "Enter Your Post Code",

              register,
            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.offer_details.country")}`,
              htmlFor: "country",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className:
                "!p-4  !border-dark focus:!border-primary focus:!border-primary",
              inputType: "text",
              id: "country",
              name: "country",
              placeholder: "Switzerland",

              register,
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
        className: "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.offer_details.date")}`,
              htmlFor: "date",
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className: "!p-4 !border-dark focus:!border-primary",
              id: "date",
              name: "date",
              register,
              dateType:"date"

            },
          },
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("offers.offer_details.date")}`,
              htmlFor: "date",
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className: "!p-4 !border-dark focus:!border-primary",
              id: "date",
              name: "date",
              register,
              dateType:"date"

            },
          },
        ],
      },
    },

    {
      containerClass: "mb-0 mt-[30px]",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("offers.offer_details.save_button")}`,
        inputType: "submit",
        className:
          "rounded-lg   p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
