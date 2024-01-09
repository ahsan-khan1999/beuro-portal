import { Field } from "@/enums/form";
import {
  FormField,
  GenerateLeadAddressFormField,
  GenerateLeadsFormField,
} from "@/types";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";

export const LeadsAddressDetailsFormField: GenerateLeadAddressFormField = (
  register,
  loading,
  control,
  handleBack,
  count
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [];

  for (let i = 1; i <= count; i++) {
    formField.push(
      {
        containerClass: "mt-6",
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
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
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
                className: "pl-4 !border-[#BFBFBF]",
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
        containerClass: "mt-5 mb-0 ",
        label: {
          text: translate("leads.address_details.description"),
          htmlFor: `description-${i}`,
          className: "mb-[10px]",
        },
        field: {
          type: Field.textArea,
          className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
          rows: 8,
          id: `description-${i}`,
          name: `description-${i}`,
          placeholder:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
          register,
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
            text: `${translate("common.cancel_button")}`,
            inputType: "button",
            className:
              "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px] text-dark hover-bg-none",
            onClick: () => handleBack && handleBack(),
          },
        },
        {
          containerClass: "mb-0",
          field: {
            type: Field.button,
            id: "button",
            text: `${translate("leads.address_details.save_changes_button")}`,
            inputType: "submit",
            className:
              "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
            loading,
          },
        },
      ],
    },
  });

  return formField;
};
