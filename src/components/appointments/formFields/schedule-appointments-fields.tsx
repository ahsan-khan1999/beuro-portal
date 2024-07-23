import { Field } from "@/enums/form";
import { useTranslation } from "next-i18next";
import { FormField, GenerateScheduleAppointmentsFormField } from "@/types";

export const scheduleAppointmentsFormField: GenerateScheduleAppointmentsFormField =
  (
    register,
    loading,
    control,
    { onClose, isUpdate, handleChangeTimeField }
  ) => {
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
                register,
                dateType: "date",
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
                    containerClass: "relative mb-0",
                    field: {
                      className:
                        "!bg-[#fff] !px-3 py-[14px] rounded-lg w-full border border-lightGray",
                      type: Field.timePicker,
                      dateType: "time",
                      id: "startTime",
                      name: "startTime",
                      register,
                      handleChange: (date: any) =>
                        handleChangeTimeField &&
                        handleChangeTimeField("startTime", date),
                    },
                  },
                  {
                    containerClass: "relative mb-0",
                    field: {
                      className:
                        "!bg-[#fff] !px-3 py-[14px] rounded-lg w-full border border-lightGray",
                      type: Field.timePicker,
                      dateType: "time",
                      id: "endTime",
                      name: "endTime",
                      register,
                      handleChange: (date: any) =>
                        handleChangeTimeField &&
                        handleChangeTimeField("endTime", date),
                    },
                  },
                ],
              },
            },
            {
              containerClass: "mb-0",
              label: {
                text: `${translate(
                  "appointments.appointments_field_label.select_agent"
                )}`,
                htmlFor: "agent",
                className: "mb-[10px]",
              },
              field: {
                type: Field.agentSelectField,
                className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                id: "agent",
                name: "agent",
                options: [
                  {
                    label: {
                      imgSrc:
                        "https://new.buero-365.com/api/integrations/aws/storage/get/default-profile-dp.png",
                      name: "Jenny Wilson",
                      status: "Available",
                    },
                    value: {
                      imgSrc:
                        "https://new.buero-365.com/api/integrations/aws/storage/get/default-profile-dp.png",
                      name: "Jenny Wilson",
                      status: "Available",
                    },
                  },
                  {
                    label: {
                      imgSrc:
                        "https://new.buero-365.com/api/integrations/aws/storage/get/default-profile-dp.png",
                      name: "Mark Miller",
                      status: "unavailable",
                    },
                    value: {
                      imgSrc:
                        "https://new.buero-365.com/api/integrations/aws/storage/get/default-profile-dp.png",
                      name: "Mark Miller",
                      status: "unavailable",
                    },
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
                      text: translate("common.schedule_btn"),
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
