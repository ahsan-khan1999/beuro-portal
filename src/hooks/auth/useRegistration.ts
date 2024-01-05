import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { generateValidation } from "@/validation/authSchema";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateFormField } from "@/components/loginAndRegister/registration/registration-form-fields";
import { signUp } from "@/api/slices/authSlice/auth";
import { useAppDispatch, useAppSelector } from "../useRedux";

export default function useRegistration() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: any) => state.auth);
  const { t: translate } = useTranslation();
  const router = useRouter();
  const schema = generateValidation(translate);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = generateFormField(register, loading);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(signUp({ data, router, setError, translate }));
  };
  return {
    fields,
    onSubmit,
    handleSubmit,
    errors,
    error,
    translate
  };
}
