import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { LeadsCustomerDetailsFormField } from "@/components/leads/fields/Leads-customer-details-fields";
import { generateLeadsCustomerEditDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/details/LeadsDetailsData";

export const useLeadCustomerEditDetails = (onClick: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleBack = () => {
    onClick(0, ComponentsType.customer);
  };

  const schema = generateLeadsCustomerEditDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const fields = LeadsCustomerDetailsFormField(register, loading, control,handleBack);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
    onClick(0, ComponentsType.customer);
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
