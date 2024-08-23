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
  updateContractTask,
} from "@/api/slices/contract/contractSlice";

export interface AddTaskHookProps {
  isUpdate?: boolean;
}

export default function useAddTask({ isUpdate }: AddTaskHookProps) {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.settings);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    setError,
    watch,
  } = useForm<FieldValues>({});

  const isRemainder = watch("remainder");
  const startDate = watch("startDate");

  // Initialize useFieldArray for managing date ranges
  const { fields, append, remove } = useFieldArray({
    control,
    name: "date", // This will be the key in your form values
  });

  // Add an initial date field if needed
  if (fields.length === 0) {
    append({ startDate: "", endDate: "" });
  }

  const taskFields = addTaskFormField(
    register,
    loading,
    isRemainder,
    control,
    trigger
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formattedData = {
      title: data.title,
      date: data.date,
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
            data: { ...formattedData },
            router,
            translate,
          })
        )
      : await dispatch(
          createContractTask({ data: formattedData, router, translate })
        );

    if (res?.payload) {
      console.log(res?.payload);
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
