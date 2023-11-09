import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { generateResetPasswordValidationSchema } from "@/validation/authSchema";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateResetPassowrdFormField } from "@/components/loginAndRegister/login/login-fields";
import { forgotPassword } from "@/api/slices/authSlice/auth";
import { useAppDispatch, useAppSelector } from "../useRedux";


export default function useFrogetPassword() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const resetPasswordSchema = generateResetPasswordValidationSchema(translate);
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(resetPasswordSchema),
  });
  const onClick = () => {
    router.push("/login")
  }
  const fields = generateResetPassowrdFormField(register, loading, onClick);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(forgotPassword({ translate, data, setError }));
  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
}
