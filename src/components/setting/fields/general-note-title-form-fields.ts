import { Field } from "@/enums/form";
import { FormField, GenerateGeneralNotesFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const AddGeneralNoteFormField: GenerateGeneralNotesFormField = (
  register,
  loading,
  control,
  onClick
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
      label: {
        text: `${translate("common.note_title")}`,
        htmlFor: "noteType",
        className: "mb-[10px]",
      },
      field: {
        type: Field.input,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        inputType: "text",
        id: "noteType",
        name: "noteType",
        register,
      },
    },

    {
      containerClass: "rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
      field: {
        type: Field.ckEditor,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
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
        text: `${translate("common.save_button")}`,
        inputType: "submit",
        className:
          "rounded-lg w-[200px] px-4 w-[152px] h-[50px] text-white hover:bg-none",
        loading,
      },
    },
  ];

  return formField;
};
