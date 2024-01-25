import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { EditDateFormField } from "@/components/contract/fields/edit-date-fields";

export const useEditDate = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, followUpDetails } = useAppSelector(
    (state) => state.followUp
  );

  //   const schema = generateAddRemarksValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    // resolver: yupResolver<FieldValues>(schema),
  });

  const fields = EditDateFormField(register, loading, control);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Date Changed!");
  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
