import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddNewCustomerLeadFormField } from "@/components/leads/fields/Add-customer-lead-fields";
import { generateAddNewLeadCustomerDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";

export const useAddNewLeadCustomer = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateAddNewLeadCustomerDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = AddNewCustomerLeadFormField(register, loading, control);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    onHandleNext(ComponentsType.addressEdit);
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
