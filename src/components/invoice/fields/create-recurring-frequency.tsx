import { Field } from "@/enums/form";
import { FormField, GenerateInvoiceFormField } from "@/types";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";

export const CreateRecurringInvoiceFrequencyFormField: GenerateInvoiceFormField =
  (register, loading, control, markItRecuring, invoiceDetails) => {
    const { t: translate } = useTranslation();
    const formField: FormField[] = [
      {
        containerClass: `mt-4`,
        label: {
          text: `${translate("invoice.create_invoice_modal.date_of_invoice")}`,
          htmlFor: "dateOfNextInvoice",
          className: "mb-[12px]",
        },
        field: {
          type: Field.date,
          className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
          id: "dateOfNextInvoice",
          name: "dateOfNextInvoice",
          register,
          dateType: "date",
        },
      },
      {
        containerClass: `mb-0 mt-4 `,
        label: {
          text: `${translate("invoice.create_invoice_modal.frequency")}`,
          htmlFor: "frequency",
          className: "mb-[12px]",
        },
        field: {
          className:
            "!p-4 !h-[58px] !border-[#8F8F8F] focus:!border-primary text-[#8F8F8F] text-[16px] font-normal",
          value: " ",
          type: Field.select,
          id: "frequency",
          name: "frequency",
          options: Object.keys(staticEnums["Frequency"]).map((item) => ({
            label: item,
            value: staticEnums["Frequency"][item],
          })),
          control,
        },
      },

      {
        containerClass: "mb-0 mt-[13px]",
        field: {
          type: Field.button,
          id: "button",
          text: translate("invoice.create_invoice_modal.update_invoice"),
          inputType: "submit",
          className: "hover:bg-none",
          loading,
        },
      },
    ];

    return formField;
  };
