import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateScheduleAppointmentsValidationSchema } from "@/validation/appointments";
import { scheduleAppointmentsFormField } from "@/components/appointments/formFields/schedule-appointments-fields";
import { useEffect, useState } from "react";
import {
  createAppointment,
  updateAppointment,
} from "@/api/slices/appointment/appointmentSlice";
import { fieldDateFormat } from "@/utils/utility";
import { readEmployee } from "@/api/slices/employee/emplyeeSlice";
import { Employee } from "@/types/employee";
import { Appointments } from "@/types/appointments";

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
  currentPageRows,
  setCurrentPageRows,
}: AppointmentHookProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { appointmentDetails } = useAppSelector((state) => state.appointment);
  const schema = generateScheduleAppointmentsValidationSchema(translate);
  const [employee, setEmployee] = useState<Employee[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    dispatch(
      readEmployee({ params: { filter: { designation: 3 }, paginate: 0 } })
    ).then((response: any) => {
      if (response?.payload) {
        setEmployee(response?.payload?.Employee);
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      reset({
        leadID: refID,
        date: fieldDateFormat(date) || "",
        startTime: startTime || "",
        endTime: endTime || "",
        agent: agent?.id,
      });
    }
  }, []);

  const fields = scheduleAppointmentsFormField(register, loading, control, {
    onClose,
    appointmentDetails,
    employee,
    isUpdate,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, leadID: leadId };

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
