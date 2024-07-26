import { Field } from "@/enums/form";
import { FormField, GenerateNotesFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const AddNoteFormField: GenerateNotesFormField = (
  register,
  loading,
  control,
  { noteSetting, onNoteSelect, selectedNote },
  onClick,
  trigger
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "mb-0 rounded-t-lg px-2 py-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("common.add_note_modal.label")}`,
        htmlFor: "noteType",
        className: "mb-[10px] text-[#1E1E1E]",
      },

      field: {
        className: "!p-4 h-[45px] !border-[#BFBFBF] focus:!border-primary",
        type: Field.select,
        id: "noteType",
        name: "noteType",
        options: noteSetting
          ? noteSetting
              .slice()
              .reverse()
              .map((item) => ({
                label: item?.notes?.noteType,
                value: item?.notes?.noteType,
              }))
          : [],
        control,
        value:
          (noteSetting &&
            noteSetting[noteSetting?.length - 1]?.notes?.noteType) ||
          "",
        onItemChange: onNoteSelect,
        trigger,
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
        trigger,
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
