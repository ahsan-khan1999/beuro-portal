import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { generateEmployeePasswordResetValidationSchema } from "@/validation/authSchema";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { EmployeeResetPasswordFieldsFormField } from "@/components/employs/fields/employee-reset-password-fields";

export default function useModalPasswordReset() {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const changePasswordSchema =
  generateEmployeePasswordResetValidationSchema(translate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const fields = EmployeeResetPasswordFieldsFormField(register, loading);

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