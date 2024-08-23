import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { generateAddTaskValidationSchema } from "@/validation/modalsSchema";
import { addTaskFormField } from "@/components/calendar/add-task-fields";
import {
  createContractTask,
  setContractTask,
  updateContractTask,
} from "@/api/slices/contract/contractSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

export interface AddTaskHookProps {
  isUpdate?: boolean;
  onSuccess: () => void;
  onUpdateSuccess: () => void;
  id?: string;
}

export default function useAddTask({
  isUpdate,
  onSuccess,
  onUpdateSuccess,
  id,
}: AddTaskHookProps) {
  const router = useRouter();
  const { loading, error, taskDetail, task } = useAppSelector(
    (state) => state.contract
  );

  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();

  const schema = generateAddTaskValidationSchema(translate);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    setError,
    watch,
    setValue,
    reset,
  } = useForm<FieldValues>({ resolver: yupResolver<FieldValues>(schema) });

  const isRemainder = watch("remainder");
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const alertTime = taskDetail?.alertTime;

  useEffect(() => {
    if (id) {
      reset({
        title: taskDetail?.title,
        streetNumber: taskDetail?.address?.streetNumber,
        postalCode: taskDetail?.address?.postalCode,
        country: taskDetail?.address?.country,
        isAllDay: taskDetail?.isAllDay,
        note: taskDetail?.note,
        alertTime: taskDetail?.alertTime,
        colour: taskDetail?.colour,
      }),
        setValue("startDate", taskDetail?.date?.[0]?.startDate),
        setValue("endDate", taskDetail?.date?.[0]?.endDate);
    }
  }, [id]);

  const taskFields = addTaskFormField(
    register,
    loading,
    isRemainder,
    startDate,
    endDate,
    setValue,
    taskDetail?.colour,
    alertTime,
    control,
    trigger
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formattedDate = data.startDate
      ? [{ startDate: data.startDate, endDate: data.endDate }]
      : [];

    const formattedData = {
      title: data.title,
      date: formattedDate,
      isAllDay: data.isAllDay,
      colour: data.colour,
      alertTime: data.alertTime,
      note: data.note,
      address: {
        streetNumber: data.streetNumber,
        postalCode: data.postalCode,
        country: data.country,
      },
    };

    const res = isUpdate
      ? await dispatch(
          updateContractTask({
            data: { ...formattedData, id: id },
            router,
            translate,
          })
        )
      : await dispatch(
          createContractTask({ data: formattedData, router, translate })
        );

    if (res?.payload) {
      if (isUpdate) {
        onUpdateSuccess();
      } else {
        onSuccess();
      }
    }
  };

  return {
    error,
    handleSubmit,
    errors,
    fields: taskFields,
    onSubmit,
  };
}
