import { loginUser } from "@/api/slices/authSlice/auth";
import { detailBankFormField } from "@/components/loginAndRegister/login/login-fields";
import { detailBankValidation } from "@/validation/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";

export const useDetailBank = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = detailBankValidation(translate);
  const {
    register,
    handleSubmit,
    setError,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fields = detailBankFormField(register, loading, control, trigger);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
  };
  return {
    fields,
    onSubmit,
    handleSubmit,
    errors,
    error,
  };
};
