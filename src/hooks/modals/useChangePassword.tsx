import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useTranslation } from "next-i18next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "@/api/slices/authSlice/auth";
import { ChangePasswordFormField } from "@/components/setting/fields/change-password-fields";
import { generatePasswordChangeValidationSchema } from "@/validation/modalsSchema";

export default function useChangePassword() {
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const schema =
  generatePasswordChangeValidationSchema(translate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fields = ChangePasswordFormField(register, loading);

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
