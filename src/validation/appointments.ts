import { ScheduleAppointments } from "@/enums/appointments";
import * as yup from "yup";

export const generateScheduleAppointmentsValidationSchema = (
  translate: Function
) => {
  return yup.object().shape({
    [ScheduleAppointments.LEAD_ID]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ScheduleAppointments.ENTER_DATE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ScheduleAppointments.START_TIME]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ScheduleAppointments.SELECT_AGENT]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
