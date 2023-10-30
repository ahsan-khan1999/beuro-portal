import { loginUser } from "@/api/slices/authSlice/auth";
import { generateCustomerValidation } from "@/validation/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, UseFormRegister, UseFormReset, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { customerDetailsFormField } from "@/components/customer/customer-fields";
import { Customers } from "@/types/customer";
import { useMemo } from "react";



export const useCustomerDetails = (data?: FieldValues) => {
  const { t: translate } = useTranslation();

  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateCustomerValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //@ts-expect-error
  const fields = customerDetailsFormField(register, loading, control);
  useMemo(() => {
    if (data?.id) {
      reset(data)
    }

  }, [data?.id])
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data, "submit");

  };
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};
