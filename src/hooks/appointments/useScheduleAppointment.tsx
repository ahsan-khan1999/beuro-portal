import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateScheduleAppointmentsValidationSchema } from "@/validation/appointments";
import { scheduleAppointmentsFormField } from "@/components/appointments/formFields/schedule-appointments-fields";
import { useEffect } from "react";
import { createAppointment } from "@/api/slices/appointment/appointmentSlice";

export interface AppointmentHookProps {
  onSuccess: () => void;
  onClose: () => void;
  id: string;
  refID: string;
}

export const useScheduleAppointment = ({
  onSuccess,
  onClose,
  id,
  refID,
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

  useEffect(() => {
    if (refID) {
      setValue("leadID", refID);
    }
  }, [refID, setValue]);

  const handleChangeTimeField = (type: string, date: string) => {
    setValue(type, date);
  };

  const fields = scheduleAppointmentsFormField(register, loading, control, {
    onClose,
    handleChangeTimeField,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = { ...data, leadID: id };
    const res = await dispatch(
      createAppointment({ data: apiData, router, translate })
    );
    if (res?.payload) onSuccess();
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
