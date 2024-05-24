import { Field } from "@/enums/form";
import { FormField, GenerateAddReasonFormField } from "@/types";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";

export const RejectOfferFields: GenerateAddReasonFormField = (
  register,
  loading,
  trigger,
  onClick,
  control,
  reason
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0 mt-3 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
      label: {
        text: `Reason`,
        htmlFor: "reason",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.select,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        id: "reason",
        name: "reason",
        options: Object.keys(staticEnums["RejectReason"]).map((item) => ({
          //   label: translate(`rejected_offer.options.${item}`),
          label: item,
          value: item,
        })),
        control,
        value: "",
      },
    },
    {
      containerClass: `mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]`,
      label: {
        text: `Other(Specify).`,
        htmlFor: "reasonDescription",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        id: "reasonDescription",
        name: "reasonDescription",
        register,
        rows: 2,
      },
    },

    {
      containerClass: "mt-[30px]",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("common.add_note_modal.button")}`,
        inputType: "submit",
        className:
          "rounded-lg w-[200px] px-4 w-[152px] h-[50px] text-white hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};

export const RejectOfferTextFields: GenerateAddReasonFormField = (
  register,
  loading,
  trigger,
  onClick,
  control
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0",
      label: {
        text: `Reason`,
        htmlFor: "reason",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        id: "reason",
        name: "reason",
        register,
      },
    },

    {
      containerClass: "mt-[30px] ",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate("common.add_note_modal.button")}`,
        inputType: "submit",
        className:
          "rounded-lg  w-[200px] px-4 w-[152px] h-[50px]  text-white hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
