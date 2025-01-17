import { loginUser, setErrorMessage } from "@/api/slices/authSlice/auth";
import { generateLoginFormField } from "@/components/loginAndRegister/login/login-fields";
import { generateLoginValidation } from "@/validation/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useEffect } from "react";

export const useLoginForm = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  
  useEffect(() => {
    dispatch(setErrorMessage(null));
  }, []);

  const schema = generateLoginValidation(translate);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = generateLoginFormField(register, loading);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
  };

  return {
    fields,
    onSubmit,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
