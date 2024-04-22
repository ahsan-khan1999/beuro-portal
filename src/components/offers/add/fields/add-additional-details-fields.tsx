import { Field } from "@/enums/form";
import { FormField, GenerateOffersFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const AddOfferAdditionalDetailsFormField: GenerateOffersFormField = (
  register,
  loading,
  control,
  onClick,
  count,
  { content, contentDetails, invoiceDetails, onContentSelect, selectedContent },
  setValue,
  trigger
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
      label: {
        text: `${translate("offers.additional_details.choose")}`,
        htmlFor: "content",
        className: "mb-[10px] text-[#344054] text-base font-medium",
      },
      field: {
        className: "!px-2 !border-[#BFBFBF] focus:!border-primary",
        type: Field.select,
        id: "content",
        name: "content",
        options:
          content?.map((item) => ({
            label: item.contentName,
            value: item.id,
          })) || [],
        control,
        value: selectedContent || "",
        onItemChange: onContentSelect,
        trigger,
      },
    },
    {
      containerClass: "rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("offers.additional_details.add_new")}`,
        htmlFor: "additionalDetails",
        className: "mb-[10px] text-[#344054] text-base font-medium",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        id: "additionalDetails",
        name: "additionalDetails",
        control,
        trigger,
      },
    },
    {
      containerClass: "my-[30px]",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex justify-end items-center space-x-[18px]",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "buttonBack",
              text: `${translate("common.back_button")}`,
              inputType: "button",
              className:
                "rounded-lg bg-[#fff] px-4 border-[1px] border-[#C7C7C7] w-[152px] h-[50px] text-black hover-bg-none",
              onClick: onClick,
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.button,
              id: "button",
              text: translate("offers.additional_details.save_button"),
              inputType: "submit",
              className:
                "rounded-lg bg-[#4A13E7] px-4 w-[152px] h-[50px] text-white hover-bg-none",
              loading,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
