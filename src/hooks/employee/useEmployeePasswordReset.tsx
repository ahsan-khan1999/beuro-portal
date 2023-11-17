import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { EmployeeResetPasswordFieldsFormField } from "@/components/employees/fields/employee-reset-password-fields";
import { generateEmployeePasswordResetValidationSchema } from "@/validation/employeeSchema";
import { updateEmployeePassword } from "@/api/slices/employee/emplyeeSlice";

export default function useEmployeePasswordReset(
  passwordResetSuccessfully: Function
) {
  const router = useRouter();
  const { loading, error, employeeDetails } = useAppSelector((state) => state.employee);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();

  const schema = generateEmployeePasswordResetValidationSchema(translate);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const fields = EmployeeResetPasswordFieldsFormField(
    register,
    loading,

  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let apiData = { ...data, id: employeeDetails?.id }
    const res = await dispatch(updateEmployeePassword({ apiData, router, setError, translate }));
    if (res?.payload) passwordResetSuccessfully()

  };
  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
  };
}
