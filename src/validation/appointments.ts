import { ScheduleAppointments } from "@/enums/appointments";
import * as yup from "yup";

export const generateScheduleAppointmentsValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [ScheduleAppointments.leadID]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ScheduleAppointments.date]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ScheduleAppointments.startTime]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ScheduleAppointments.endTime]: yup
      .string()
      .required(translate("validationMessages.required")),
    // [ScheduleAppointments.agent]: yup
    //   .string()
    //   .required(translate("validationMessages.required")),
    [ScheduleAppointments.canton]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
