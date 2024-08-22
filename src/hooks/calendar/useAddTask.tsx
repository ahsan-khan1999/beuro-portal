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

export default function useAddTask() {
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

  console.log(startDate);

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
    console.log(data);
  };

  return {
    error,
    handleSubmit,
    errors,
    fields: taskFields,
    onSubmit,
  };
}
