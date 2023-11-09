import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateEmployDetailsValidation } from "@/validation/employeeSchema";
import { employeeEditDetailsFormField } from "@/components/employees/fields/employee-edit-fields";
import { TRowEmployees } from "@/types/employee";
import { useMemo } from "react";
export const useEmployeeEditDetails = (
  routeHandler: Function,
  employeeDetail: TRowEmployees
) => {
  console.log(routeHandler, "routeHandler", employeeDetail);

  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateEmployDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = employeeEditDetailsFormField(register, loading);
  useMemo(() => {
    if (employeeDetail?.id) {
      reset(employeeDetail);
    }
  }, [employeeDetail?.id]);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    routeHandler();
  };

  return {
    fields,
    onSubmit,
    handleSubmit,
    errors,
    error,
  };
};
