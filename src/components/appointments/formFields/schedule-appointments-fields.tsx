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
                      type: Field.date,
                      className: `!py-4 !border-[#BFBFBF] focus:!border-primary !w-full`,
                      id: "startTime",
                      name: "startTime",
                      register,
                      dateType: "time",
                    },
                  },
                  {
                    field: {
                      type: Field.date,
                      className: `!py-4 !border-[#BFBFBF] focus:!border-primary !w-full`,
                      id: "endTime",
                      name: "endTime",
                      register,
                      dateType: "time",
                    },
                  },
                  // {
                  //   field: {
                  //     type: Field.select,
                  //     className:
                  //       "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
                  //     name: "startTime",
                  //     id: "startTime",
                  //     value:
                  //       (appointmentDetails?.id &&
                  //         appointmentDetails?.startTime) ||
                  //       "",
                  //     options: [
                  //       { label: "00:00", value: "00:00" },
                  //       { label: "00:15", value: "00:15" },
                  //       { label: "00:30", value: "00:30" },
                  //       { label: "00:45", value: "00:45" },
                  //       { label: "01:00", value: "01:00" },
                  //       { label: "01:15", value: "01:15" },
                  //       { label: "01:30", value: "01:30" },
                  //       { label: "01:45", value: "01:45" },
                  //       { label: "02:00", value: "02:00" },
                  //       { label: "02:15", value: "02:15" },
                  //       { label: "02:30", value: "02:30" },
                  //       { label: "02:45", value: "02:45" },
                  //       { label: "03:00", value: "03:00" },
                  //       { label: "03:15", value: "03:15" },
                  //       { label: "03:30", value: "03:30" },
                  //       { label: "03:45", value: "03:45" },
                  //       { label: "04:00", value: "04:00" },
                  //       { label: "04:15", value: "04:15" },
                  //       { label: "04:30", value: "04:30" },
                  //       { label: "04:45", value: "04:45" },
                  //       { label: "05:00", value: "05:00" },
                  //       { label: "05:15", value: "05:15" },
                  //       { label: "05:30", value: "05:30" },
                  //       { label: "05:45", value: "05:45" },
                  //       { label: "06:00", value: "06:00" },
                  //       { label: "06:15", value: "06:15" },
                  //       { label: "06:30", value: "06:30" },
                  //       { label: "06:45", value: "06:45" },
                  //       { label: "07:00", value: "07:00" },
                  //       { label: "07:15", value: "07:15" },
                  //       { label: "07:30", value: "07:30" },
                  //       { label: "07:45", value: "07:45" },
                  //       { label: "08:00", value: "08:00" },
                  //       { label: "08:15", value: "08:15" },
                  //       { label: "08:30", value: "08:30" },
                  //       { label: "08:45", value: "08:45" },
                  //       { label: "09:00", value: "09:00" },
                  //       { label: "09:15", value: "09:15" },
                  //       { label: "09:30", value: "09:30" },
                  //       { label: "09:45", value: "09:45" },
                  //       { label: "10:00", value: "10:00" },
                  //       { label: "10:15", value: "10:15" },
                  //       { label: "10:30", value: "10:30" },
                  //       { label: "10:45", value: "10:45" },
                  //       { label: "11:00", value: "11:00" },
                  //       { label: "11:15", value: "11:15" },
                  //       { label: "11:30", value: "11:30" },
                  //       { label: "11:45", value: "11:45" },
                  //       { label: "12:00", value: "12:00" },
                  //       { label: "12:15", value: "12:15" },
                  //       { label: "12:30", value: "12:30" },
                  //       { label: "12:45", value: "12:45" },
                  //       { label: "13:00", value: "13:00" },
                  //       { label: "13:15", value: "13:15" },
                  //       { label: "13:30", value: "13:30" },
                  //       { label: "13:45", value: "13:45" },
                  //       { label: "14:00", value: "14:00" },
                  //       { label: "14:15", value: "14:15" },
                  //       { label: "14:30", value: "14:30" },
                  //       { label: "14:45", value: "14:45" },
                  //       { label: "15:00", value: "15:00" },
                  //       { label: "15:15", value: "15:15" },
                  //       { label: "15:30", value: "15:30" },
                  //       { label: "15:45", value: "15:45" },
                  //       { label: "16:00", value: "16:00" },
                  //       { label: "16:15", value: "16:15" },
                  //       { label: "16:30", value: "16:30" },
                  //       { label: "16:45", value: "16:45" },
                  //       { label: "17:00", value: "17:00" },
                  //       { label: "17:15", value: "17:15" },
                  //       { label: "17:30", value: "17:30" },
                  //       { label: "17:45", value: "17:45" },
                  //       { label: "18:00", value: "18:00" },
                  //       { label: "18:15", value: "18:15" },
                  //       { label: "18:30", value: "18:30" },
                  //       { label: "18:45", value: "18:45" },
                  //       { label: "19:00", value: "19:00" },
                  //       { label: "19:15", value: "19:15" },
                  //       { label: "19:30", value: "19:30" },
                  //       { label: "19:45", value: "19:45" },
                  //       { label: "20:00", value: "20:00" },
                  //       { label: "20:15", value: "20:15" },
                  //       { label: "20:30", value: "20:30" },
                  //       { label: "20:45", value: "20:45" },
                  //       { label: "21:00", value: "21:00" },
                  //       { label: "21:15", value: "21:15" },
                  //       { label: "21:30", value: "21:30" },
                  //       { label: "21:45", value: "21:45" },
                  //       { label: "22:00", value: "22:00" },
                  //       { label: "22:15", value: "22:15" },
                  //       { label: "22:30", value: "22:30" },
                  //       { label: "22:45", value: "22:45" },
                  //       { label: "23:00", value: "23:00" },
                  //       { label: "23:15", value: "23:15" },
                  //       { label: "23:30", value: "23:30" },
                  //       { label: "23:45", value: "23:45" },
                  //     ],
                  //     control,
                  //   },
                  // },
                  // {
                  //   field: {
                  //     type: Field.select,
                  //     className:
                  //       "!py-4 !pr-8 pl-4 !border-[#BFBFBF] focus:!border-primary w-full",
                  //     name: "endTime",
                  //     id: "endTime",
                  //     value:
                  //       (appointmentDetails?.id &&
                  //         appointmentDetails?.endTime) ||
                  //       "",
                  //     options: [
                  //       { label: "00:00", value: "00:00" },
                  //       { label: "00:15", value: "00:15" },
                  //       { label: "00:30", value: "00:30" },
                  //       { label: "00:45", value: "00:45" },
                  //       { label: "01:00", value: "01:00" },
                  //       { label: "01:15", value: "01:15" },
                  //       { label: "01:30", value: "01:30" },
                  //       { label: "01:45", value: "01:45" },
                  //       { label: "02:00", value: "02:00" },
                  //       { label: "02:15", value: "02:15" },
                  //       { label: "02:30", value: "02:30" },
                  //       { label: "02:45", value: "02:45" },
                  //       { label: "03:00", value: "03:00" },
                  //       { label: "03:15", value: "03:15" },
                  //       { label: "03:30", value: "03:30" },
                  //       { label: "03:45", value: "03:45" },
                  //       { label: "04:00", value: "04:00" },
                  //       { label: "04:15", value: "04:15" },
                  //       { label: "04:30", value: "04:30" },
                  //       { label: "04:45", value: "04:45" },
                  //       { label: "05:00", value: "05:00" },
                  //       { label: "05:15", value: "05:15" },
                  //       { label: "05:30", value: "05:30" },
                  //       { label: "05:45", value: "05:45" },
                  //       { label: "06:00", value: "06:00" },
                  //       { label: "06:15", value: "06:15" },
                  //       { label: "06:30", value: "06:30" },
                  //       { label: "06:45", value: "06:45" },
                  //       { label: "07:00", value: "07:00" },
                  //       { label: "07:15", value: "07:15" },
                  //       { label: "07:30", value: "07:30" },
                  //       { label: "07:45", value: "07:45" },
                  //       { label: "08:00", value: "08:00" },
                  //       { label: "08:15", value: "08:15" },
                  //       { label: "08:30", value: "08:30" },
                  //       { label: "08:45", value: "08:45" },
                  //       { label: "09:00", value: "09:00" },
                  //       { label: "09:15", value: "09:15" },
                  //       { label: "09:30", value: "09:30" },
                  //       { label: "09:45", value: "09:45" },
                  //       { label: "10:00", value: "10:00" },
                  //       { label: "10:15", value: "10:15" },
                  //       { label: "10:30", value: "10:30" },
                  //       { label: "10:45", value: "10:45" },
                  //       { label: "11:00", value: "11:00" },
                  //       { label: "11:15", value: "11:15" },
                  //       { label: "11:30", value: "11:30" },
                  //       { label: "11:45", value: "11:45" },
                  //       { label: "12:00", value: "12:00" },
                  //       { label: "12:15", value: "12:15" },
                  //       { label: "12:30", value: "12:30" },
                  //       { label: "12:45", value: "12:45" },
                  //       { label: "13:00", value: "13:00" },
                  //       { label: "13:15", value: "13:15" },
                  //       { label: "13:30", value: "13:30" },
                  //       { label: "13:45", value: "13:45" },
                  //       { label: "14:00", value: "14:00" },
                  //       { label: "14:15", value: "14:15" },
                  //       { label: "14:30", value: "14:30" },
                  //       { label: "14:45", value: "14:45" },
                  //       { label: "15:00", value: "15:00" },
                  //       { label: "15:15", value: "15:15" },
                  //       { label: "15:30", value: "15:30" },
                  //       { label: "15:45", value: "15:45" },
                  //       { label: "16:00", value: "16:00" },
                  //       { label: "16:15", value: "16:15" },
                  //       { label: "16:30", value: "16:30" },
                  //       { label: "16:45", value: "16:45" },
                  //       { label: "17:00", value: "17:00" },
                  //       { label: "17:15", value: "17:15" },
                  //       { label: "17:30", value: "17:30" },
                  //       { label: "17:45", value: "17:45" },
                  //       { label: "18:00", value: "18:00" },
                  //       { label: "18:15", value: "18:15" },
                  //       { label: "18:30", value: "18:30" },
                  //       { label: "18:45", value: "18:45" },
                  //       { label: "19:00", value: "19:00" },
                  //       { label: "19:15", value: "19:15" },
                  //       { label: "19:30", value: "19:30" },
                  //       { label: "19:45", value: "19:45" },
                  //       { label: "20:00", value: "20:00" },
                  //       { label: "20:15", value: "20:15" },
                  //       { label: "20:30", value: "20:30" },
                  //       { label: "20:45", value: "20:45" },
                  //       { label: "21:00", value: "21:00" },
                  //       { label: "21:15", value: "21:15" },
                  //       { label: "21:30", value: "21:30" },
                  //       { label: "21:45", value: "21:45" },
                  //       { label: "22:00", value: "22:00" },
                  //       { label: "22:15", value: "22:15" },
                  //       { label: "22:30", value: "22:30" },
                  //       { label: "22:45", value: "22:45" },
                  //       { label: "23:00", value: "23:00" },
                  //       { label: "23:15", value: "23:15" },
                  //       { label: "23:30", value: "23:30" },
                  //       { label: "23:45", value: "23:45" },
                  //     ],
                  //     control,
                  //   },
                  // },
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
            // {
            //   containerClass: "mb-0",
            //   label: {
            //     text: `${translate(
            //       "appointments.appointments_field_label.select_agent"
            //     )}`,
            //     htmlFor: "agent",
            //     className: "mb-[10px]",
            //   },
            //   field: {
            //     type: Field.agentSelectField,
            //     className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
            //     id: "agent",
            //     name: "agent",
            //     options:
            //       employee &&
            //       employee?.map((item) => ({
            //         label: {
            //           name: item?.fullName,
            //           picture: item?.picture ? item?.picture : "",
            //         },
            //         value: { name: item?.id, picture: "" },
            //       })),
            //     control,
            //     value:
            //       (appointmentDetails?.agent?.id &&
            //         appointmentDetails?.agent?.id) ||
            //       "",
            //   },
            // },
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
