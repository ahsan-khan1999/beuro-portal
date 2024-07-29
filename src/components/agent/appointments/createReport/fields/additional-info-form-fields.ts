import { Field } from "@/enums/form";
import { FormField, GenerateAdditionalInfoReportFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const additionalAgentReportFormField: GenerateAdditionalInfoReportFormField =
  (register, loading, control, user) => {
    const { t: translate } = useTranslation();
    const formField: FormField[] = [
      {
        field: {
          type: Field.div,
          id: "div-field",
          className:
            "grid grid-cols-1 md:grid-cols-3 gap-[17px] bg-[#EDF4FF] rounded-t-lg p-2",
          children: [
            {
              label: {
                text: `${translate(
                  "agent.additional_details_fields.mitarbeiter"
                )}`,
                htmlFor: "EMPLOYYES",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: "EMPLOYYES",
                name: "EMPLOYYES",
                register,
              },
            },
            {
              label: {
                text: `${translate(
                  "agent.additional_details_fields.leiferwagen"
                )}`,
                htmlFor: "DELIVERT_VAN",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: "DELIVERT_VAN",
                name: "DELIVERT_VAN",
                register,
              },
            },
            {
              label: {
                text: `${translate("agent.additional_details_fields.stunden")}`,
                htmlFor: "HOURS",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: "HOURS",
                name: "HOURS",
                register,
              },
            },
            {
              label: {
                text: `${translate(
                  "agent.additional_details_fields.reingung_mit"
                )}`,
                htmlFor: "CLEANING_DELIVERY_GUARANTEE",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: "CLEANING_DELIVERY_GUARANTEE",
                name: "CLEANING_DELIVERY_GUARANTEE",
                register,
              },
            },
            {
              label: {
                text: `${translate(
                  "agent.additional_details_fields.besenrein"
                )}`,
                htmlFor: "BROOM_CLEAN",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: "BROOM_CLEAN",
                name: "BROOM_CLEAN",
                register,
              },
            },
            {
              label: {
                text: `${translate(
                  "agent.additional_details_fields.preis_chf"
                )}`,
                htmlFor: "PRICE",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: "PRICE",
                name: "PRICE",
                register,
              },
            },
          ],
        },
      },

      {
        containerClass: "bg-[#EDF4FF] rounded-b-lg p-2",
        label: {
          text: `${translate("agent.additional_details_fields.bemerkung")}`,
          htmlFor: "REMARK",
          className: "mb-[10px]",
        },
        field: {
          type: Field.input,
          inputType: "text",
          className: "!pl-4",
          id: "REMARK",
          name: "REMARK",
          register,
        },
      },

      {
        containerClass: "mt-5 mb-2",
        field: {
          type: Field.span,
          id: "NOTE_INFORMATION",
          name: "NOTE_INFORMATION",
          text: `${translate("agent.additional_details_fields.hinweis")}:`,
        },
      },
      {
        containerClass: "bg-[#EDF4FF] rounded-b-lg p-2",
        field: {
          type: Field.textArea,
          className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
          rows: 2,
          id: "NOTE_INFORMATION",
          name: "NOTE_INFORMATION",
          register,
        },
      },

      {
        containerClass: "mt-5 mb-2",
        field: {
          type: Field.span,
          id: "IMAGES",
          name: "IMAGES",
          text: `${translate("agent.additional_details_fields.images")}`,
        },
      },

      {
        field: {
          type: Field.customFileUpload,
          id: "IMAGES",
          name: "IMAGES",
          attachements: [],
        },
      },

      {
        containerClass: "pt-[30px]",
        field: {
          type: Field.div,
          id: "div-field",
          className: "flex justify-end items-center space-x-[18px]",
          children: [
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                id: "button",
                text: translate("content.details.back_button"),
                inputType: "button",
                className:
                  "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[92px] w-fit h-[50px] text-dark hover:bg-none",
                onClick: () => {},
              },
            },
            {
              containerClass: "mb-0",
              field: {
                type: Field.button,
                id: "button",
                text: translate("pdf.submit"),
                inputType: "submit",
                className:
                  "rounded-lg px-4 min-w-[152px] w-fit h-[50px] text-white hover:bg-none",
                loading,
              },
            },
          ],
        },
      },
    ];

    return formField;
  };
