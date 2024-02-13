import { Field } from "@/enums/form";
import { FormField, GenerateOffersFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const OfferAddressDetailsFormField: GenerateOffersFormField = (
  register,
  loading
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      label: {
        text: `${translate("offers.address_details.heading")}`,
        htmlFor: "address-1-details",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 2xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0 ",
            label: {
              text: `${translate("offers.address_details.street_no")}`,
              htmlFor: "streetNo",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4  !border-[#BFBFBF] focus:!border-primary ",
              inputType: "text",
              id: "streetNo",
              name: "streetNo",
              placeholder: "Zweibrückenstraße, 12",
              register,
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: `${translate("offers.address_details.post_code")}`,
              htmlFor: "postCode",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4  !border-[#BFBFBF]  focus:!border-primary ",
              inputType: "text",
              id: "postCode",
              name: "postCode",
              placeholder: "1234",
              register,
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: `${translate("offers.address_details.country")}`,
              htmlFor: "country",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF]  focus:!border-primary ",
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
      containerClass: "mt-5 mb-0 ",
      label: {
        text: `${translate("offers.address_details.description")}`,
        htmlFor: "description",
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF]  focus:!border-primary ",
        id: "description",
        name: "description",
        rows: 2,
        placeholder:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
        register,
      },
    },

    {
      containerClass: "mt-[30px] border-t border-black border-opacity-10 pt-5",
      label: {
        text: `${translate("offers.address_details.sub_heading")}`,
        htmlFor: "address-1-details",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.div,
        id: "div-field",
        className: "grid grid-cols-2 2xl:grid-cols-3 gap-x-3 gap-y-5",
        children: [
          {
            containerClass: "mb-0 ",
            label: {
              text: `${translate("offers.address_details.street_no")}`,
              htmlFor: "streetNo",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4  !border-[#BFBFBF]  focus:!border-primary ",
              inputType: "text",
              id: "streetNo",
              name: "streetNo",
              placeholder: "Zweibrückenstraße, 12 ",
              register,
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: `${translate("offers.address_details.post_code")}`,
              htmlFor: "postCode",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-[#BFBFBF]  focus:!border-primary ",
              inputType: "text",
              id: "postCode",
              name: "postCode",
              placeholder: "1234",
              register,
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: `${translate("offers.address_details.country")}`,
              htmlFor: "country",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4  !border-[#BFBFBF]  focus:!border-primary ",
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
      containerClass: "mt-5 mb-0 ",
      label: {
        text: `${translate("offers.address_details.description")}`,
        htmlFor: "description",
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF]  focus:!border-primary ",
        id: "description",
        rows: 2,
        name: "description",
        placeholder:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
        register,
      },
    },

    {
      containerClass: "mb-0 mt-[25px]",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("offers.address_details.save_button")}`,
        inputType: "submit",
        className: "rounded-lg p-4 w-[152px] h-[50px] text-white hover-bg-none",
        loading,
      },
    },
  ];

  return formField;
};
