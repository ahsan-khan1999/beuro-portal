import { Field } from "@/enums/form";
import { FormField, GenerateRemainderFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const remainderFormField: GenerateRemainderFormField = (
  register,
  loading,
  control,
  trigger
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: `mb-0`,
      field: {
        type: Field.remainderSelectField,
        id: "alertTime",
        name: "alertTime",
        value: 15,
        options: [
          {
            label: translate("common.minutes"),
            value: 5,
          },
          {
            label: translate("common.minutes"),
            value: 15,
          },
          {
            label: translate("common.minutes"),
            value: 30,
          },
          {
            label: translate("common.hour"),
            value: 60,
          },
          {
            label: translate("common.hours"),
            value: 120,
          },
          {
            label: translate("common.day"),
            value: 1440,
          },
          {
            label: translate("common.days"),
            value: 2880,
          },
          {
            label: translate("common.days"),
            value: 10080,
          },
        ],
        control,
      },
    },
  ];

  return formField;
};
