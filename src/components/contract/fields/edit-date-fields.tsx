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
  control,
  workDates
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
          { label: "00:00", value: "00:00" },
          { label: "00:15", value: "00:15" },
          { label: "00:30", value: "00:30" },
          { label: "00:45", value: "00:45" },
          { label: "01:00", value: "01:00" },
          { label: "01:15", value: "01:15" },
          { label: "01:30", value: "01:30" },
          { label: "01:45", value: "01:45" },
          { label: "02:00", value: "02:00" },
          { label: "02:15", value: "02:15" },
          { label: "02:30", value: "02:30" },
          { label: "02:45", value: "02:45" },
          { label: "03:00", value: "03:00" },
          { label: "03:15", value: "03:15" },
          { label: "03:30", value: "03:30" },
          { label: "03:45", value: "03:45" },
          { label: "04:00", value: "04:00" },
          { label: "04:15", value: "04:15" },
          { label: "04:30", value: "04:30" },
          { label: "04:45", value: "04:45" },
          { label: "05:00", value: "05:00" },
          { label: "05:15", value: "05:15" },
          { label: "05:30", value: "05:30" },
          { label: "05:45", value: "05:45" },
          { label: "06:00", value: "06:00" },
          { label: "06:15", value: "06:15" },
          { label: "06:30", value: "06:30" },
          { label: "06:45", value: "06:45" },
          { label: "07:00", value: "07:00" },
          { label: "07:15", value: "07:15" },
          { label: "07:30", value: "07:30" },
          { label: "07:45", value: "07:45" },
          { label: "08:00", value: "08:00" },
          { label: "08:15", value: "08:15" },
          { label: "08:30", value: "08:30" },
          { label: "08:45", value: "08:45" },
          { label: "09:00", value: "09:00" },
          { label: "09:15", value: "09:15" },
          { label: "09:30", value: "09:30" },
          { label: "09:45", value: "09:45" },
          { label: "10:00", value: "10:00" },
          { label: "10:15", value: "10:15" },
          { label: "10:30", value: "10:30" },
          { label: "10:45", value: "10:45" },
          { label: "11:00", value: "11:00" },
          { label: "11:15", value: "11:15" },
          { label: "11:30", value: "11:30" },
          { label: "11:45", value: "11:45" },
          { label: "12:00", value: "12:00" },
          { label: "12:15", value: "12:15" },
          { label: "12:30", value: "12:30" },
          { label: "12:45", value: "12:45" },
          { label: "13:00", value: "13:00" },
          { label: "13:15", value: "13:15" },
          { label: "13:30", value: "13:30" },
          { label: "13:45", value: "13:45" },
          { label: "14:00", value: "14:00" },
          { label: "14:15", value: "14:15" },
          { label: "14:30", value: "14:30" },
          { label: "14:45", value: "14:45" },
          { label: "15:00", value: "15:00" },
          { label: "15:15", value: "15:15" },
          { label: "15:30", value: "15:30" },
          { label: "15:45", value: "15:45" },
          { label: "16:00", value: "16:00" },
          { label: "16:15", value: "16:15" },
          { label: "16:30", value: "16:30" },
          { label: "16:45", value: "16:45" },
          { label: "17:00", value: "17:00" },
          { label: "17:15", value: "17:15" },
          { label: "17:30", value: "17:30" },
          { label: "17:45", value: "17:45" },
          { label: "18:00", value: "18:00" },
          { label: "18:15", value: "18:15" },
          { label: "18:30", value: "18:30" },
          { label: "18:45", value: "18:45" },
          { label: "19:00", value: "19:00" },
          { label: "19:15", value: "19:15" },
          { label: "19:30", value: "19:30" },
          { label: "19:45", value: "19:45" },
          { label: "20:00", value: "20:00" },
          { label: "20:15", value: "20:15" },
          { label: "20:30", value: "20:30" },
          { label: "20:45", value: "20:45" },
          { label: "21:00", value: "21:00" },
          { label: "21:15", value: "21:15" },
          { label: "21:30", value: "21:30" },
          { label: "21:45", value: "21:45" },
          { label: "22:00", value: "22:00" },
          { label: "22:15", value: "22:15" },
          { label: "22:30", value: "22:30" },
          { label: "22:45", value: "22:45" },
          { label: "23:00", value: "23:00" },
          { label: "23:15", value: "23:15" },
          { label: "23:30", value: "23:30" },
          { label: "23:45", value: "23:45" },
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
          loading,
          workDates
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
  loading?: boolean,
  workDates?: { startDate: string; endDate: string }[]
) => {
  const { t: translate } = useTranslation();
  const dateformFields = [];
  for (let i = 0; i < count; i++) {
    console.log(workDates && !workDates[i]?.endDate);
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
              min: (workDates && workDates[i]?.startDate) || "",
              max: (workDates && workDates[i]?.endDate) || "",
              disable:
                workDates && !(workDates[i]?.endDate && workDates[i]?.startDate)
                  ? true
                  : false,
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
              min: (workDates && workDates[i]?.startDate) || "",
              max: (workDates && workDates[i]?.endDate) || "",
              disable:
                workDates && !(workDates[i]?.endDate && workDates[i]?.startDate)
                  ? true
                  : false,
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
