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
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { staticEnums } from "@/utils/static";

export interface AddTaskHookProps {
  isUpdate?: boolean;
  onSuccess: () => void;
  onUpdateSuccess: () => void;
}

export default function useAddTask({
  isUpdate,
  onSuccess,
  onUpdateSuccess,
}: AddTaskHookProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { loading, error, taskDetail } = useAppSelector(
    (state) => state.contract
  );

  const { id, clickedStartDate, clickedEndDate } = useAppSelector(
    (state) => state.global.modal.data ?? {}
  );

  const [date, setDate] = useState(taskDetail?.date);
  const schema = generateAddTaskValidationSchema(translate);
  const startDateRef = useRef<string | null>(null);

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
  const endDate = watch("date.0.endDate");
  const isAllDay = watch("isAllDay");
  const colour = watch("colour");

  useEffect(() => {
    if (isContractId) return;

    if (id && taskDetail) {
      let filteredDate = taskDetail?.date;

      if (isUpdate && clickedStartDate && clickedEndDate) {
        filteredDate = taskDetail?.date.filter(
          (date) =>
            moment(date.startDate).isSame(clickedStartDate) &&
            moment(date.endDate).isSame(clickedEndDate)
        );
      }

      if (filteredDate?.length > 0) {
        setDate(filteredDate);
        reset({
          title: taskDetail?.title,
          date: filteredDate,
          streetNumber: taskDetail?.address?.streetNumber,
          isAllDay: taskDetail?.isAllDay,
          note: taskDetail?.note,
          alertTime: taskDetail?.alertTime,
          colour: taskDetail?.colour,
        });

        startDateRef.current = filteredDate[0].startDate;
      }
    }
  }, [id, taskDetail, isContractId, clickedStartDate, clickedEndDate]);

  useEffect(() => {
    if (isContractId) {
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
        type: taskDetail?.type,
      });
    }
  }, [isContractId]);

  const handleDateChange = (name: string, value: string) => {
    if (name?.includes("endDate")) {
      return;
    }

    const startMoment = moment(value);

    if (isUpdate) {
      const minutesInDiff = moment(value).diff(startDateRef.current, "minutes");

      // If it's an all-day event, don't add time to endDate
      if (isAllDay) {
        setValue("date.0.endDate", startMoment.format("YYYY-MM-DD")); // Only set the date, no time
      } else {
        const newEndDate = moment(endDate)
          .add(minutesInDiff, "minutes")
          .format("YYYY-MM-DDTHH:mm");
        setValue("date.0.endDate", newEndDate);
      }
    } else {
      // For creation case, if isAllDay is true, don't add time
      if (isAllDay) {
        const newEndDate = startMoment.format("YYYY-MM-DD"); // Only set the date, no time
        setValue("date.0.endDate", newEndDate);
      } else {
        const newEndDate = startMoment
          .add(60, "minutes")
          .format("YYYY-MM-DDTHH:mm");
        setValue("date.0.endDate", newEndDate);
      }
    }

    startDateRef.current = value;
  };

  const taskFields = addTaskFormField(
    register,
    loading,
    isRemainder,
    dateFields?.length ? dateFields?.length : 1,
    setValue,
    watch,
    control,
    isAllDay,
    colour,
    alertTime,
    trigger,
    date,
    handleDateChange
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formattedData: any = {
      title: data.title,
      date:
        taskDetail?.date[0].startDate.trim() !== ""
          ? taskDetail?.date.map((item) => {
              if (
                moment(item.startDate).isSame(clickedStartDate) &&
                moment(item.endDate).isSame(clickedEndDate)
              ) {
                return {
                  startDate: data.date[0].startDate,
                  endDate: data.date[0].endDate,
                };
              }
              return item;
            })
          : data.date,
      isAllDay: data.isAllDay,
      colour: data.colour,
      note: data.note,
      address: {
        streetNumber: data.streetNumber,
      },
      type:
        staticEnums["TaskType"][taskDetail?.type] ||
        staticEnums["TaskType"]["Task"],
    };

    if (taskDetail?.contractID?.id) {
      formattedData.contractID = taskDetail?.contractID?.id;
    }

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
