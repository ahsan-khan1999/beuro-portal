import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { EmployeeCreateNewPasswordFieldsFormField } from "@/components/employees/fields/employee-create-password-fields";
import { generateEmployeeNewPasswordValidationSchema } from "@/validation/employeeSchema";

export default function useEmployeeCreateNewPassword(passwordSetSuccessfully: Function) {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const schema =
  generateEmployeeNewPasswordValidationSchema(translate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fields = EmployeeCreateNewPasswordFieldsFormField(register, loading, passwordSetSuccessfully);

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
