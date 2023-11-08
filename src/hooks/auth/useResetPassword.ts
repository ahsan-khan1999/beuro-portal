import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { generateChangePasswordValidationSchema } from "@/validation/authSchema";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateChangePassowrdFormField } from "@/components/loginAndRegister/login/login-fields";
import { resetPassword } from "@/api/slices/authSlice/auth";



export default function useResetPassword() {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const changePasswordSchema =
    generateChangePasswordValidationSchema(translate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(changePasswordSchema),
  });

  const fields = generateChangePassowrdFormField(register, loading);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(resetPassword({ router, data }));
  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
}
