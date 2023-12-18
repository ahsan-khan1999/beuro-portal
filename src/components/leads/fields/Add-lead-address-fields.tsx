import { Field } from "@/enums/form";
import {
  FormField,
  GenerateLeadAddressFormField,
  GenerateLeadsFormField,
} from "@/types";
import { ComponentsType } from "../add/AddNewLeadsData";
import { staticEnums } from "@/utils/static";
import icon from "@/assets/svgs/Vector.svg";
import { useTranslation } from "next-i18next";

export const AddLeadAddressDetailsFormField: GenerateLeadAddressFormField = (
  register,
  loading,
  control,
  onHandleBack,
  count,
  handleAddNewAddress,
  handleRemoveAddress
) => {
  const formField: FormField[] = [];
  const { t: translate } = useTranslation();

  for (let i = 1; i <= count; i++) {
    formField.push(
      {
        containerClass: "mt-6 ",
        label: {
          text: translate("leads.address_details.heading"),
          htmlFor: `address-${i}-details`,
          className: "mb-[10px] text-[#8F8F8F]",
        },
        field: {
          type: Field.div,
          id: `div-field-${i}`,
          className: "grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5",
          children: [
            {
              containerClass: "mb-0 ",
              label: {
                text: translate("leads.address_details.street_no"),
                htmlFor: `streetNumber-${i}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark focus:!border-primary ",
                inputType: "text",
                id: `streetNumber-${i}`,
                name: `streetNumber-${i}`,
                placeholder: `Zweibrückenstraße, ${i}`,
                register,
              },
            },
            {
              containerClass: "mb-0 ",
              label: {
                text: translate("leads.address_details.post_code"),
                htmlFor: `postalCode-${i}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-dark focus:!border-primary ",
                inputType: "text",
                id: `postalCode-${i}`,
                name: `postalCode-${i}`,
                placeholder: `123${i}`,
                register,
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: translate("leads.address_details.country"),
                htmlFor: "address.country",
                className: "mb-[10px]",
              },
              field: {
                className: "pl-4 !border-dark",
                type: Field.select,
                id: `country-${i}`,
                name: `country-${i}`,
                options: Object.keys(staticEnums.Country).map((item) => ({
                  value: item,
                  label: item,
                })),
                control,
                value: "",
              },
            },
          ],
        },
      },
      {
        containerClass: "mt-6",
        field: {
          type: Field.div,
          id: "div-field",
          className: "grid grid-cols-1 relative w-full space-x-[18px] ",
          children: [
            {
              containerClass: "mt-5 mb-0 pb-10 border-b-2 border-lightGray",
              label: {
                text: translate("leads.address_details.description"),
                htmlFor: `description-${i}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.textArea,
                className: "!p-4 !border-dark focus:!border-primary",
                rows: 8,
                id: `description-${i}`,
                name: `description-${i}`,
                placeholder:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
                register,
              },
            },
            {
              containerClass: "mb-0 absolute -top-44 right-0",
              field: {
                type: Field.button,
                id: "button",
                text: "Remove",
                inputType: "button",
                className: `rounded-none p-2 bg-red !h-[30px] text-white hover-bg-none ${
                  i === 1 && "hidden"
                }`,
                onClick: handleRemoveAddress && handleRemoveAddress,
              },
            },
          ],
        },
      }
    );
  }

  formField.push({
    containerClass: "mt-6",
    field: {
      type: Field.div,
      id: "div-field",
      className: "flex space-x-[18px] ",
      children: [
        {
          containerClass: "mb-0",
          field: {
            type: Field.button,
            id: "button",
            text: `${translate("leads.address_details.back_button")}`,
            inputType: "button",
            className:
              "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px] text-dark hover-bg-none",
            onClick: () =>
              onHandleBack && onHandleBack(ComponentsType.customerAdd),
          },
        },
        {
          containerClass: "mb-0",
          field: {
            type: Field.button,
            id: "button",
            text: `${translate("leads.address_details.next_button")}`,
            inputType: "submit",
            className:
              "rounded-lg px-4 w-[152px] h-[50px] text-white hover-bg-none",
            loading,
          },
        },

        {
          containerClass: "mb-0",
          field: {
            type: Field.button,
            id: "button",
            className: ` absolute right-10 rounded-lg border-[1px] border-[#4B4B4B] bg-[#fff] m-1 p-4   h-[40px] text-white hover-bg-none ${
              count === 2 && "hidden"
            }`,
            onClick: handleAddNewAddress && handleAddNewAddress,
            icon: icon,
            name: "",
            // icon
          },
        },
      ],
    },
  });

  return formField;
};
