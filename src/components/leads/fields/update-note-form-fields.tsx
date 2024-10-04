import { Field } from "@/enums/form";
import { FormField, GenerateUpdateNoteFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const UpdateNoteFormField: GenerateUpdateNoteFormField = (
  register,
  loading,
  control,
  onClick
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "rounded-lg px-2 py-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("common.add_note_modal.description_title")}`,
        htmlFor: "description",
        className: "mb-[10px] text-[#1E1E1E]",
      },

      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-[#1E1E1E] focus:!border-primary",
        id: "description",
        name: "description",
        control,
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
