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
        className: "!p-4 h-[45px] !border-[#BFBFBF] focus:!border-primary",
        type: Field.select,
        id: "contactAvailability",
        value: "",
        name: "contactAvailability",
        options: [
          {
            value: "All Notes",
            label: `${translate("add_note_dropdown.all_notes")}`,
          },
          {
            value: "Sending pictures",
            label: `${translate("add_note_dropdown.sending_picture")}`,
          },
          {
            value: "Viewing date",
            label: `${translate("add_note_dropdown.view_date")}`,
          },
          {
            value: "Approximate Offer open",
            label: `${translate("add_note_dropdown.approximate_offer_open")}`,
          },
          {
            value: "Will contact us",
            label: `${translate("add_note_dropdown.contact_us")}`,
          },
          {
            value: "Individual Note",
            label: `${translate("add_note_dropdown.individual_note")}`,
          },
        ],
        control,
      },
    },

    {
      containerClass: "mt-5",
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
