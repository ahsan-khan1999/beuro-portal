import { Field } from "@/enums/form";
import { FormField, GenerateAddReasonFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const addReasonFormField: GenerateAddReasonFormField = (
  register,
  loading,
  control
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mt-[18px] mb-0 col-span-2",
      label: {
        text: `${translate(
          "setting.follow_up_setting.add_follow_up.add_label"
        )}`,
        htmlFor: "addReason",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-dark focus:!border-primary ",
        inputType: "text",
        id: "addReason",
        name: "addReason",
        placeholder: " ",
        register,
      },
    },

    {
      containerClass: "mb-0 mt-4 float-right mb-[53px]",
      field: {
        type: Field.button,
        id: "button",
        text: `${translate(
          "setting.follow_up_setting.add_follow_up.add_button"
        )}`,
        inputType: "submit",
        className:
          "rounded-lg   p-4 w-[152px] h-[50px]  text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
