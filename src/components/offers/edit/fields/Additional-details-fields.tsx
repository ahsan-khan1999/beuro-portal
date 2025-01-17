import { Field } from "@/enums/form";
import { FormField, GenerateOffersFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const OfferEditAdditionalDetailsFormField: GenerateOffersFormField = (
  register,
  loading,
  control
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0",
      label: {
        text: `${translate("offers.additional_details.choose")}`,
        htmlFor: "chooseFromExisting",
        className: "mb-[10px]",
      },
      field: {
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
        type: Field.select,
        value: "Office Cleaning ",
        id: "chooseFromExisting",
        name: "chooseFromExisting",
        options: [
          {
            value: "Office Cleaning",
            label: "Office Cleaning",
          },
        ],
        control,
      },
    },
    {
      containerClass: "mt-5",
      label: {
        text: `${translate("offers.additional_details.add_new")}`,
        htmlFor: "additionlData",
        className: "mb-[10px] text-[#4D4D4D]",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        id: "additionlData",
        name: "additionlData",
        control,
      },
    },

    {
      containerClass: "mt-[30px] mb-0",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("offers.additional_details.save_button")}`,
        inputType: "submit",
        className:
          "rounded-lg p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
