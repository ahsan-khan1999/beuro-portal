import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateAddRemarksValidation } from "@/validation/followUpSchema";
import { AddRemarksFormField } from "@/components/follow-up/fields/add-remarks-fields";

export const useAddRemarks = (handleFollowUpsDetails: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateAddRemarksValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = AddRemarksFormField(register, loading, control);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
 
    dispatch(loginUser({ data, router, setError, translate }));
    handleFollowUpsDetails();

  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};