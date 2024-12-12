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
                      placeholder: translate("common.start_time"),
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
                      placeholder: translate("common.end_time"),
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
                    label: "(AG) Aargau",
                    value: "(AG) Aargau",
                  },
                  {
                    label: "(AR) Appenzell Ausserrhoden",
                    value: "(AR) Appenzell Ausserrhoden",
                  },
                  {
                    label: "(AI) Appenzell Innerrhoden",
                    value: "(AI) Appenzell Innerrhoden",
                  },
                  {
                    label: "(BL) Basel-Landschaft",
                    value: "(BL) Basel-Landschaft",
                  },
                  {
                    label: "(BS) Basel-Stadt",
                    value: "(BS) Basel-Stadt",
                  },
                  {
                    label: "(BE) Bern",
                    value: "(BE) Bern",
                  },
                  {
                    label: "(FR) Freiburg",
                    value: "(FR) Freiburg",
                  },
                  {
                    label: "(GE) Genf",
                    value: "(GE) Genf",
                  },
                  {
                    label: "(GL Glarus)",
                    value: "(GL) Glarus",
                  },
                  {
                    label: "(GR) Graubünden",
                    value: "(GR) Graubünden",
                  },
                  {
                    label: "(JU) Jura",
                    value: "(JU) Jura",
                  },
                  {
                    label: "(LU) Luzern",
                    value: "(LU) Luzern",
                  },
                  {
                    label: "(NE) Neuenburg",
                    value: "(NE) Neuenburg",
                  },
                  {
                    label: "(NW) Nidwalden",
                    value: "(NW) Nidwalden",
                  },
                  {
                    label: "(OW) Obwalden",
                    value: "(OW) Obwalden",
                  },
                  {
                    label: "(SH) Schaffhausen",
                    value: "(SH) Schaffhausen",
                  },
                  {
                    label: "(SZ) Schwyz",
                    value: "(SZ) Schwyz",
                  },
                  {
                    label: "(SO) Solothurn",
                    value: "(SO) Solothurn",
                  },
                  {
                    label: "(SG) St. Gallen",
                    value: "(SG) St. Gallen",
                  },
                  {
                    label: "(TI) Tessin",
                    value: "(TI) Tessin",
                  },
                  {
                    label: "(TG) Thurgau",
                    value: "(TG) Thurgau",
                  },
                  {
                    label: "(UR) Uri",
                    value: "(UR) Uri",
                  },
                  {
                    label: "(VS) Wallis",
                    value: "(VS) Wallis",
                  },
                  {
                    label: "(VD) Waadt",
                    value: "(VD) Waadt",
                  },
                  {
                    label: "(ZG) Zug",
                    value: "(ZG) Zug",
                  },
                  {
                    label: "(ZH) Zürich",
                    value: "(ZH) Zürich",
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
