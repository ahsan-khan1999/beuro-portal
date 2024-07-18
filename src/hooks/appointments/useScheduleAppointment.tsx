import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateScheduleAppointmentsValidationSchema } from "@/validation/appointments";
import { scheduleAppointmentsFormField } from "@/components/appointments/formFields/schedule-appointments-fields";

export interface AppointmentHookProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const useScheduleAppointment = ({
  onSuccess,
  onClose,
}: AppointmentHookProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { loading, error } = useAppSelector((state) => state.auth);
  const schema = generateScheduleAppointmentsValidationSchema(translate);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const handleChangeTimeField = (type: string, date: string) => {
    // if (type === "START_TIME") {
    setValue(type, date);
    // }
  };

  const fields = scheduleAppointmentsFormField(register, loading, control, {
    onClose,
    handleChangeTimeField,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    onSuccess();
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
