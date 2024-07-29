import { Field } from "@/enums/form";
import { FormField, GenerateContactAddressReportFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const contactAgentReportFormField: GenerateContactAddressReportFormField =
  (register, loading, control, user) => {
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
                options: [],
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
                options: [],
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
                options: [],
                control,
              },
            },
            {
              containerClass: "mt-8",
              field: {
                type: Field.customCheckBox,
                id: "MOVE_OUT_PARKING_PERMIT",
                name: "MOVE_OUT_PARKING_PERMIT",
                description: `${translate(
                  "agent.report_contact_fields.parking_permit"
                )}`,
                textClassName: "text-sm text-[#344054] font-medium",
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
            "agent.report_contact_fields.collection_address_heading"
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
                htmlFor: "COLLECTION_STREET_NO",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "text",
                className: "!pl-4",
                id: "COLLECTION_STREET_NO",
                name: "COLLECTION_STREET_NO",
                register,
              },
            },
            {
              label: {
                text: `${translate("agent.report_contact_fields.post_code")}`,
                htmlFor: "COLLECTION_POSTAL_CODE",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                inputType: "email",
                className: "!pl-4",
                id: "COLLECTION_POSTAL_CODE",
                name: "COLLECTION_POSTAL_CODE",
                register,
              },
            },
            {
              label: {
                text: `${translate("agent.report_contact_fields.floor")}`,
                htmlFor: "COLLECTION_FLOOR",
                className: "mb-[10px]",
              },
              field: {
                type: Field.select,
                className: "!pl-4",
                id: "COLLECTION_FLOOR",
                name: "COLLECTION_FLOOR",
                options: [],
                control,
              },
            },
            {
              label: {
                text: `${translate("agent.report_contact_fields.room")}`,
                htmlFor: "COLLECTION_ROOM",
                className: "mb-[10px]",
              },
              field: {
                type: Field.select,
                className: "!pl-4",
                id: "COLLECTION_ROOM",
                name: "COLLECTION_ROOM",
                options: [],
                control,
              },
            },
            {
              label: {
                text: `${translate("agent.report_contact_fields.lift")}`,
                htmlFor: "COLLECTION_LIFT",
                className: "mb-[10px]",
              },
              field: {
                type: Field.select,
                className: "!pl-4",
                id: "COLLECTION_LIFT",
                name: "COLLECTION_LIFT",
                options: [],
                control,
              },
            },
            {
              containerClass: "mt-8",
              field: {
                type: Field.customCheckBox,
                className: "",
                id: "COLLECTION_PARKING_PERMIT",
                name: "COLLECTION_PARKING_PERMIT",
                textClassName: "text-sm text-[#344054] font-medium",
                description: `${translate(
                  "agent.report_contact_fields.parking_permit"
                )}`,
                register,
              },
            },
          ],
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
                text: translate("content.details.cancel_button"),
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
                text: translate("content.details.next_button"),
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
