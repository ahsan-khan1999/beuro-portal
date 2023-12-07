import { Field } from "@/enums/form";
import { FormField, GenerateFollowUpFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const AddRemarksFormField: GenerateFollowUpFormField = (
  register,
  loading,
  control,
  onClick
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0 ",
      field: {
        type: Field.textArea,
        className: "!p-4 !border-dark  focus:!border-primary ",
        rows: 5,
        id: "completeRemarks",
        name: "completeRemarks",
        placeholder:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  a been the industry's standard dummy text ever since the 1500s",
        register,
      },
    },

    {
      containerClass: "mt-5 ",
      field: {
        id: "button",
        type: Field.button,
        text: `${translate("follow_up.next_button")}`,
        inputType: "submit",
        className: "rounded-lg px-4 w-[174px] text-white hover:bg-none ",
        loading,
      },
    },
  ];

  return formField;
};
