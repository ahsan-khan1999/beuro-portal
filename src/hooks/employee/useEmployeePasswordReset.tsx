import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmployeeResetPasswordFieldsFormField } from "@/components/employees/fields/employee-reset-password-fields";
import { generateEmployeePasswordResetValidationSchema } from "@/validation/employeeSchema";
import { updateEmployeePassword } from "@/api/slices/employee/emplyeeSlice";

export interface EmpolyeePasswordResetProps {
  id?: string;
  passwordResetSuccessfully: Function;
}

export default function useEmployeePasswordReset({
  id,
  passwordResetSuccessfully,
}: EmpolyeePasswordResetProps) {
  const router = useRouter();
  const { loading, error, employeeDetails } = useAppSelector(
    (state) => state.employee
  );

  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();

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

  const fields = EmployeeResetPasswordFieldsFormField(register, loading);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let apiData = { ...data, id: id ? id : employeeDetails?.id };

    const res = await dispatch(
      updateEmployeePassword({ apiData, router, setError, translate })
    );
    if (res?.payload) passwordResetSuccessfully();
  };

  return {
    error,
    handleSubmit,
    errors,
    fields,
    onSubmit,
    translate,
  };
}
