import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateScheduleAppointmentsValidationSchema } from "@/validation/appointments";
import { scheduleAppointmentsFormField } from "@/components/appointments/formFields/schedule-appointments-fields";
import { useEffect } from "react";
import {
  createAppointment,
  updateAppointment,
} from "@/api/slices/appointment/appointmentSlice";
import {
  convertToLocal,
  convertToUTC,
  convertUTCToLocalDate,
} from "@/utils/utility";
import { Appointments } from "@/types/appointments";
import { readLeadDetails, setLeadDetails } from "@/api/slices/lead/leadSlice";
import { CustomerPromiseActionType } from "@/types/company";
import moment from "moment";

export interface AppointmentHookProps {
  onSuccess: () => void;
  onUpdateSuccess?: () => void;
  onClose: () => void;
  id: string;
  leadId: string;
  refID: string;
  date: string;
  startTime?: string;
  endTime?: string;
  agent?: {
    id: string;
    picture: string;
    fullName: string;
  };
  canton?: string;
  isUpdate?: boolean;
  setCurrentPageRows?: React.Dispatch<React.SetStateAction<Appointments[]>>;
  currentPageRows?: Appointments[];
}

export const useScheduleAppointment = ({
  onSuccess,
  onClose,
  id,
  date,
  leadId,
  refID,
  agent,
  endTime,
  startTime,
  isUpdate,
  onUpdateSuccess,
  canton,
  currentPageRows,
  setCurrentPageRows,
}: AppointmentHookProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { appointmentDetails } = useAppSelector((state) => state.appointment);
  const schema = generateScheduleAppointmentsValidationSchema(translate);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const localStartTime = startTime ? convertToLocal(startTime).time : "";
  const localEndTime = endTime ? convertToLocal(endTime).time : "";
  const localDate = convertUTCToLocalDate(startTime || "");

  useEffect(() => {
    if (id) {
      reset({
        leadID: refID,
        date: localDate || "",
        startTime: localStartTime
          ? moment(localStartTime, "HH:mm").toDate()
          : "",
        endTime: localEndTime ? moment(localEndTime, "HH:mm").toDate() : "",
        canton: canton,
      });
    } else {
      reset({
        leadID: refID,
        date: localDate || "",
        startTime: "",
        endTime: "",
        canton: canton,
      });
    }
  }, []);

  const fields = scheduleAppointmentsFormField(register, loading, control, {
    onClose,
    appointmentDetails,
    isUpdate,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const utcStartTime = data.startTime
      ? convertToUTC(data.date, moment(data.startTime).format("HH:mm"))
      : null;

    const utcEndTime = data.endTime
      ? convertToUTC(data.date, moment(data.endTime).format("HH:mm"))
      : null;

    const utcDate = utcStartTime
      ? moment.utc(utcStartTime).format("YYYY-MM-DD")
      : moment.utc(data.date).format("YYYY-MM-DD");

    const apiData = {
      ...data,
      leadID: leadId,
      date: utcDate,
      startTime: utcStartTime,
      endTime: utcEndTime,
    };

    const res = isUpdate
      ? await dispatch(
          updateAppointment({
            data: { ...apiData, id },
            router,
            translate,
          })
        )
      : await dispatch(createAppointment({ data: apiData, router, translate }));

    if (res?.payload) {
      if (isUpdate) {
        if (currentPageRows && setCurrentPageRows) {
          const updatedRows = currentPageRows.map((appointment) =>
            appointment.id === id ? res.payload : appointment
          );
          setCurrentPageRows(updatedRows);
        }
        onUpdateSuccess && onUpdateSuccess();
      } else {
        dispatch(readLeadDetails({ params: { filter: id } })).then(
          (res: CustomerPromiseActionType) => {
            dispatch(setLeadDetails(res.payload));
          }
        );
        onSuccess();
      }
    }
  };

  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    translate,
  };
};
