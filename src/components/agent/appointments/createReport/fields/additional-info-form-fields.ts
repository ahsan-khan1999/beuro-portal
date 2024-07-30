import { AdditionalInfoFieldsId } from "@/enums/agent/appointments-report";
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
                htmlFor: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.employees}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.employees}`,
                name: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.employees}`,
                register,
              },
            },
            {
              label: {
                text: `${translate(
                  "agent.additional_details_fields.leiferwagen"
                )}`,
                htmlFor: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.deliveryVehicle}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.deliveryVehicle}`,
                name: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.deliveryVehicle}`,
                register,
              },
            },
            {
              label: {
                text: `${translate("agent.additional_details_fields.stunden")}`,
                htmlFor: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.hours}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.hours}`,
                name: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.hours}`,
                register,
              },
            },
            {
              label: {
                text: `${translate(
                  "agent.additional_details_fields.reingung_mit"
                )}`,
                htmlFor: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.cleaningWithHandoverGuarantee}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.cleaningWithHandoverGuarantee}`,
                name: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.cleaningWithHandoverGuarantee}`,
                register,
              },
            },
            {
              label: {
                text: `${translate(
                  "agent.additional_details_fields.besenrein"
                )}`,
                htmlFor: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.broomClean}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.broomClean}`,
                name: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.broomClean}`,
                register,
              },
            },
            {
              label: {
                text: `${translate(
                  "agent.additional_details_fields.preis_chf"
                )}`,
                htmlFor: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.priceCHF}`,
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.priceCHF}`,
                name: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.priceCHF}`,
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
          htmlFor: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.remarks}`,
          className: "mb-[10px]",
        },
        field: {
          type: Field.input,
          inputType: "text",
          className: "!pl-4",
          id: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.remarks}`,
          name: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.remarks}`,
          register,
        },
      },

      {
        containerClass: "mt-5 mb-2",
        field: {
          type: Field.span,
          id: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.noteAndInformation}`,
          name: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.noteAndInformation}`,
          text: `${translate("agent.additional_details_fields.hinweis")}:`,
        },
      },
      {
        containerClass: "bg-[#EDF4FF] rounded-b-lg p-2",
        field: {
          type: Field.textArea,
          className: "!p-4 !border-[#BFBFBF] focus:!border-primary ",
          rows: 2,
          id: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.noteAndInformation}`,
          name: `${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.noteAndInformation}`,
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
