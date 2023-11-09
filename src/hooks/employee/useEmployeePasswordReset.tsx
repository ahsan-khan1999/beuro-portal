import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { EmployeeResetPasswordFieldsFormField } from "@/components/employees/fields/employee-reset-password-fields";
import { generateEmployeePasswordResetValidationSchema } from "@/validation/employeeSchema";

export default function useEmployeePasswordReset(
  passwordResetSuccessfully: Function
) {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();

  const schema = generateEmployeePasswordResetValidationSchema(translate);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = EmployeeResetPasswordFieldsFormField(
    register,
    loading,
    passwordResetSuccessfully
  );

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
