import { Field } from "@/enums/form";
import { FormField, GenerateGeneralAddressFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const addGeneralAddressFormField: GenerateGeneralAddressFormField = (
  register,
  loading,
  control
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0 rounded-lg px-2 py-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("common.address_title")}`,
        htmlFor: "addresses",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        inputType: "text",
        id: "addresses",
        name: "addresses",
        register,
      },
    },

    {
      containerClass: "mb-0 mt-[90px]",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("common.add_new_address")}`,
        inputType: "submit",
        className: "rounded-lg text-white hover:bg-none w-full",
        loading,
      },
    },
  ];

  return formField;
};
