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
  onIsModal?: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
  onUpdateSuccess: () => void;
}

export default function useAddTask({
  isUpdate,
  onIsModal,
  onSuccess,
  onUpdateSuccess,
}: AddTaskHookProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const { loading, error, taskDetail } = useAppSelector(
    (state) => state.contract
  );

  // const { id, clickedStartDate, clickedEndDate } = useAppSelector(
  //   (state) => state.global.modal.data ?? {}
  // );

  const [date, setDate] = useState(taskDetail?.date);
  const startDateRef = useRef<string | null>(null);
  const schema = generateAddTaskValidationSchema(translate);

  const { isContractId, taskId } = router.query;
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

  const colour = watch("colour");
  const isAllDay = watch("isAllDay");
  const alertTime = watch("alertTime");
  const isRemainder = watch("remainder");
  const endDate = watch("date.0.endDate");

  useEffect(() => {
    if (taskId && taskDetail) {
      let filteredDate = taskDetail?.date;

      if (
        isUpdate &&
        taskDetail?.clickedStartDate &&
        taskDetail?.clickedEndDate
      ) {
        filteredDate = taskDetail?.date?.filter((date) =>
          moment(date.startDate).isSame(taskDetail?.clickedStartDate)
        );
      }

      if (filteredDate?.length > 0) {
        setDate(filteredDate);
        reset({
          title: taskDetail?.title,
          date: filteredDate?.map((dateItem) => ({
            ...dateItem,
            startDate: moment(dateItem.startDate).format("YYYY-MM-DDTHH:mm"),
            endDate: moment(dateItem.endDate).format("YYYY-MM-DDTHH:mm"),
          })),
          streetNumber: taskDetail?.address?.streetNumber,
          isAllDay: taskDetail?.isAllDay,
          note: taskDetail?.note,
          alertTime: taskDetail?.alertTime,
          colour: taskDetail?.colour,
        });

        startDateRef.current = filteredDate[0].startDate;
      }
    }
  }, [
    taskId,
    taskDetail,
    taskDetail?.clickedStartDate,
    taskDetail?.clickedEndDate,
  ]);

  useEffect(() => {
    if (isContractId) {
      reset({
        title: taskDetail?.title,
        date: taskDetail?.date?.map((dateItem) => ({
          ...dateItem,
          startDate: moment(dateItem.startDate).format("YYYY-MM-DDTHH:mm"),
          endDate: moment(dateItem.endDate).format("YYYY-MM-DDTHH:mm"),
        })),
        streetNumber: taskDetail?.address?.streetNumber,
        isAllDay: taskDetail?.isAllDay,
        note: taskDetail?.note,
        alertTime: taskDetail?.alertTime,
        colour: taskDetail?.colour,
        type: taskDetail?.type,
      });
    }
  }, [isContractId]);

  const handleDateChange = (name: string, value: string) => {
    const indexMatch = name.match(/date\.(\d+)\.startDate/);
    if (!indexMatch) return;

    const index = parseInt(indexMatch[1], 10);
    const startMoment = moment(value);

    if (isUpdate) {
      const minutesInDiff = moment(value).diff(startDateRef.current, "minutes");

      if (isAllDay) {
        if (watch(`date.${index}.endDate`) === startDateRef.current) {
          setValue(`date.${index}.endDate`, startMoment.format("YYYY-MM-DD"));
        }
      } else {
        const newEndDate = moment(endDate)
          .add(minutesInDiff, "minutes")
          .format("YYYY-MM-DDTHH:mm");

        if (watch(`date.${index}.endDate`) === startDateRef.current) {
          setValue(`date.${index}.endDate`, newEndDate);
        }
      }
    } else {
      if (isAllDay) {
        const newEndDate = startMoment.format("YYYY-MM-DD");
        setValue(`date.${index}.endDate`, newEndDate);
      } else {
        const newEndDate = startMoment
          .add(60, "minutes")
          .format("YYYY-MM-DDTHH:mm");
        setValue(`date.${index}.endDate`, newEndDate);
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
      date: isUpdate
        ? taskDetail?.date?.map((item) => {
            if (moment(item.startDate).isSame(taskDetail?.clickedStartDate)) {
              return {
                startDate: data.isAllDay
                  ? moment(data.date[0].startDate).format("YYYY-MM-DD")
                  : moment(data.date[0].startDate).toISOString(),
                endDate: data.isAllDay
                  ? moment(data.date[0].endDate).format("YYYY-MM-DD")
                  : moment(data.date[0].endDate).toISOString(),
              };
            }
            return item;
          })
        : data.date?.map((dateItem: any) => ({
            startDate: data.isAllDay
              ? moment(dateItem.startDate).format("YYYY-MM-DD")
              : moment(dateItem.startDate).toISOString(),
            endDate: data.isAllDay
              ? moment(dateItem.endDate).format("YYYY-MM-DD")
              : moment(dateItem.endDate).toISOString(),
          })),
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

    if (taskDetail?.contractID) {
      formattedData.contractID = taskDetail?.contractID;
    }

    if (isRemainder) {
      formattedData.alertTime = data.alertTime;
    }

    const res = isUpdate
      ? await dispatch(
          updateContractTask({
            data: { ...formattedData, id: taskDetail?.id },
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

        onIsModal && onIsModal(false);
        onSuccess();
      } else {
        const { isUpdateTask, taskId, ...restQuery } = router.query;
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
        onIsModal && onIsModal(false);
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
