import { Field } from "@/enums/form";
import { useTranslation } from "next-i18next";
import { FormField, GenerateScheduleAppointmentsFormField } from "@/types";

export const scheduleAppointmentsFormField: GenerateScheduleAppointmentsFormField =
  (register, loading, control, { onClose, isUpdate, appointmentDetails }) => {
    const { t: translate } = useTranslation();

    const formField: FormField[] = [
      {
        field: {
          type: Field.div,
          id: "div-field",
          className: "flex flex-col gap-y-5",
          children: [
            {
              containerClass: "mb-0",
              label: {
                text: `${translate(
                  "appointments.appointments_field_label.lead_id"
                )}`,
                htmlFor: "leadID",
                className: "mb-[10px]",
              },
              field: {
                type: Field.input,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                inputType: "text",
                id: "leadID",
                name: "leadID",
                disabled: true,
                register,
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: `${translate(
                  "appointments.appointments_field_label.enter_date"
                )}`,
                htmlFor: "date",
                className: "mb-[10px]",
              },
              field: {
                type: Field.date,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                id: "date",
                name: "date",
                dateType: "date",
                register,
              },
            },
            {
              label: {
                text: `${translate(
                  "appointments.appointments_field_label.enter_time"
                )}`,
                htmlFor: "startTime",
              },
              field: {
                type: Field.div,
                id: "div-field",
                className: "grid grid-cols-2 items-center gap-x-3",
                children: [
                  {
                    field: {
                      type: Field.reactTimePicker,
                      className: `!py-4 !border-[#BFBFBF] focus:!border-primary !w-full`,
                      id: "startTime",
                      name: "startTime",
                      dateType: "time",
                      control,
                    },
                  },
                  {
                    field: {
                      type: Field.reactTimePicker,
                      className: `!py-4 !border-[#BFBFBF] focus:!border-primary !w-full`,
                      id: "endTime",
                      name: "endTime",
                      dateType: "time",
                      control,
                    },
                  },
                ],
              },
            },

            {
              label: {
                text: `${translate("common.select_canton")}`,
                htmlFor: "canton",
                className: "mb-[10px]",
              },
              field: {
                type: Field.select,
                className:
                  "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
                name: "canton",
                id: "canton",
                value:
                  (appointmentDetails?.id && appointmentDetails?.canton) || "",
                options: [
                  {
                    label: "Aargau (AG)",
                    value: "Aargau (AG)",
                  },
                  {
                    label: "Appenzell Ausserrhoden (AR)",
                    value: "Appenzell Ausserrhoden (AR)",
                  },
                  {
                    label: "Appenzell Innerrhoden (AI)",
                    value: "Appenzell Innerrhoden (AI)",
                  },
                  {
                    label: "Basel-Landschaft (BL)",
                    value: "Basel-Landschaft (BL)",
                  },
                  {
                    label: "Basel-Stadt (BS)",
                    value: "Basel-Stadt (BS)",
                  },
                  {
                    label: "Bern (BE)",
                    value: "Bern (BE)",
                  },
                  {
                    label: "Fribourg (FR)",
                    value: "Fribourg (FR)",
                  },
                  {
                    label: "Geneva (GE)",
                    value: "Geneva (GE)",
                  },
                  {
                    label: "Glarus (GL)",
                    value: "Glarus (GL)",
                  },
                  {
                    label: "Graubünden (GR)",
                    value: "Graubünden (GR)",
                  },
                  {
                    label: "Jura (JU)",
                    value: "Jura (JU)",
                  },
                  {
                    label: "Lucerne (LU)",
                    value: "Lucerne (LU)",
                  },
                  {
                    label: "Neuchâtel (NE)",
                    value: "Neuchâtel (NE)",
                  },
                  {
                    label: "Nidwalden (NW)",
                    value: "Nidwalden (NW)",
                  },
                  {
                    label: "Obwalden (OW)",
                    value: "Obwalden (OW)",
                  },
                  {
                    label: "Schaffhausen (SH)",
                    value: "Schaffhausen (SH)",
                  },
                  {
                    label: "Schwyz (SZ)",
                    value: "Schwyz (SZ)",
                  },
                  {
                    label: "Solothurn (SO)",
                    value: "Solothurn (SO)",
                  },
                  {
                    label: "St. Gallen (SG)",
                    value: "St. Gallen (SG)",
                  },
                  {
                    label: "Ticino (TI)",
                    value: "Ticino (TI)",
                  },
                  {
                    label: "Thurgau (TG)",
                    value: "Thurgau (TG)",
                  },
                  {
                    label: "Uri (UR)",
                    value: "Uri (UR)",
                  },
                  {
                    label: "Valais (VS)",
                    value: "Valais (VS)",
                  },
                  {
                    label: "Vaud (VD)",
                    value: "Vaud (VD)",
                  },
                  {
                    label: "Zug (ZG)",
                    value: "Zug (ZG)",
                  },
                  {
                    label: "Zürich (ZH)",
                    value: "Zürich (ZH)",
                  },
                ],

                control,
              },
            },

            {
              containerClass: "mt-6",
              field: {
                type: Field.div,
                id: "div-field",
                className: "flex items-center justify-between",
                children: [
                  {
                    field: {
                      type: Field.button,
                      id: "button",
                      text: `${translate("common.cancel_button")}`,
                      inputType: "button",
                      onClick: onClose,
                      className: `rounded-lg border border-[#C7C7C7] bg-white px-4 min-w-[202px] w-fit h-[50px] text-dark hover:bg-none`,
                    },
                  },
                  {
                    field: {
                      type: Field.button,
                      id: "button",
                      text: isUpdate
                        ? translate("appointments.reschedule_appointment")
                        : translate("common.schedule_btn"),
                      inputType: "submit",
                      className: `rounded-lg px-4 min-w-[182px] w-fit h-[50px] text-white hover:bg-none`,
                      loading,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ];

    return formField;
  };
