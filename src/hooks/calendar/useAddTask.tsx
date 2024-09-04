import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { generateAddTaskValidationSchema } from "@/validation/modalsSchema";
import { addTaskFormField } from "@/components/calendar/add-task-fields";
import {
  createContractTask,
  readContractTasks,
  updateContractTask,
} from "@/api/slices/contract/contractSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import moment from "moment";

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
  const { loading, error, taskDetail } = useAppSelector(
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
    watch,
    setValue,
    reset,
  } = useForm<FieldValues>({ resolver: yupResolver<FieldValues>(schema) });
  const [timeDifference, setTimeDifference] = useState(60); // Default 1-hour difference

  const isRemainder = watch("remainder");
  const alertTime = watch("alertTime");
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const isAllDay = watch("isAllDay");
  const colour = watch("colour");

  useEffect(() => {
    // If editing, set initial values and compute time difference between start and end dates
    if (id && taskDetail) {
      const startMoment = moment(taskDetail.date[0].startDate);
      const endMoment = moment(taskDetail.date[0].endDate);
      setTimeDifference(endMoment.diff(startMoment, "minutes")); // Calculate the initial difference

      reset({
        title: taskDetail?.title,
        startDate: startMoment.format("YYYY-MM-DDTHH:mm"),
        endDate: endMoment.format("YYYY-MM-DDTHH:mm"),
        streetNumber: taskDetail?.address?.streetNumber,
        postalCode: taskDetail?.address?.postalCode,
        country: taskDetail?.address?.country,
        isAllDay: taskDetail?.isAllDay,
        note: taskDetail?.note,
        alertTime: taskDetail?.alertTime,
        colour: taskDetail?.colour,
      });
    }
  }, [id, taskDetail]);

  useEffect(() => {
    if (startDate) {
      const startMoment = moment(startDate);

      // Set the end date to be the start date + timeDifference
      const newEndDate = startMoment
        .add(timeDifference, "minutes")
        .format("YYYY-MM-DDTHH:mm");

      setValue("endDate", newEndDate);
    }
  }, [startDate]);

  const taskFields = addTaskFormField(
    register,
    loading,
    isRemainder,
    startDate,
    endDate,
    setValue,
    isAllDay,
    colour,
    alertTime,
    control,
    trigger
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formattedDate = data.startDate
      ? [{ startDate: data.startDate, endDate: data.endDate }]
      : [];

    const formattedData: any = {
      title: data.title,
      date: formattedDate,
      isAllDay: data.isAllDay,
      colour: data.colour,
      note: data.note,
      address: {
        streetNumber: data.streetNumber,
        postalCode: data.postalCode,
        country: data.country,
      },
    };

    if (isRemainder) {
      formattedData.alertTime = data.alertTime;
    }

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
        await dispatch(
          readContractTasks({ params: { filter: {}, paginate: 0 } })
        );
        onUpdateSuccess();
      } else {
        await dispatch(
          readContractTasks({ params: { filter: {}, paginate: 0 } })
        );
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
    isRemainder,
  };
}
