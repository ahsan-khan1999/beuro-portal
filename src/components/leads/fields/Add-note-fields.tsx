import { Field } from "@/enums/form";
import { FormField, GenerateNotesFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const AddNoteFormField: GenerateNotesFormField = (
  register,
  loading,
  control,
  onClick
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0",
      label: {
        text: `${translate("common.add_note_modal.label")}`,
        htmlFor: "description",
        className: "mb-[10px] text-[#8F8F8F]",
      },
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        id: "description",
        name: "description",
        control,
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
          "rounded-lg w-[200px] px-4 w-[152px] h-[50px] text-white hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
