import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
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
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const [timeDifference, setTimeDifference] = useState(60);
  const { loading, error, taskDetail } = useAppSelector(
    (state) => state.contract
  );

  const schema = generateAddTaskValidationSchema(translate);

  const { isContractId } = router.query;
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

  const { fields: dateFields } = useFieldArray({
    control,
    name: "date",
  });

  const isRemainder = watch("remainder");
  const alertTime = watch("alertTime");
  const startDate = watch("date.0.startDate");
  const isAllDay = watch("isAllDay");
  const colour = watch("colour");

  useEffect(() => {
    if (isContractId) return;
    if (id && taskDetail) {
      const startMoment = moment(taskDetail.date[0].startDate);
      const endMoment = moment(taskDetail.date[0].endDate);
      setTimeDifference(endMoment.diff(startMoment, "minutes"));

      reset({
        title: taskDetail?.title,
        date: taskDetail?.date,
        streetNumber: taskDetail?.address?.streetNumber,
        postalCode: taskDetail?.address?.postalCode,
        country: taskDetail?.address?.country,
        isAllDay: taskDetail?.isAllDay,
        note: taskDetail?.note,
        alertTime: taskDetail?.alertTime,
        colour: taskDetail?.colour,
      });
    }
  }, [id, taskDetail, isContractId]);

  useEffect(() => {
    if (startDate) {
      const startMoment = moment(startDate);

      if (isUpdate) {
        const newEndDate = startMoment
          .add(timeDifference, "minutes")
          .format("YYYY-MM-DDTHH:mm");
        setValue("date.0.endDate", newEndDate);
      } else {
        const newEndDate = startMoment
          .add(60, "minutes")
          .format("YYYY-MM-DDTHH:mm");
        setValue("date.0.endDate", newEndDate);
      }
    }
  }, [startDate]);

  useEffect(() => {
    if (isContractId) {
      const startMoment = moment(taskDetail.date[0].startDate);
      const endMoment = moment(taskDetail.date[0].endDate);
      setTimeDifference(endMoment.diff(startMoment, "minutes"));

      reset({
        title: taskDetail?.title,
        date: taskDetail?.date,
        streetNumber: taskDetail?.address?.streetNumber,
        postalCode: taskDetail?.address?.postalCode,
        country: taskDetail?.address?.country,
        isAllDay: taskDetail?.isAllDay,
        note: taskDetail?.note,
        alertTime: taskDetail?.alertTime,
        colour: taskDetail?.colour,
      });
    }
  }, [isContractId]);

  const taskFields = addTaskFormField(
    register,
    loading,
    isRemainder,
    dateFields?.length ? dateFields?.length : 1,
    setValue,
    watch,
    isAllDay,
    colour,
    alertTime,
    control,
    trigger,
    taskDetail?.date
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formattedData: any = {
      title: data.title,
      date: data.date,
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
      if (!isUpdate) {
        const { isContractId, ...restQuery } = router.query;
        router.replace(
          {
            pathname: router.pathname,
            query: restQuery,
          },
          undefined,
          { shallow: true }
        );

        await dispatch(
          readContractTasks({ params: { filter: {}, paginate: 0 } })
        );

        onSuccess();
      } else {
        await dispatch(
          readContractTasks({ params: { filter: {}, paginate: 0 } })
        );
        onUpdateSuccess();
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
