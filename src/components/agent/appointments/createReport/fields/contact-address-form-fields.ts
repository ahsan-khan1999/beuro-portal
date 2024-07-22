import { Field } from "@/enums/form";
import { FormField, GenerateAgentReportFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const contactAgentReportFormField: GenerateAgentReportFormField = (
  register,
  loading,
  control,
  user
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-3 gap-[17px] bg-[#EDF4FF] rounded-lg p-2",
        children: [
          {
            label: {
              text: `${translate("agent.report_contact_fields.name")}`,
              htmlFor: "NAME",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "text",
              className: "!pl-4",
              id: "NAME",
              name: "NAME",
              register,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.email")}`,
              htmlFor: "EMAIL",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "email",
              className: "!pl-4",
              id: "EMAIL",
              name: "EMAIL",
              register,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.telefon")}`,
              htmlFor: "TELEPHONE",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "number",
              className: "!pl-4",
              id: "TELEPHONE",
              name: "TELEPHONE",
              register,
            },
          },
        ],
      },
    },

    {
      containerClass: "mt-5 mb-2",
      field: {
        type: Field.span,
        id: "test",
        name: "test",
        text: `${translate(
          "agent.report_contact_fields.move_out_addres_heading"
        )}`,
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 gap-[17px] bg-[#EDF4FF] rounded-lg p-2",
        children: [
          {
            label: {
              text: `${translate("agent.report_contact_fields.street_no")}`,
              htmlFor: "MOVE_OUT_STREET_NO",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "text",
              className: "!pl-4",
              id: "MOVE_OUT_STREET_NO",
              name: "MOVE_OUT_STREET_NO",
              register,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.post_code")}`,
              htmlFor: "MOVE_OUT_POSTAL_CODE",
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              inputType: "email",
              className: "!pl-4",
              id: "MOVE_OUT_POSTAL_CODE",
              name: "MOVE_OUT_POSTAL_CODE",
              register,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.floor")}`,
              htmlFor: "MOVE_OUT_FLOOR",
              className: "mb-[10px]",
            },
            field: {
              type: Field.select,
              className: "!pl-4",
              id: "MOVE_OUT_FLOOR",
              name: "MOVE_OUT_FLOOR",
              control,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.room")}`,
              htmlFor: "MOVE_OUT_ROOM",
              className: "mb-[10px]",
            },
            field: {
              type: Field.select,
              className: "!pl-4",
              id: "MOVE_OUT_ROOM",
              name: "MOVE_OUT_ROOM",
              control,
            },
          },
          {
            label: {
              text: `${translate("agent.report_contact_fields.lift")}`,
              htmlFor: "MOVE_OUT_LIFT",
              className: "mb-[10px]",
            },
            field: {
              type: Field.select,
              className: "!pl-4",
              id: "MOVE_OUT_LIFT",
              name: "MOVE_OUT_LIFT",
              control,
            },
          },
          {
            containerClass: "mt-8",
            field: {
              type: Field.customCheckBox,
              className: "",
              id: "accountingReport",
              name: "accountingReport",
              register,
              description: `${translate(
                "agent.report_contact_fields.parking_permit"
              )}`,
            },
          },
        ],
      },
    },
  ];

  return formField;
};
