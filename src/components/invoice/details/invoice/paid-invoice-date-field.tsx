import { Field } from "@/enums/form";
import { FormField, GeneratePaidDateInvoiceFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const PaidDateInvoiceFormField: GeneratePaidDateInvoiceFormField = (
  register,
  loading
) => {
  const { t: translate } = useTranslation();

  const formField: FormField[] = [
    {
      field: {
        type: Field.date,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary w-full",
        id: "paidDate",
        name: "paidDate",
        dateType: "date",
        register,
      },
    },
    {
      containerClass: "mb-0 mt-4",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("common.save_button")}`,
        inputType: "submit",
        className: "hover:bg-none w-full",
        loading,
      },
    },
  ];

  return formField;
};
