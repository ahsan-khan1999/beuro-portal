import { Field } from "@/enums/form";
import { FormField, GenerateOfferDateFormField } from "@/types";
import { useTranslation } from "next-i18next";
import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

export const AddDateFormFieldContract: GenerateOfferDateFormField = (
  register,
  OnClick,
  count,
  handleRemoveDateField,
  loading,
  control
) => {
  const { t: translate } = useTranslation();

  const formField: FormField[] = [
    {
      label: {
        text: `${translate("common.time")}`,
        htmlFor: "time",
        className: "text-base",
      },
      field: {
        type: Field.select,
        name: "time",
        id: "time",
        value: "",
        className:
          "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
        control,
        options: [
          { label: "12:00 AM", value: "12:00 AM" },
          { label: "12:15 AM", value: "12:15 AM" },
          { label: "12:30 AM", value: "12:30 AM" },
          { label: "12:45 AM", value: "12:45 AM" },
          { label: "13:00 AM", value: "13:00 AM" },
          { label: "13:15 AM", value: "13:15 AM" },
          { label: "13:30 AM", value: "13:30 AM" },
          { label: "13:45 AM", value: "13:45 AM" },
          { label: "14:00 AM", value: "14:00 AM" },
          { label: "14:15 AM", value: "14:15 AM" },
          { label: "14:30 AM", value: "14:30 AM" },
          { label: "14:45 AM", value: "14:45 AM" },
          { label: "15:00 AM", value: "15:00 AM" },
          { label: "15:15 AM", value: "15:15 AM" },
          { label: "15:30 AM", value: "15:30 AM" },
          { label: "15:45 AM", value: "15:45 AM" },
          { label: "16:00 AM", value: "16:00 AM" },
          { label: "16:15 AM", value: "16:15 AM" },
          { label: "16:30 AM", value: "16:30 AM" },
          { label: "16:45 AM", value: "16:45 AM" },
          { label: "17:00 AM", value: "17:00 AM" },
          { label: "17:15 AM", value: "17:15 AM" },
          { label: "17:30 AM", value: "17:30 AM" },
          { label: "17:45 AM", value: "17:45 AM" },
          { label: "18:00 AM", value: "18:00 AM" },
        ],
      },
    },
    {
      containerClass: "mt-0 relative",
      //@ts-expect-error
      field: {
        type: Field.div,
        id: "div-field1",
        className: "grid grid-cols-1 gap-x-3 items-center",
        children: generateDateChildren(
          register,
          count,
          OnClick,
          handleRemoveDateField,
          loading
        ),
      },
    },
  ];
  return formField;
};

export const generateDateChildren = (
  register: UseFormRegister<FieldValues>,
  count: number,
  OnClick: UseFieldArrayAppend<FieldValues, "date">,
  handleRemoveDateField: UseFieldArrayRemove,
  loading?: boolean
) => {
  const { t: translate } = useTranslation();
  const dateformFields = [];
  for (let i = 0; i < count; i++) {
    dateformFields.push({
      containerClass: "mb-0",
      field: {
        type: Field.div,
        className: "grid grid-cols-2 gap-x-3 mt-5",
        id: `date`,
        children: [
          {
            containerClass: "mb-0",
            label: {
              text: `${translate("common.start_date")}`,
              htmlFor: `date.${i}.startDate`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className:
                "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
              id: `date.${i}.startDate`,
              name: `date.${i}.startDate`,
              register,
              dateType: "date",
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: `${translate("common.end_date")}`,
              htmlFor: `date.${i}.endDate`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.date,
              className:
                "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full ",
              name: `date.${i}.endDate`,
              remove: i > 0 && `${translate("common.remove")}`,
              onRemove: () => handleRemoveDateField(i),
              register,
              dateType: "date",
            },
          },
        ],
      },
    });
  }
  dateformFields.push({
    containerClass: "mt-[20px]",
    field: {
      type: Field.div,
      id: "date-field",
      className: "flex space-x-3  justify-between",
      children: [
        {
          containerClass: "flex",
          field: {
            type: Field.button,
            id: "button",
            text: `${translate("common.add_new_date")}`,
            inputType: "button",
            className:
              "rounded-lg bg-[#4A13E7] px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
            onClick: () => OnClick({ startDate: "", endDate: "" }),
          },
        },
        {
          containerClass: "flex",
          field: {
            type: Field.button,
            id: "button",
            text: `${translate("common.update")}`,
            inputType: "submit",
            loading,
            className:
              "rounded-lg bg-[#4A13E7] px-4 min-w-[152px] w-fit h-[50px] text-white hover-bg-none",
          },
        },
      ],
    },
  });
  return dateformFields;
};
