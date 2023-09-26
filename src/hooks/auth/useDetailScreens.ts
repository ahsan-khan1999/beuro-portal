import { loginUser } from "@/api/slices/authSlice/auth";
import {
  detailScreensFormField,
  generateLoginFormField,
} from "@/components/loginAndRegister/login/login-fields";
import {
  detailScreensValidation,
  generateLoginValidation,
} from "@/validation/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";

export const useDetailScreens = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = detailScreensValidation(translate);
  const {
    register,
    handleSubmit,
    setError,
    control,
    
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors, "errors");
  const fields = detailScreensFormField(register, loading, control);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // dispatch(loginUser({ data, router, setError, translate }));
  };
  return {
    fields,
    onSubmit,
    handleSubmit,
    errors,
    error,
  };
};