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
        className: "!p-4 !h-fit !border-[#BFBFBF]  focus:!border-primary ",
        rows: 3,
        id: "completeRemarks",
        name: "completeRemarks",
        placeholder: "",
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
